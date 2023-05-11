import React, { useEffect, useState } from 'react'

import { AuthStackNavProps, HomeStackNavProps } from '@navigation'
import {
  SafeAreaView,
  SectionList,
  View,
  FlatList,
  TouchableOpacity,
  Text,
  ScrollView,
  ActivityIndicator,
} from 'react-native'
import { styles } from './style'
import Modal from 'react-native-modal'
import axios from 'axios'

import { AntDesign, Entypo } from '@expo/vector-icons'
import {
  ButtonComponent,
  ButtonVarient,
  CardComponent,
  LabelComponent,
  ProfileHeader,
  TextInputComponent,
  TextVarient,
} from '@components'
import { ROUTES, Strings } from '@constants'
import Colors from '@styles/colors'
import { Auth } from 'aws-amplify'
import { FONT_SIZE_14 } from '@styles'
import AsyncStorage from '@react-native-async-storage/async-storage'

const GOALDATA = [
  { id: 0, label: 'Lose Weight' },
  { id: 1, label: 'Gain Weight' },
  { id: 2, label: 'Maintain Weight' },
  { id: 3, label: 'Build Muscle' },
  { id: 4, label: 'Get Fit' },
]

export const HomeScreen: React.FC<HomeStackNavProps<'HomeScreen'>> = ({
  navigation,
  route,
}) => {
  const [workoutPlan, setWorkoutPlan] = useState([])
  const [mealPlan, setMealPlan] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [userdata, setUserdata] = useState([])
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')
  const [goal, setGoal] = useState('')

  const [selectedgoal, setSelectedgoal] = useState('')
  const [modalVisible, setModalVisible] = useState(false)
  const [goalvisible, setGoalvisible] = useState(false)
  const [goalid, setGoalid] = useState(0)

  const [dayName, setDayName] = useState('')
  const [hide, setHide] = useState(false)
  const [goallabel, setGoallabel] = useState('')

  const handleSelectGoal = (label: string) => {
    setSelectedgoal(label)
    setHide(false)
  }

  useEffect(() => {
    getUserDetails()
  }, [goallabel])

  useEffect(() => {
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
    getWorkoutData()
    getMealData()
    getUserDetails()
    // height == ''
    // weight == ''
    // goalid !== undefined && goalid !== null
  }, [])

  const clearInputs = () => {
    setHeight('')
    setWeight('')
    setGoal('')
  }

  const getWorkoutData = async () => {
    try {
      setLoading(true)
      const response = await axios.post(
        'https://gymrat-api.vercel.app/api/gpt/workout',
        {
          height: 155,
          weight: 160,
          gender: 2,
          age: 24,
          goal: 1,
        },
        {
          headers: {
            Authorization: 'Bearer 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',
            'Content-Type': 'application/json',
          },
        }
      )
      setWorkoutPlan(response?.data?.workoutPlan)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const getMealData = async () => {
    try {
      setLoading(true)
      const response = await axios.post(
        'https://gymrat-api.vercel.app//api/gpt/meal',
        {
          height: 155,
          weight: 160,
          gender: 2,
          age: 24,
          goal: 1,
        },
        {
          headers: {
            Authorization: 'Bearer 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',
            'Content-Type': 'application/json',
          },
        }
      )
      setMealPlan(response?.data?.mealPlan)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const getUserDetails = async () => {
    const attributes = await Auth.currentUserInfo()

    try {
      setLoading(true)
      const response = await axios.get(
        `https://gymrat-api.vercel.app/api/user/details?userId=${attributes?.id}`,

        {
          headers: {
            Authorization: 'Bearer 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',
            'Content-Type': 'application/json',
          },
        }
      )
      setUserdata(response?.data)
      console.log(response?.data, 'sasassasas')
      setTimeout(async () => {
        await Loadgoalchange(response?.data[0]?.goal)
      }, 2000)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const GoalUpdate = async () => {
    const attributes = await Auth.currentUserInfo()
    const bmi = weight / (height / 100) ** 2

    try {
      let body = {
        userId: attributes.id,
        height: parseInt(height, 10),
        weight: parseInt(weight, 10),
        goal: goalid,
        age: userdata[0]?.age,
        bmiValue: bmi,
      }
      setLoading(true)
      const response = await axios.put(
        'https://gymrat-api.vercel.app/api/user/details',
        body,

        {
          headers: {
            Authorization: 'Bearer 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',
            'Content-Type': 'application/json',
          },
        }
      )
      await handlegoalchange()

      await getUserDetails()
    } catch (error) {
      console.error(error, 'errrrr')
    } finally {
      setLoading(false)
    }
  }

  const onCardView = () => {
    return (
      <CardComponent cardStyle={styles.cardcontainer}>
        <FlatList
          data={userdata}
          style={styles.flatlist}
          renderItem={({ item }) => {
            return (
              <View style={{ flexDirection: 'row' }}>
                <View style={styles.roundcontainer}>
                  <LabelComponent label={item.height} style={styles.txt} />
                  <LabelComponent label='lbs' style={styles.subtxt} />
                </View>
                <View style={styles.roundcontainer}>
                  <LabelComponent label={item.weight} style={styles.txt} />
                  <LabelComponent label='cm' style={styles.subtxt} />
                </View>
                <View style={styles.roundcontainer}>
                  <LabelComponent label={item.bmiValue.toFixed(2)} style={styles.txt} />
                </View>
              </View>
            )
          }}
        />
        <View style={styles.goalcontainer}>
          <LabelComponent label='GOAL' style={styles.goaltxt} />
          <LabelComponent label={goallabel} style={styles.gaintxt} />
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <LabelComponent label='what to update goal?' style={styles.goalchangetxt} />
          </TouchableOpacity>
        </View>
      </CardComponent>
    )
  }
  const combinedSections = [{ title: 'Workout', subtitle: 'Meal for the day' }]

  const work = [{ title: 'Workout Schedules', data: workoutPlan, subtitle: 'Workout' }]
  const Meal = [
    { title: 'Meal Plan Schedules', data: mealPlan, subtitle: 'Meal for the day' },
  ]
  const User = [{ title: 'Workout Schedules', data: userdata, subtitle: 'Workout' }]

  const handlegoalchange = async () => {
    if (goalid === 0) {
      setGoallabel('Lose Weight')
    } else if (goalid === 1) {
      setGoallabel('Gain Weight')
    } else if (goalid === 2) {
      setGoallabel('Maintain Weight')
    } else if (goalid === 3) {
      setGoallabel('Build Muscle')
    } else if (goalid === 4) {
      setGoallabel('Get Fit')
    } else {
      setGoallabel('')
    }
  }
  const Loadgoalchange = async (goal: number) => {
    if (goal === 0) {
      setGoallabel('Lose Weight')
    } else if (goal === 1) {
      setGoallabel('Gain Weight')
    } else if (goal === 2) {
      setGoallabel('Maintain Weight')
    } else if (goal === 3) {
      setGoallabel('Build Muscle')
    } else if (goal === 4) {
      setGoallabel('Get Fit')
    } else {
      setGoallabel('')
    }
  }
  return isLoading ? (
    <View style={{ backgroundColor: Colors.BLACK, flex: 1 }}>
      <ActivityIndicator
        size={'large'}
        style={{
          alignSelf: 'center',
          justifyContent: 'center',
          flex: 1,
        }}
      />
    </View>
  ) : (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <ProfileHeader
          onLogoutPress={() => {
            AsyncStorage.clear()
            Auth.signOut()
            navigation.replace(ROUTES.AUTH_STACK, { screen: ROUTES.WELCOME_SCREEN })
          }}
          Profile={true}
          onProfilePress={() =>
            navigation.navigate(ROUTES.HOME_STACK, { screen: ROUTES.PROFILE_SCREEN })
          }
          age={`Age: ${userdata[0]?.age}`}
        />
        <View>
          {onCardView()}

          <LabelComponent label='Today’s Plan' style={styles.title} />
          <FlatList
            data={combinedSections}
            scrollEnabled={false}
            renderItem={({ item }) => {
              return (
                <CardComponent>
                  <SectionList
                    sections={work}
                    renderSectionHeader={({ section: { title, subtitle } }) => {
                      return (
                        <View>
                          <LabelComponent label={subtitle} style={styles.workout} />
                        </View>
                      )
                    }}
                    renderItem={({ item }) =>
                      item.day === dayName && (
                        <View>
                          <View style={styles.tablecontainer}>
                            <View
                              style={{
                                flex: 1,
                                flexDirection: 'row',
                                justifyContent: 'flex-end',
                              }}>
                              <View></View>

                              <LabelComponent style={styles.table1} label='Sets' />
                              <LabelComponent style={styles.table1} label='Reps' />
                            </View>
                          </View>
                          {item?.exercises?.map(v => {
                            return (
                              <View>
                                <View style={styles.tablecontainer}>
                                  <LabelComponent
                                    style={styles.tableitem}
                                    label={v.name}
                                  />
                                  <View style={{ flex: 1, flexDirection: 'row' }}>
                                    <LabelComponent
                                      label={v.sets}
                                      style={styles.repsitem}
                                    />
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
                      )
                    }
                  />
                  <View>
                    <SectionList
                      sections={Meal}
                      renderSectionHeader={({ section: { title, subtitle } }) => {
                        return (
                          <View>
                            <LabelComponent label={subtitle} style={styles.subheading1} />
                          </View>
                        )
                      }}
                      renderItem={({ item }) => (
                        <>
                          {item.day === dayName && (
                            <View>
                              <View style={[styles.mealview, { marginTop: -0.5 }]}>
                                <View style={styles.mealconatiner}>
                                  <LabelComponent
                                    label='BREAKFAST'
                                    style={styles.heading1}
                                  />
                                  <LabelComponent
                                    label={`(${item.breakfast.calories}cal)`}
                                    style={styles.headingmd}
                                  />
                                </View>
                                <View>
                                  <LabelComponent
                                    label={item.breakfast.meal}
                                    style={styles.subheading}
                                  />
                                </View>
                                <View style={styles.mealconatiner}>
                                  <LabelComponent label='LUNCH' style={styles.heading1} />
                                  <LabelComponent
                                    label={`(${item.lunch.calories}cal)`}
                                    style={styles.headingmd}
                                  />
                                </View>
                                <View>
                                  <LabelComponent
                                    label={item.lunch.meal}
                                    style={styles.subheading}
                                  />
                                </View>
                                <View style={styles.mealconatiner}>
                                  <LabelComponent
                                    label='DINNER'
                                    style={styles.heading1}
                                  />
                                  <LabelComponent
                                    label={`(${item.dinner.calories}cal)`}
                                    style={styles.headingmd}
                                  />
                                </View>
                                <View>
                                  <LabelComponent
                                    label={item.dinner.meal}
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
              )
            }}
          />

          <View>
            <SectionList
              sections={work}
              renderSectionHeader={({ section: { title } }) => {
                return (
                  <View style={styles.headercontainer}>
                    <LabelComponent label={title} style={styles.title} />
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate(ROUTES.HOME_STACK, {
                          screen: ROUTES.WORKOUT_DETAILS,
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
              renderItem={({ item }) =>
                item.day === dayName && (
                  <View style={styles.card}>
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
                    {item?.exercises?.map(v => {
                      return (
                        <View>
                          <View style={styles.tablecontainer}>
                            <LabelComponent style={styles.tableitem} label={v.name} />
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                              <LabelComponent label={v.sets} style={styles.repsitem} />
                              <LabelComponent label={v.reps} style={styles.repsitem} />
                            </View>
                          </View>
                        </View>
                      )
                    })}
                  </View>
                )
              }
            />
          </View>
          {/* <View> */}
          <SectionList
            sections={Meal}
            scrollEnabled
            renderSectionHeader={({ section: { title, subtitle } }) => {
              return (
                <View style={styles.headercontainer}>
                  <LabelComponent label={title} style={styles.title} />
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate(ROUTES.HOME_STACK, {
                        screen: ROUTES.MEAL_DETAILS,
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
            renderItem={({ item }) => (
              <>
                {item.day === dayName && (
                  <CardComponent>
                    <View style={styles.mealview}>
                      <View style={styles.mealconatiner}>
                        <LabelComponent label='BREAKFAST' style={styles.heading} />
                        <LabelComponent
                          label={`(${item.breakfast.calories}cal)`}
                          style={styles.headingmd}
                        />
                      </View>
                      <View>
                        <LabelComponent
                          label={item.breakfast.meal}
                          style={styles.subheading}
                        />
                      </View>
                      <View style={styles.mealconatiner}>
                        <LabelComponent label='LUNCH' style={styles.heading} />
                        <LabelComponent
                          label={`(${item.lunch.calories}cal)`}
                          style={styles.headingmd}
                        />
                      </View>
                      <View>
                        <LabelComponent
                          label={item.lunch.meal}
                          style={styles.subheading}
                        />
                      </View>
                      <View style={styles.mealconatiner}>
                        <LabelComponent label='DINNER' style={styles.heading} />
                        <LabelComponent
                          label={`(${item.dinner.calories}cal)`}
                          style={styles.headingmd}
                        />
                      </View>
                      <View>
                        <LabelComponent
                          label={item.dinner.meal}
                          style={styles.subheading}
                        />
                      </View>
                    </View>
                  </CardComponent>
                )}
              </>
            )}
          />
          {/* </View> */}

          <>
            <Modal
              isVisible={modalVisible}
              onBackdropPress={() => setModalVisible(!modalVisible)}>
              <View style={styles.modalcontainer}>
                <LabelComponent label={Strings.UPDATE_GOAL} style={styles.modaltitle} />
                <View>
                  <LabelComponent label={Strings.HEIGHT_CMS} style={styles.label} />
                  <TextInputComponent
                    value={height}
                    placeholder={Strings.HEIGHT}
                    style={styles.txtinput}
                    onChangeText={text => setHeight(text)}
                    keyboardType='number-pad'
                  />
                </View>
                <View>
                  <LabelComponent label={Strings.WEIGHT_LBS} style={styles.label} />
                  <TextInputComponent
                    value={weight}
                    placeholder={Strings.WEIGHT}
                    style={styles.txtinput}
                    onChangeText={text => setWeight(text)}
                    keyboardType='number-pad'
                  />
                </View>
                <View>
                  <LabelComponent label={Strings.GOAL} style={styles.label} />

                  <View>
                    <TouchableOpacity
                      style={styles.dropdown}
                      onPress={() => setGoalvisible(true)}>
                      <Text style={styles.label2}>
                        {selectedgoal ? selectedgoal : 'Select Goal'}
                      </Text>
                      <AntDesign name='down' size={20} color='white' />
                    </TouchableOpacity>
                  </View>
                  <View>
                    <Modal
                      isVisible={goalvisible}
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        flex: 1,
                      }}
                      onBackdropPress={() => {
                        setGoalvisible(false)
                      }}>
                      <View style={styles.optionsContainer}>
                        {GOALDATA.map(option => (
                          <TouchableOpacity
                            key={option.id}
                            style={styles.option}
                            onPress={() => {
                              handleSelectGoal(option.label)

                              setGoalid(option?.id)
                              setGoalvisible(false)
                            }}>
                            <LabelComponent
                              label={option.label}
                              style={{
                                color: Colors.WHITE,
                                fontSize: FONT_SIZE_14,
                                marginHorizontal: 12,
                                paddingVertical: 6,
                              }}
                            />
                          </TouchableOpacity>
                        ))}
                      </View>
                    </Modal>
                  </View>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <ButtonComponent
                    onPress={() => {
                      setModalVisible(!modalVisible)
                      clearInputs()
                    }}
                    varient={ButtonVarient.cancelbutton}
                    labelVarient={TextVarient.cancel}
                    label={Strings.CANCEL}
                  />
                  <ButtonComponent
                    onPress={() => {
                      GoalUpdate()
                      setModalVisible(false)
                    }}
                    label={Strings.SAVE}
                    varient={ButtonVarient.savebutton}
                    labelVarient={TextVarient.save}
                    disabled={height == '' && weight == '' && goal == ''}
                  />
                </View>
              </View>
            </Modal>
          </>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
