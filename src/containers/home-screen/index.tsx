import React, { useEffect, useRef, useState } from 'react'
import {
  SafeAreaView,
  SectionList,
  View,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  ScrollView,
  Pressable,
  Button,
  Platform,
  Alert,
} from 'react-native'

import * as Device from 'expo-device'
import * as Notifications from 'expo-notifications'
import Constants from 'expo-constants'

import Modal from 'react-native-modal'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Toast from 'react-native-toast-message'
import * as Sentry from 'sentry-expo'

import { styles } from './style'
import { CardComponent, LabelComponent, ProfileHeader } from '../../components'
import { ROUTES } from '../../constants'
import Colors from '../../styles/colors'
import {
  FONT_SIZE_10,
  FONT_SIZE_16,
  MONTSERRAT_BOLD,
  MONTSERRAT_MEDIUM,
  MONTSERRAT_REGULAR,
} from '../../styles'
import { User } from '../../models/api'
import { API } from '../../helpers/api'
import { hp, wp } from '../../helpers'
import { Loader } from '../../components/Loader'
import { Entypo } from '@expo/vector-icons'

const GOALDATA = [
  { value: 0, label: 'Lose Weight' },
  { value: 1, label: 'Gain Weight' },
  { value: 2, label: 'Maintain Weight' },
  { value: 3, label: 'Build Muscle' },
  { value: 4, label: 'Get Fit' },
]

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
})

async function sendPushNotification(expoPushToken: any) {
  console.log('expo push token', expoPushToken)
  let expoToken
  await registerForPushNotificationsAsync().then((token: any) => (expoToken = token))
  console.log('expo token', expoToken)
  const message = {
    to: expoPushToken,
    title: 'Original Title',
    body: 'And here is the body!',
  }

  await fetch('https://api.expo.dev/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify([
      {
        to: 'ExponentPushToken[U8Y2Y5JkJVOCw-5KEGp2qB]',
        title: 'Personalised Plan is Ready 🎉!',
        body: 'Your new requested workout and meal plan is ready.',
      },
    ]),
  })
}

async function registerForPushNotificationsAsync() {
  let token
  console.log('device', Device.isDevice)
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync()
    let finalStatus = existingStatus
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync()
      finalStatus = status
    }
    if (finalStatus !== 'granted') {
      Alert.alert(
        'Enable Notifications!',
        'Please enable push notifications from your device settings',
        [],
        { userInterfaceStyle: 'dark' }
      )
      return
    }
    token = await Notifications.getExpoPushTokenAsync({
      projectId: Constants.expoConfig?.extra?.eas?.projectId ?? '',
    })
    console.log(token)
  } else {
    console.log('Must use physical device for Push Notifications')
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    })
  }

  return token
}

export function HomeScreen({ navigation }: any) {
  const [workoutPlan, setWorkoutPlan] = useState<any>()
  const [mealPlan, setMealPlan] = useState<any>()
  const [isLoading, setLoading] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [goalid, setGoalid] = useState(0)
  const [userDetails, setUserDetails] = useState<User>()
  const [dayName, setDayName] = useState('')
  const [goallabel, setGoallabel] = useState('')
  const [expoPushToken, setExpoPushToken] = useState('')
  const [notification, setNotification] = useState(false)
  const notificationListener = useRef<Notifications.Subscription>()
  const responseListener = useRef<Notifications.Subscription>()

  useEffect(() => {
    //getUserDetails()
  }, [goallabel])

  useEffect(() => {
    console.log('use effect in home screen')
    let daysArray = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ]
    let day = new Date().getDay()
    let dayName = daysArray[day]
    setDayName(dayName)
    console.log('day name', dayName)
    getUserDetails()

    async function checkForUpdates() {
      if (!userDetails?.userId) return
      await API.checkPlanStatus(userDetails?.userId).then(res => {})
    }
    checkForUpdates()

    registerForPushNotificationsAsync().then((token: any) => {
      setExpoPushToken(token)
      if (userDetails?.expoNotificationToken !== expoPushToken && userDetails?.userId) {
        API.UpdateExpoNotification({
          userId: userDetails?.userId,
          data: JSON.stringify(token),
        })
      }
    })

    notificationListener.current = Notifications.addNotificationReceivedListener(
      notification => {
        setNotification(!!notification)
      }
    )

    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      response => {
        console.log(response)
      }
    )

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current as Notifications.Subscription
      )
      Notifications.removeNotificationSubscription(
        responseListener.current as Notifications.Subscription
      )
    }
  }, [])

  const getUserDetails = async () => {
    try {
      setLoading(true)
      const userdata = await API.getUserDetails()
      if (userdata?.data !== null && userdata?.data !== undefined) {
        const userDetails: User = userdata?.data
        console.log('User Details -- in get user details')
        console.log(userDetails)
        console.log('plans in user details')

        console.log(JSON.parse(userDetails?.workoutPlan || '[]'))
        console.log(JSON.parse(userDetails?.mealPlan || '[]'))
        const goalLabel =
          GOALDATA.find(item => item.value === userDetails?.goal)?.label || ''
        setGoallabel(goalLabel)
        setGoalid(userDetails?.goal)
        setWorkoutPlan([
          {
            title: 'Workout Schedule',
            data: JSON.parse(userDetails.workoutPlan || '[]').days,
            subtitle: 'Workout',
          },
        ])
        setMealPlan([
          {
            title: 'Meal Plan Schedule',
            data: JSON.parse(userDetails.mealPlan || '[]').days,
            subtitle: 'Meal for the day',
          },
        ])
        console.log('Workout Plan')
        console.log(workoutPlan)
        console.log('Meal Plan')
        console.log(mealPlan)
        setUserDetails(userDetails)
        setLoading(false)
        if (userDetails?.workoutPlan == null || userDetails?.workoutPlan == undefined) {
          await API.getPlanDetails(
            userDetails.suggestedPlanId,
            userDetails.bmiValue
          ).then(res => {
            if (res?.status === 200) {
              setWorkoutPlan([
                {
                  title: 'Workout Schedule',
                  data: JSON.parse(res?.workoutPlan || '[]').days,
                  subtitle: 'Workout',
                },
              ])
              setMealPlan([
                {
                  title: 'Meal Plan Schedule',
                  data: JSON.parse(res?.mealPlan || '[]').days,
                  subtitle: 'Meal for the day',
                },
              ])
              console.log('Workout Plan in if')
              console.log(workoutPlan)
              console.log('Meal Plan in if')
              console.log(mealPlan)
              if (res.workoutPlan.length > 0 && res.mealPlan.length > 0) {
                setLoading(false)
              }
            }
          })
        }
      }
    } catch (error) {
      Sentry.Native.captureException(error)
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const GoalUpdate = async () => {
    setGoallabel(GOALDATA.find(item => item.value === goalid)?.label || '')
    var body = {
      goal: goalid,
      height: userDetails?.height,
      weight: userDetails?.weight,
      bmiValue: userDetails?.bmiValue,
      age: userDetails?.age,
      userId: userDetails?.userId,
    }

    console.log('goal id', goalid)
    console.log('goal label', goallabel)

    try {
      await API.UpdateUser(body)
    } catch (error) {
      console.error(error, 'errrrr')
    } finally {
    }
  }

  const showToast = () => {
    Toast.show({
      type: 'tomatoToast',
      props: {
        text: 'New Plan Requested!',
        msg: 'We will notify you once your new plan is ready.',
      },
    })
    if (userDetails?.userId) API.getNewPlan(userDetails?.userId)
  }
  return isLoading ? (
    <Loader />
  ) : (
    <SafeAreaView style={styles.container}>
      <ProfileHeader
        onLogoutPress={async () => {
          await API.logOut().then(res => {
            console.log('logout response', res)
            navigation.replace(ROUTES.SIGN_UP_OPTIONS_SCREEN)
          })
        }}
        Profile={true}
        userData={userDetails}
        onProfilePress={() =>
          navigation.navigate(ROUTES.PROFILE_SCREEN, {
            userData: userDetails,
            id: 1,
          })
        }
      />
      <ScrollView>
        <CardComponent cardStyle={styles.cardcontainer}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              paddingBottom: 10,
            }}>
            <View
              style={{
                alignContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 10,
              }}>
              <View style={styles.roundcontainer}>
                <LabelComponent label={userDetails?.weight} style={styles.txt} />
                <LabelComponent label='lbs' style={styles.subtxt} />
              </View>
              <Text
                style={{
                  color: 'white',
                  fontFamily: MONTSERRAT_REGULAR,
                  fontSize: FONT_SIZE_10,
                }}>
                Weight
              </Text>
            </View>
            <View
              style={{
                alignContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 10,
              }}>
              <View style={styles.roundcontainer}>
                <LabelComponent label={userDetails?.height} style={styles.txt} />
                <LabelComponent label='cm' style={styles.subtxt} />
              </View>
              <Text
                style={{
                  color: 'white',
                  fontFamily: MONTSERRAT_REGULAR,
                  fontSize: FONT_SIZE_10,
                }}>
                Height
              </Text>
            </View>
            <View
              style={{
                alignContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 10,
              }}>
              <View style={styles.roundcontainer}>
                <LabelComponent
                  label={userDetails?.bmiValue?.toFixed(2)}
                  style={styles.txt}
                />
              </View>
              <Text
                style={{
                  color: 'white',
                  fontFamily: MONTSERRAT_REGULAR,
                  fontSize: FONT_SIZE_10,
                }}>
                BMI
              </Text>
            </View>
          </View>
          <View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: MONTSERRAT_MEDIUM,
                    color: 'lightgrey',
                    fontSize: 12,
                  }}>
                  Goal: &nbsp;
                </Text>
                <Text
                  style={{
                    fontFamily: MONTSERRAT_BOLD,
                    color: Colors.PRIMARY,
                    fontSize: 16,
                  }}>
                  {goallabel}
                </Text>
              </View>
            </View>
          </View>
        </CardComponent>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            marginLeft: wp('4%'),
            marginTop: hp('1%'),
          }}>
          <Text
            style={{ color: 'white', fontFamily: MONTSERRAT_MEDIUM, paddingRight: 5 }}>
            Actions:{' '}
          </Text>
          <Pressable
            style={{
              borderWidth: 1,
              borderColor: Colors.LIGHT_GREEN,
              borderRadius: 25,
              marginRight: wp(2),
            }}
            onPress={() => {
              setModalVisible(!modalVisible)
            }}>
            <Text
              style={{
                color: 'white',
                fontFamily: MONTSERRAT_MEDIUM,
                fontSize: 10,
                paddingHorizontal: 10,
                paddingVertical: 5,
              }}>
              Update Goal
            </Text>
          </Pressable>
          <Pressable
            style={{
              borderWidth: 1,
              borderColor: Colors.LIGHT_GREEN,
              borderRadius: 25,
              marginRight: wp(2),
            }}
            onPress={showToast}>
            <Text
              style={{
                color: 'white',
                fontFamily: MONTSERRAT_MEDIUM,
                fontSize: 10,
                paddingHorizontal: 10,
                paddingVertical: 5,
              }}>
              Request New Plan
            </Text>
          </Pressable>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            alignContent: 'center',
          }}>
          <LabelComponent label="Today Plan's" style={styles.title} />
        </View>
        {workoutPlan && mealPlan && (
          <CardComponent>
            <View>
              <SectionList
                sections={workoutPlan}
                scrollEnabled={false}
                renderSectionHeader={() => {
                  return (
                    <View>
                      <LabelComponent label={'Workout'} style={styles.workout} />
                    </View>
                  )
                }}
                renderItem={({ item }: any) => (
                  <>
                    {item.day === dayName && (
                      <View key={item.day}>
                        <View style={styles.tablecontainer}>
                          <View
                            style={{
                              flex: 1,
                              flexDirection: 'row',
                              justifyContent: 'flex-end',
                            }}>
                            <>
                              <LabelComponent
                                style={styles.table1}
                                label={''}></LabelComponent>
                              <LabelComponent style={styles.table1} label='Sets' />
                              <LabelComponent style={styles.table1} label='Reps' />
                            </>
                          </View>
                        </View>
                        {item?.exercises?.map((v: any) => {
                          return (
                            <View key={v.name}>
                              <View style={styles.tablecontainer}>
                                <LabelComponent style={styles.tableitem} label={v.name} />
                                <View style={{ flex: 1, flexDirection: 'row' }}>
                                  {v.sets && (
                                    <LabelComponent
                                      label={v.sets}
                                      style={styles.repsitem}
                                    />
                                  )}
                                  <LabelComponent
                                    label={v.reps}
                                    style={styles.repsitem}
                                  />
                                </View>
                              </View>
                            </View>
                          )
                        })}
                      </View>
                    )}
                  </>
                )}
              />
            </View>
            <View>
              <SectionList
                sections={mealPlan}
                scrollEnabled={false}
                renderSectionHeader={({ section: { title, subtitle } }) => {
                  return (
                    <View>
                      <LabelComponent label={subtitle} style={styles.subheading1} />
                    </View>
                  )
                }}
                renderItem={({ item }: any) => (
                  <>
                    {item.day === dayName && (
                      <View key={item.day}>
                        <View style={[styles.mealview, { marginTop: -0.5 }]}>
                          <View style={styles.mealconatiner}>
                            <LabelComponent label='BREAKFAST' style={styles.heading1} />
                            <LabelComponent
                              label={`(${item.meals.breakfast.calories}cal)`}
                              style={styles.headingmd}
                            />
                          </View>
                          <View>
                            <LabelComponent
                              label={item.meals.breakfast.meal}
                              style={styles.subheading}
                            />
                          </View>
                          <View style={styles.mealconatiner}>
                            <LabelComponent label='LUNCH' style={styles.heading1} />
                            <LabelComponent
                              label={`(${item.meals.lunch.calories}cal)`}
                              style={styles.headingmd}
                            />
                          </View>
                          <View>
                            <LabelComponent
                              label={item.meals.lunch.meal}
                              style={styles.subheading}
                            />
                          </View>
                          <View style={styles.mealconatiner}>
                            <LabelComponent label='DINNER' style={styles.heading1} />
                            <LabelComponent
                              label={`(${item.meals.dinner.calories}cal)`}
                              style={styles.headingmd}
                            />
                          </View>
                          <View>
                            <LabelComponent
                              label={item.meals.dinner.meal}
                              style={styles.subheading}
                            />
                          </View>
                        </View>
                      </View>
                    )}
                  </>
                )}
              />
            </View>
          </CardComponent>
        )}

        {workoutPlan && (
          <View>
            <SectionList
              sections={workoutPlan}
              scrollEnabled={false}
              renderSectionHeader={({ section: { title } }) => {
                return (
                  <View style={styles.headercontainer}>
                    <LabelComponent label={title} style={styles.title} />
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate(ROUTES.WORKOUT_DETAILS, {
                          workoutData: workoutPlan[0].data,
                        })
                      }>
                      <View style={styles.iconcontainer}>
                        <LabelComponent
                          label='View all'
                          style={[styles.viewalltxt, { color: Colors.SPRING_GREEN }]}
                        />
                        <Entypo
                          name='chevron-thin-right'
                          size={15}
                          color={Colors.CHLOROPHYL_GREEN}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                )
              }}
              renderItem={({ item }: any) => (
                <>
                  {item.day === dayName && (
                    <View style={styles.card} key={item.day}>
                      <View style={styles.tablecontainer}>
                        <LabelComponent
                          style={[styles.tableitem, { color: Colors.SPRING_GREEN }]}
                          label={item.day}
                        />
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                          <LabelComponent style={styles.tableitem} label='Sets' />
                          <LabelComponent style={styles.tableitem} label='Reps' />
                        </View>
                      </View>
                      {item?.exercises?.map((v: any) => {
                        return (
                          <View>
                            <View style={styles.tablecontainer}>
                              <LabelComponent style={styles.tableitem} label={v.name} />
                              <View style={{ flex: 1, flexDirection: 'row' }}>
                                {v.sets && (
                                  <LabelComponent
                                    label={v.sets}
                                    style={styles.repsitem}
                                  />
                                )}
                                <LabelComponent label={v.reps} style={styles.repsitem} />
                              </View>
                            </View>
                          </View>
                        )
                      })}
                    </View>
                  )}
                </>
              )}
              key='workout'
            />
          </View>
        )}

        {mealPlan && (
          <SectionList
            sections={mealPlan}
            scrollEnabled={false}
            renderSectionHeader={({ section: { title, subtitle } }) => {
              return (
                <View style={styles.headercontainer}>
                  <LabelComponent label={title} style={styles.title} />
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate(ROUTES.MEAL_DETAILS, {
                        mealPlanData: mealPlan[0].data,
                      })
                    }>
                    <View style={styles.iconcontainer}>
                      <LabelComponent label='View all' style={styles.viewalltxt} />
                      <Entypo
                        name='chevron-thin-right'
                        size={15}
                        color={Colors.CHLOROPHYL_GREEN}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              )
            }}
            renderItem={({ item }: any) => (
              <>
                {item.day === dayName && (
                  <CardComponent key={item.day}>
                    <View style={styles.mealview} key={item.day}>
                      <View style={styles.mealconatiner}>
                        <LabelComponent label='BREAKFAST' style={styles.heading} />
                        <LabelComponent
                          label={`(${item.meals.breakfast.calories}cal)`}
                          style={styles.headingmd}
                        />
                      </View>
                      <View>
                        <LabelComponent
                          label={item.meals.breakfast.meal}
                          style={styles.subheading}
                        />
                      </View>
                      <View style={styles.mealconatiner}>
                        <LabelComponent label='LUNCH' style={styles.heading} />
                        <LabelComponent
                          label={`(${item.meals.lunch.calories}cal)`}
                          style={styles.headingmd}
                        />
                      </View>
                      <View>
                        <LabelComponent
                          label={item.meals.lunch.meal}
                          style={styles.subheading}
                        />
                      </View>
                      <View style={styles.mealconatiner}>
                        <LabelComponent label='DINNER' style={styles.heading} />
                        <LabelComponent
                          label={`(${item.meals.dinner.calories}cal)`}
                          style={styles.headingmd}
                        />
                      </View>
                      <View>
                        <LabelComponent
                          label={item.meals.dinner.meal}
                          style={styles.subheading}
                        />
                      </View>
                    </View>
                  </CardComponent>
                )}
              </>
            )}
            key='meal'
          />
        )}

        <>
          <Modal
            isVisible={modalVisible}
            onBackdropPress={() => setModalVisible(!modalVisible)}>
            <View style={styles.modalcontainer}>
              <Text
                style={{
                  color: 'white',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: MONTSERRAT_REGULAR,
                  fontSize: FONT_SIZE_16,
                  textAlign: 'center',
                }}>
                What's your new Goal?
              </Text>
              <KeyboardAwareScrollView style={{}}>
                <View>
                  <View
                    style={{
                      paddingHorizontal: 25,
                      paddingVertical: 10,
                    }}>
                    {GOALDATA.map(({ label, value }) => (
                      <Pressable
                        style={
                          value === goalid ? styles.selectedOption : styles.regularOption
                        }
                        key={value}
                        onPress={() => {
                          setGoalid(value)
                        }}>
                        <Text
                          style={
                            value === goalid
                              ? styles.selectedOptionText
                              : styles.optionText
                          }>
                          {label}
                        </Text>
                      </Pressable>
                    ))}
                  </View>
                </View>
              </KeyboardAwareScrollView>
              <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                <Pressable
                  style={{
                    borderColor: 'white',
                    borderWidth: 1,
                    paddingVertical: 4,
                    paddingHorizontal: 20,
                    borderRadius: 25,
                  }}
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Text
                    style={{
                      color: 'white',
                      fontFamily: MONTSERRAT_REGULAR,
                      fontSize: FONT_SIZE_16,
                    }}>
                    Cancel
                  </Text>
                </Pressable>
                <Pressable
                  style={{
                    paddingVertical: 4,
                    paddingHorizontal: 20,
                    borderRadius: 25,
                    backgroundColor: Colors.SPRING_GREEN,
                  }}
                  onPress={() => {
                    GoalUpdate(), setModalVisible(!modalVisible)
                  }}>
                  <Text
                    style={{
                      color: 'black',
                      fontFamily: MONTSERRAT_REGULAR,
                      fontSize: FONT_SIZE_16,
                    }}>
                    Save
                  </Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </>
      </ScrollView>
    </SafeAreaView>
  )
}
