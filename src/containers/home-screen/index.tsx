import React, { useEffect, useRef, useState } from 'react'
import {
  SafeAreaView,
  SectionList,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  Pressable,
  Platform,
  Alert,
  Linking,
  RefreshControl,
} from 'react-native'

import * as Device from 'expo-device'
import * as Notifications from 'expo-notifications'
import { Entypo } from '@expo/vector-icons'

import Modal from 'react-native-modal'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Toast from 'react-native-toast-message'

import { styles } from './style'
import { CardComponent, LabelComponent, ProfileHeader } from '../../components'
import { ROUTES, GOALDATA } from '../../constants'
import Colors from '../../styles/colors'
import { User } from '../../models/api'
import { API, mealPlanScheme, workoutPlanScheme } from '../../helpers'
import { Loader } from '../../components/Loader'
import InfoIcon from '../../assets/svg/InfoIcon.svg'
import { TempStorage, TempStorageKeys } from '../../helpers/tempStorage'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
})

export function HomeScreen({ navigation }: any) {
  const [workoutPlan, setWorkoutPlan] = useState<any>()
  const [mealPlan, setMealPlan] = useState<any>()
  const [isLoading, setLoading] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [goalid, setGoalid] = useState(0)
  const [userDetails, setUserDetails] = useState<User>()
  const [dayName, setDayName] = useState('')
  const [goallabel, setGoallabel] = useState('')
  const [expoPushToken, setExpoPushToken] = useState<any>('')
  const [notification, setNotification] = useState(false)
  const notificationListener = useRef<Notifications.Subscription>()
  const responseListener = useRef<Notifications.Subscription>()
  const [refreshing, setRefreshing] = useState(false)
  const ref: any = useRef(null)

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

    registerForPushNotificationsAsync().then((token: any) => {
      setExpoPushToken(token)
      if (userDetails?.expoNotificationToken !== expoPushToken && userDetails?.userId) {
        API.UpdateExpoNotification({
          userId: userDetails?.userId,
          data: token.data,
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

  async function checkForUpdates() {
    //const isPlanUpdated = await TempStorage.getItem(TempStorageKeys.IS_PLAN_UPDATED)
    //if (isPlanUpdated) {
    //  console.log('isPlanUpdated: ', isPlanUpdated)
      await getUserDetails(userDetails?.userId, true)
      //await TempStorage.setItem(TempStorageKeys.IS_PLAN_UPDATED, 'false')
    //}
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
        return
      }
      token = await Notifications.getExpoPushTokenAsync({
        projectId: '7a26df6e-bd0b-4749-839c-f73997a36066',
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

  const getUserDetails = async (userId?: string, forceFetch?: boolean) => {
    try {
      setLoading(true)
      var userData = await API.getUserDetails(userId, forceFetch)
      console.log('user data')
      console.log(userData)
      if (userData?.data !== null && userData?.data !== undefined) {
        console.log("in if of get user details")
        const userDetails: User = userData?.data
        console.log(JSON.parse(userDetails?.workoutPlan || '[]'))
        console.log(JSON.parse(userDetails?.mealPlan || '[]'))
        const goalLabel =
          GOALDATA.find(item => item.value === userDetails?.goal)?.label || ''
        setGoallabel(goalLabel)
        setGoalid(userDetails?.goal)

        const wpParse = workoutPlanScheme.safeParse(JSON.parse(userDetails?.workoutPlan || '[]'))
        const mpParse = mealPlanScheme.safeParse(JSON.parse(userDetails?.mealPlan || '[]'))

        if (
          workoutPlanScheme.safeParse(JSON.parse(userDetails?.workoutPlan || '[]'))
            .success &&
          mealPlanScheme.safeParse(JSON.parse(userDetails?.mealPlan || '[]')).success
        ) {
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
          console.log("Parsed workout and meal plan with the schema")
        }
        else {
          console.log("in else of parsing workout and meal plan")
          console.log(wpParse)
          console.log(mpParse)
          Alert.alert(
            'Oops...!',
            "A.I didn't come up with a plan yet for you",
            [
              {
                text: 'Request a New Plan',
                onPress: () => {
                  showToast()
                },
              },
            ],
            { userInterfaceStyle: 'dark' }
          )
        }
        //console.log('Workout Plan')
        //console.log(workoutPlan)
        //console.log('Meal Plan')
        //console.log(mealPlan)
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
              //console.log('Workout Plan in if')
              //console.log(workoutPlan)
              //console.log('Meal Plan in if')
              //console.log(mealPlan)
              if (res.workoutPlan.length > 0 && res.mealPlan.length > 0) {
                setLoading(false)
              }
            }
          })
        }
      }
    } catch (error) {
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

    try {
      await API.UpdateUser(body)
    } catch (error) {
      console.error(error, 'errrrr')
    }
  }

  const showToast = async () => {
    Toast.show({
      type: 'tomatoToast',
      props: {
        text: 'New Plan Requested!',
        msg: 'We will notify you once your new plan is ready.',
      },
    })
    const { status: existingStatus } = await Notifications.getPermissionsAsync()
    let finalStatus = existingStatus
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync()
      finalStatus = status
    }
    if (finalStatus !== 'granted') {
      Alert.alert(
        'Enable Notifications',
        'Please enable notifications in settings to get notified when your new plan is ready.',
        [{ text: 'Ok' }],
        { userInterfaceStyle: 'dark' }
      )
    } else {
      console.log('expo push token', expoPushToken)
      if (expoPushToken == '') {
        registerForPushNotificationsAsync().then((token: any) => {
          setExpoPushToken(token)
          if (
            userDetails?.expoNotificationToken !== expoPushToken &&
            userDetails?.userId
          ) {
            API.UpdateExpoNotification({
              userId: userDetails?.userId,
              data: token.data,
            })
          }
        })
      }
      if (
        userDetails?.expoNotificationToken !== expoPushToken.data &&
        userDetails?.userId
      ) {
        console.log('Updating the expo notif token')
        await API.UpdateExpoNotification({
          userId: userDetails?.userId,
          data: expoPushToken.data,
        })
      }
    }
    if (userDetails?.userId) {
      API.getNewPlan(userDetails?.userId)
      await TempStorage.setItem(TempStorageKeys.IS_PLAN_UPDATED, 'true')
    }
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
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              checkForUpdates()
              console.log('refreshing')
            }}
            colors={['#ff0000', '#00ff00', '#0000ff']} // Colors for the spinning loader segments
            //progressBackgroundColor='#ffffff' // Background color of the loader circle
          />
        }>
        <CardComponent cardStyle={styles.cardcontainer}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              paddingBottom: 10,
            }}>
            <View style={styles.userMetricsView}>
              <View style={styles.roundcontainer}>
                <LabelComponent label={userDetails?.weight} style={styles.txt} />
                <LabelComponent label='lbs' style={styles.subtxt} />
              </View>
              <Text style={styles.userMetricsText}>Weight</Text>
            </View>
            <View style={styles.userMetricsView}>
              <View style={styles.roundcontainer}>
                <LabelComponent label={userDetails?.height} style={styles.txt} />
                <LabelComponent label='cm' style={styles.subtxt} />
              </View>
              <Text style={styles.userMetricsText}>Height</Text>
            </View>
            <View style={styles.userMetricsView}>
              <View style={styles.roundcontainer}>
                <LabelComponent
                  label={
                    userDetails?.weight
                      ? (
                          (userDetails.weight * 0.453592) /
                          (userDetails.height * 0.01) ** 2
                        ).toFixed(2)
                      : 0
                  }
                  style={styles.txt}
                />
              </View>
              <Text style={styles.userMetricsText}>BMI</Text>
            </View>
          </View>
          <View>
            <View style={styles.goalXView}>
              <View style={styles.goalYView}>
                <Text style={styles.goalTitleText}>Goal: &nbsp;</Text>
                <Text style={styles.goalLabelText}>{goallabel}</Text>
              </View>
            </View>
          </View>
        </CardComponent>

        <View style={styles.actionsView}>
          <Text style={styles.actionsTitleText}>Actions: </Text>
          <Pressable
            style={styles.actionsButtonPressable}
            onPress={() => {
              setModalVisible(!modalVisible)
            }}>
            <Text style={styles.actionsButtonText}>Update Goal</Text>
          </Pressable>
          <Pressable style={styles.actionsButtonPressable} onPress={showToast}>
            <Text style={styles.actionsButtonText}>Request New Plan</Text>
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
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <LabelComponent label={subtitle + ' '} style={styles.subheading1} />
                      <Pressable
                        onPress={() => {
                          Linking.openURL('https://gymrat.maheshthedev.me/mpr')
                        }}
                        style={styles.mtsh1}>
                        <InfoIcon height={20} width={20} />
                      </Pressable>
                    </View>
                  )
                }}
                renderItem={({ item }: any) => (
                  <>
                    {item.dayOfTheWeek === dayName && (
                      <View key={item.dayOfTheWeek}>
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
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <LabelComponent label={title + ' '} style={styles.title} />
                    <Pressable
                      onPress={() => {
                        Linking.openURL('https://gymrat.maheshthedev.me/mpr')
                      }}>
                      <InfoIcon height={20} width={20} />
                    </Pressable>
                  </View>
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
                {item.dayOfTheWeek === dayName && (
                  <CardComponent key={item.dayOfTheWeek}>
                    <View style={styles.mealview} key={item.dayOfTheWeek}>
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
              <Text style={styles.modalTitle}>What's your new Goal?</Text>
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
                  style={styles.modalCancelPressable}
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Text style={styles.modalCancelText}>Cancel</Text>
                </Pressable>
                <Pressable
                  style={styles.modalSavePressable}
                  onPress={() => {
                    GoalUpdate(), setModalVisible(!modalVisible)
                  }}>
                  <Text style={styles.modalSaveText}>Save</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </>
      </ScrollView>
    </SafeAreaView>
  )
}
