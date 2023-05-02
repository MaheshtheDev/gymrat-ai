import React, { useEffect, useState } from 'react'

import { AuthStackNavProps } from '@navigation'
import {
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from 'react-native'
import { styles } from './style'
import Modal from 'react-native-modal'

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import {
  ButtonComponent,
  ButtonVarient,
  LabelComponent,
  TextInputComponent,
  TextVarient,
} from '@components'
import { ROUTES, Strings } from '@constants'
import axios from 'axios'
import { Auth } from 'aws-amplify'
import { AntDesign, Entypo } from '@expo/vector-icons'
import Colors from '@styles/colors'
import { FONT_SIZE_13, FONT_SIZE_14 } from '@styles'
export const AddMoreDetailsScreen: React.FC<
  AuthStackNavProps<'AddMoreDetailsScreen'>
> = ({ navigation, route }) => {
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')
  const [gender, setGender] = useState('')
  const [age, setAge] = useState('')
  const [goal, setGoal] = useState('')
  const [hide, setHide] = useState(false)
  const [selectedLabel, setSelectedLabel] = useState('')
  const [selectedgoal, setSelectedgoal] = useState('')
  const [showOptions, setShowOptions] = useState(false)
  const [inputFilled, setInputFilled] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [genderModal, setGenderModal] = useState(false)
  const [goalid, setGoalid] = useState(0)
  const [genderid, setGenderid] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const handleContinueButtonPress = async () => {
    setIsLoading(true)

    
    if (height && weight && genderid && age && goalid) {
      setInputFilled(true)

      const bmi = weight / (height / 100) ** 2

      const attributes = await Auth.currentUserInfo()

      try {
        const body = JSON.stringify({
          userId: attributes.id,
          height: parseInt(height, 10),
          weight: parseInt(weight, 10),
          gender: genderid,
          age: parseInt(age, 10),
          goal: goalid,
          bmiValue: bmi,
        })

        console.log(body, 'bodysagar')
        const response = await axios.post(
          'https://gymrat-api.vercel.app/api/user/details',
          body,
          {
            headers: {
              Authorization: 'Bearer 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',
              'Content-Type': 'application/json',
            },
          }
        )
        console.log(response.data, 'sasa')
        navigation.navigate(ROUTES.AUTH_STACK, {
          screen: ROUTES.HOME_SCREEN,
        })
      } catch (error) {
        console.log(error, 'err')
        console.error(error)
        setIsLoading(false)
      } finally {
        setIsLoading(false)
      }
    } else {
      setInputFilled(false)
      setIsLoading(false)
    }
  }

  const GENDER = [
    { id: 0, label: 'Male' },
    { id: 1, label: 'Female' },
    { id: 2, label: 'Others' },
  ]
  const GOALDATA = [
    { id: 0, label: 'LoseWeight' },
    { id: 1, label: 'GAINWEIGHT' },
    { id: 2, label: 'MAINTAINWEIGHT' },
    { id: 3, label: 'BUILDMUSCLE' },
    { id: 4, label: 'GETFIT' },
  ]

  const handleSelectOption = (label: string) => {
    setSelectedLabel(label)
    setShowOptions(false)
  }
  const handleSelectGoal = (label: string) => {
    setSelectedgoal(label)
    setHide(false)
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
      <View style={styles.titlecontainer}>
        <LabelComponent style={styles.title} label={Strings.ADD_GOAL_AND_METRICS} />
      </View>
      <View>
        <LabelComponent
          label={Strings.ADD_GOAL_SCREEN_DESCRIPTION_TEXT}
          style={styles.subtitle}
        />
        <KeyboardAwareScrollView>
          <View>
            <View>
              <LabelComponent label={Strings.HEIGHT_CMS} style={styles.label} />
              <TextInputComponent
                placeholder={Strings.HEIGHT}
                style={styles.txtinput}
                keyboardType='number-pad'
                onChangeText={text => setHeight(text)}
              />
            </View>
            <View>
              <LabelComponent label={Strings.WEIGHT_LBS} style={styles.label} />
              <TextInputComponent
                placeholder={Strings.WEIGHT}
                style={styles.txtinput}
                keyboardType='number-pad'
                onChangeText={text => setWeight(text)}
              />
            </View>
            <View>
              <LabelComponent label={Strings.GENDER} style={styles.label} />
              <View>
                <TouchableOpacity
                  style={styles.dropdown}
                  onPress={() => setGenderModal(true)}>
                  <Text style={styles.label1}>
                    {selectedLabel ? selectedLabel : 'Select gender'}
                  </Text>
                  <AntDesign name='down' size={20} color='white' />
                </TouchableOpacity>
              </View>
              <>
                <Modal
                  isVisible={genderModal}
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    flex: 1,
                  }}
                  onBackdropPress={() => {
                    setGenderModal(false)
                  }}>
                  <View style={styles.optionsContainer}>
                    {GENDER.map(option => (
                      <TouchableOpacity
                        key={option.id}
                        style={styles.option}
                        onPress={() => {
                          handleSelectOption(option.label),
                            setGenderModal(false),
                            setGenderid(option?.id)
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
              </>
            </View>
            <View>
              <LabelComponent label={Strings.AGE} style={styles.label} />
              <TextInputComponent
                placeholder={'23'}
                style={styles.txtinput}
                keyboardType='number-pad'
                onChangeText={text => setAge(text)}
              />
            </View>

            <View>
              <LabelComponent label={Strings.GOAL} style={styles.label} />

              <View>
                <TouchableOpacity
                  style={styles.dropdown}
                  onPress={() => setModalVisible(true)}>
                  <Text style={styles.label1}>
                    {selectedgoal ? selectedgoal : 'Select Goal'}
                  </Text>
                  <AntDesign name='down' size={20} color='white' />
                </TouchableOpacity>
              </View>
              <View>
                <Modal
                  isVisible={modalVisible}
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    flex: 1,
                  }}
                  onBackdropPress={() => {
                    setModalVisible(false)
                  }}>
                  <View style={styles.optionsContainer}>
                    {GOALDATA.map(option => (
                      <TouchableOpacity
                        key={option.id}
                        style={styles.option}
                        onPress={() => {
                          handleSelectGoal(option.label)
                          setGoalid(option?.id)
                          setModalVisible(false)
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

            <View style={styles.buttoncontainer}>
              <ButtonComponent
                varient={ButtonVarient.lightgreen}
                labelVarient={TextVarient.black}
                label={Strings.CONTINUE}
                onPress={handleContinueButtonPress}
              />
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    </SafeAreaView>
  )
}
