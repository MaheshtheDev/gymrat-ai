import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { AntDesign, Entypo } from '@expo/vector-icons'
import {
  ButtonComponent,
  ButtonVarient,
  LabelComponent,
  TextInputComponent,
  TextVarient,
} from '@components'
import { FONT_SIZE_13, FONT_SIZE_14 } from '@styles'
import { ROUTES, Strings } from '@constants'
import React, { useEffect, useState } from 'react'

import { Auth } from 'aws-amplify'
import { AuthStackNavProps } from '@navigation'
import Colors from '@styles/colors'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Modal from 'react-native-modal'
import axios from 'axios'
import { styles } from './style'

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
  const [goalid, setGoalid] = useState(null)
  const [genderid, setGenderid] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isButtonDisabled, setIsButtonDisabled] = useState(true)

  useEffect(() => {
    checkInputsFilled()
  }, [height, weight, genderid, age, goalid])

  const checkInputsFilled = () => {
    if (
      height &&
      weight &&
      age &&
      genderid !== undefined &&
      genderid !== null &&
      goalid !== undefined &&
      goalid !== null
    ) {
      setInputFilled(true)
      setIsButtonDisabled(false)
    } else {
      setInputFilled(false)
      setIsButtonDisabled(true)
    }
  }

  const handleContinueButtonPress = async () => {
    setIsLoading(true)

    console.log(height, weight, genderid, age, goalid, 'sasas')

    if (
      height &&
      weight &&
      age &&
      genderid !== undefined &&
      genderid !== null &&
      goalid !== undefined &&
      goalid !== null
    ) {
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
        console.log(body, 'ghghghgh')

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
        // console.log(response.data, 'sasa')
        navigation.replace(ROUTES.AUTH_STACK, {
          screen: ROUTES.SIGN_IN_SCREEN,
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
    { id: 0, label: 'Lose Weight' },
    { id: 1, label: 'Gain Weight' },
    { id: 2, label: 'Maintain Weight' },
    { id: 3, label: 'Build Muscle' },
    { id: 4, label: 'Get Fit' },
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
                varient={
                  isButtonDisabled ? ButtonVarient.lightgreen : ButtonVarient.continue
                }
                labelVarient={TextVarient.black}
                label={Strings.CONTINUE}
                onPress={handleContinueButtonPress}
                disabled={isButtonDisabled}
              />
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    </SafeAreaView>
  )
}
