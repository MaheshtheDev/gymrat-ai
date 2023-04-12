import React, { useEffect, useState } from 'react'

import { AuthStackNavProps } from '@navigation'
import { SafeAreaView, SectionList, View, FlatList, TouchableOpacity } from 'react-native'
import { styles } from './style'
import Modal from 'react-native-modal'
import axios from 'axios'

import { Entypo } from '@expo/vector-icons'
import {
  ButtonComponent,
  ButtonVarient,
  CardComponent,
  LabelComponent,
  TextInputComponent,
  TextVarient,
} from '@components'
import { Strings } from '@constants'
import Colors from '@styles/colors'

export const HomeScreen: React.FC<AuthStackNavProps<'HomeScreen'>> = ({
  navigation,
  route,
}) => {
  useEffect(() => {
    console.log('sagar')
    const getWorkoutSuggestion = async () => {
      try {
        const response = await axios.post(
          'https://api.openai.com/v1/chat/completions?model=gpt-3.5-turbo',
          {
            prompt: 'workout',
            max_tokens: 50,
            n: 1,
            stop: '\n',
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${YOUR_OPENAI_API_KEY}`,
            },
          }
        )
        console.log(response.data)
      } catch (error) {
        console.error(error)
      }
    }
  }, [])

  const [modalVisible, setModalVisible] = useState(false)

  const DATA4 = [
    {
      id: 0,
      data: [
        {
          key: 0,
          size: '178',
          perameter: 'lbs',
          label: 'Weight',
        },
        {
          key: 1,
          size: '177.08',
          perameter: 'cm',
          label: 'Height',
        },
        {
          key: 2,
          size: '178',
          perameter: '',
          label: 'BMI',
        },
      ],
    },
  ]
  const DATA = [
    {
      id: 1,
      data: [
        { key: '0', exercise: 'MONDAY', sets: 'Sets', reps: 'Reps', header: 'Workout' },
        {
          key: '1',
          exercise: 'Barbell Squats',
          sets: '3',
          reps: 10,
          header: 'Workout',
        },
        {
          key: '2',
          exercise: 'Deadlifts',
          sets: 3,
          reps: 10,
          header: 'Workout',
        },
        {
          key: '3',
          exercise: 'Bench Press',
          sets: 3,
          reps: 10,
          header: 'Workout',
        },
      ],
    },
  ]

  const DATA2 = [
    {
      id: 2,
      data: [
        {
          key: '0',
          heading: 'BREAKFAST',
          headingmd: '(400 cal)',
          subHeading: 'Avocado toast with poached eggs and salsa',
          header: 'Meal',
        },
        {
          key: '1',
          heading: 'LUNCH',
          headingmd: '(250 cal)',
          subHeading: 'Grilled turkey burger with sweet potato fries',

          header: 'Meal',
        },
        {
          key: '2',
          heading: 'DINNER',
          headingmd: '(350 cal)',
          subHeading: `Grilled salmon with roasted asparagus and\nbrown rice`,

          header: 'Meal',
        },
      ],
    },
  ]
  const DATA3 = [
    {
      id: 3,
      data: [
        { key: '0', exercise: 'Workout' },
        { key: '1', sets: 'Sets', reps: 'Reps', header: 'Workout' },
        {
          key: '2',
          exercise: 'Barbell Squats',
          sets: '3',
          reps: 10,
          header: 'Workout',
        },
        {
          key: '3',
          exercise: 'Deadlifts',
          sets: 3,
          reps: 10,
          header: 'Workout',
        },
        {
          key: '4',
          exercise: 'Bench Press',
          sets: 3,
          reps: 10,
          header: 'Workout',
        },
        {
          key: '5',
          subHeading: 'Meal for the day',
          header: 'Meal for the day',
        },
        {
          key: '6',
          heading: 'BREAKFAST',
          headingmd: '(400 cal)',
          subHeading: 'Avocado toast with poached eggs and salsa',
          header: 'Meal',
          subheader: 'xyz',
        },
        {
          key: '7',
          heading: 'LUNCH',
          headingmd: '(250 cal)',
          subHeading: 'Grilled turkey burger with sweet potato fries',

          header: 'Meal',
          subheader: 'xyz',
        },
        {
          key: '8',
          heading: 'DINNER',
          headingmd: '(350 cal)',
          subHeading: `Grilled salmon with roasted asparagus and\nbrown rice`,

          header: 'Meal',
          subheader: 'xyz',
        },
      ],
    },
  ]

  const sections = [
    { title: 'Today’s Plan', subtitle: 'abc', data: DATA4 },
    { title: 'Today’s Plan', subtitle: 'Meal for the day', data: DATA3 },
    { title: 'Workout Schedules', subtitle: 'Meal for the day', data: DATA },
    { title: 'Meal Plan Schedules', subtitle: 'Meal for the day', data: DATA2 },
  ]
  const onCardView = item => {
    return (
      <CardComponent cardStyle={styles.cardcontainer}>
        <FlatList
          data={DATA4[0].data}
          style={styles.flatlist}
          renderItem={({ item }) => {
            return (
              <View>
                <View style={styles.roundcontainer}>
                  <LabelComponent label={item.size} style={styles.txt} />
                  {item.perameter && (
                    <LabelComponent label={item.perameter} style={styles.subtxt} />
                  )}
                </View>
                <LabelComponent label={item.label} style={styles.label1} />
              </View>
            )
          }}
        />
        <View style={styles.goalcontainer}>
          <LabelComponent label='GOAL' style={styles.goaltxt} />
          <LabelComponent label='Gain Muscle' style={styles.gaintxt} />
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <LabelComponent label='what to update goal?' style={styles.goalchangetxt} />
          </TouchableOpacity>
        </View>
      </CardComponent>
    )
  }
  return (
    <SafeAreaView style={styles.container}>
      <SectionList
        sections={sections}
        renderSectionHeader={({ section: { title, subtitle } }) => {
          return (
            <View style={styles.headercontainer}>
              {subtitle != 'abc' && <LabelComponent label={title} style={styles.title} />}
              {title != 'Today’s Plan' && (
                <TouchableOpacity>
                  <View style={styles.iconcontainer}>
                    <LabelComponent
                      label='View all'
                      style={[
                        title == 'Workout Schedules'
                          ? styles.viewalltxt
                          : [styles.viewalltxt, { color: Colors.CHLOROPHYL_GREEN }],
                      ]}
                    />
                    <Entypo
                      name='chevron-thin-right'
                      size={15}
                      color={Colors.CHLOROPHYL_GREEN}
                    />
                  </View>
                </TouchableOpacity>
              )}
            </View>
          )
        }}
        stickySectionHeadersEnabled={false}
        renderItem={({ item, index }) => {
          return (
            <>
              {item.id == 0 ? (
                onCardView(item)
              ) : (
                <View style={styles.card}>
                  {item?.data?.map(v => {
                    return (
                      <>
                        {v.header == 'Meal' || v.header == 'Meal for the day' ? (
                          <>
                            <View style={styles.mealconatiner}>
                              {v.subheader == 'xyz' ? (
                                <LabelComponent
                                  label={v.heading}
                                  style={styles.heading1}
                                />
                              ) : (
                                <LabelComponent
                                  label={v.heading}
                                  style={styles.heading}
                                />
                              )}
                              <LabelComponent
                                label={v.headingmd}
                                style={styles.headingmd}
                              />
                            </View>
                            {v.subHeading == 'Meal for the day' ? (
                              <LabelComponent
                                label={v.subHeading}
                                style={styles.subheading1}
                              />
                            ) : (
                              <LabelComponent
                                label={v.subHeading}
                                style={styles.subheading}
                              />
                            )}
                          </>
                        ) : (
                          <View style={styles.item}>
                            {v.exercise == 'MONDAY' ? (
                              <LabelComponent
                                style={styles.tableitem1}
                                label={v.exercise}
                              />
                            ) : (
                              <LabelComponent
                                style={[
                                  v.exercise == 'Workout'
                                    ? styles.workout
                                    : styles.tableitem,
                                ]}
                                label={v.exercise}
                              />
                            )}
                            <View style={styles.tablecontainer}>
                              <View style={styles.setsContainer}>
                                <LabelComponent style={styles.tableitem} label={v.sets} />
                              </View>
                              <View style={styles.repsContainer}>
                                <LabelComponent style={styles.tableitem} label={v.reps} />
                              </View>
                            </View>
                          </View>
                        )}
                      </>
                    )
                  })}
                </View>
              )}
            </>
          )
        }}
      />
      <>
        <Modal
          isVisible={modalVisible}
          onBackdropPress={() => setModalVisible(!modalVisible)}>
          <View style={styles.modalcontainer}>
            <LabelComponent label={Strings.UPDATE_GOAL} style={styles.modaltitle} />
            <View>
              <LabelComponent label={Strings.HEIGHT_CMS} style={styles.label} />
              <TextInputComponent
                placeholder={Strings.HEIGHT}
                style={styles.txtinput}
                keyboardType='number-pad'
              />
            </View>
            <View>
              <LabelComponent label={Strings.WEIGHT_LBS} style={styles.label} />
              <TextInputComponent
                placeholder={Strings.WEIGHT}
                style={styles.txtinput}
                keyboardType='number-pad'
              />
            </View>
            <View>
              <LabelComponent label={Strings.GOAL} style={styles.label} />
              <TextInputComponent
                placeholder={Strings.GOAL}
                style={styles.txtinput}
                keyboardType='number-pad'
              />
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <ButtonComponent
                onPress={() => setModalVisible(!modalVisible)}
                varient={ButtonVarient.cancelbutton}
                labelVarient={TextVarient.cancel}
                label={Strings.CANCEL}
              />
              <ButtonComponent
                label={Strings.SAVE}
                varient={ButtonVarient.savebutton}
                labelVarient={TextVarient.save}
              />
            </View>
          </View>
        </Modal>
      </>
    </SafeAreaView>
  )
}
