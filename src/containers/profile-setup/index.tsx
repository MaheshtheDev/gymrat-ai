import {
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  Text,
  View,
} from 'react-native'
import { Ionicons, Octicons } from '@expo/vector-icons'
import {
  ButtonComponent,
  ButtonVarient,
  LabelComponent,
  TextInputComponent,
  TextVarient,
} from '../../components'
import {
  FONT_SIZE_14,
  MONTSERRAT_LIGHT,
  MONTSERRAT_MEDIUM,
  MONTSERRAT_REGULAR,
} from '../../styles'
import { ROUTES, Strings } from '../../constants'
import React, { useEffect, useState } from 'react'

import Colors from '../../styles/colors'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { styles } from './style'
import { API } from '../../helpers/api'
import { User } from '../../models/api'
import * as SecureStore from 'expo-secure-store'
import { TempStorage, TempStorageKeys } from '../../helpers/tempStorage'

export function AddMoreDetailsScreen({ navigation }: any) {
  const [height, setHeight] = useState<number>(0)
  const [weight, setWeight] = useState<number>(0)
  const [name, setName] = useState('')
  const [age, setAge] = useState<number>(0)
  const [goalid, setGoalid] = useState<number>(-1)
  const [genderid, setGenderid] = useState<number>(-1)
  const [isLoading, setIsLoading] = useState(false)
  const [isButtonDisabled, setIsButtonDisabled] = useState(true)
  const [step, setStep] = useState(1)

  useEffect(() => {
    checkInputsFilled()
  }, [height, weight, genderid, age, goalid])

  useEffect(() => {
    const checkUserExistence = async () => {
      const credentialJson = await TempStorage.getItem(TempStorageKeys.APPLE_CREDENTIALS)
      const userId = JSON.parse(credentialJson || '').user
      console.log('userId ' + userId)
      const isUserExist = await API.getUserDetails(userId)
      console.log('isUserExist')
      console.log(isUserExist)
      if (isUserExist && isUserExist.status == 200) {
        console.log('user exist')
        console.log(isUserExist)
        navigation.navigate(ROUTES.HOME_STACK, {
          screen: ROUTES.HOME_SCREEN,
        })
      }
    }
    checkUserExistence()
  }, [])

  const checkInputsFilled = () => {
    if (
      (age && genderid !== undefined && genderid !== null && name && height && weight) ||
      (goalid !== undefined && goalid !== null && goalid !== -1)
    ) {
      setIsButtonDisabled(false)
    } else {
      setIsButtonDisabled(true)
    }
  }

  const handleFirstContinueButtonPress = () => {
    setStep(2)
    goalid !== -1 ? setIsButtonDisabled(false) : setIsButtonDisabled(true)
  }

  const onSaveProfile = async () => {
    const userIDNow = await SecureStore.getItemAsync('userId')
    const bmi = weight / (height / 100) ** 2
    const userDetails: User = {
      userId: userIDNow ? userIDNow : '',
      fullName: name,
      height: height,
      weight: weight,
      gender: genderid,
      age: age,
      goal: goalid,
      bmiValue: bmi,
      suggestedPlanId: "1",
    }
    console.log(userDetails)
    API.User(userDetails)
      .then(res => {
        console.log('res', res)
        console.log('pressed')
        navigation.navigate(ROUTES.HOME_STACK, {
          screen: ROUTES.HOME_SCREEN,
        })
      })
      .catch(err => {
        console.log('err', err)
      })
  }

  const GENDER = [
    { value: 0, label: 'Male' },
    { value: 1, label: 'Female' },
    { value: 2, label: 'Others' },
  ]

  const GOALDATA = [
    { value: 0, label: 'Lose Weight' },
    { value: 1, label: 'Gain Weight' },
    { value: 2, label: 'Maintain Weight' },
    { value: 3, label: 'Build Muscle' },
    { value: 4, label: 'Get Fit' },
  ]

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
      {step === 1 ? (
        <>
          <View style={styles.titlecontainer}>
            <LabelComponent style={styles.title} label='Setup your profile' />
          </View>
          <View>
            <LabelComponent
              label={'Enter your personal details to get started'}
              style={styles.subtitle}
            />
            <KeyboardAwareScrollView style={{ height: '75%' }}>
              <View>
                <View>
                  <LabelComponent label='Name*' style={styles.label} />
                  <TextInputComponent
                    placeholder={'Enter your name'}
                    style={styles.txtinput}
                    onChangeText={text => setName(text)}
                    defaultValue={name ? name : ''}
                  />
                </View>
                <View>
                  <LabelComponent label={'Age*'} style={styles.label} />
                  <TextInputComponent
                    placeholder={'Enter your age'}
                    style={styles.txtinput}
                    keyboardType='number-pad'
                    onChangeText={text => setAge(parseInt(text, 10))}
                    defaultValue={age ? age.toString() : ''}
                  />
                </View>

                <View>
                  <LabelComponent label='Height*' style={styles.label} />
                  <TextInputComponent
                    placeholder={'Enter your height in cms'}
                    style={styles.txtinput}
                    keyboardType='number-pad'
                    onChangeText={text => setHeight(parseInt(text, 10))}
                    defaultValue={height ? height.toString() : ''}
                  />
                </View>
                <View>
                  <LabelComponent label='Weight*' style={styles.label} />
                  <TextInputComponent
                    placeholder={'Enter your weight in pounds'}
                    style={styles.txtinput}
                    keyboardType='number-pad'
                    onChangeText={text => setWeight(parseInt(text, 10))}
                    defaultValue={weight ? weight.toString() : ''}
                  />
                </View>
                <View>
                  <LabelComponent label={Strings.GENDER} style={styles.label} />
                  <View
                    style={{
                      paddingHorizontal: 25,
                      paddingVertical: 10,
                      flexDirection: 'row',
                    }}>
                    {GENDER.map(({ label, value }) => (
                      <Pressable
                        key={value}
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          paddingHorizontal: 10,
                        }}
                        onPress={() => setGenderid(value)}>
                        {genderid === value ? (
                          <Octicons name='dot-fill' size={28} color='#49FF09BF' />
                        ) : (
                          <Octicons name='dot' size={28} color='#49FF09BF' />
                        )}
                        <Text
                          style={{
                            color: 'white',
                            paddingHorizontal: 5,
                            fontFamily: MONTSERRAT_MEDIUM,
                          }}>
                          {label}
                        </Text>
                      </Pressable>
                    ))}
                  </View>
                </View>
                <View style={styles.buttoncontainer}>
                  <ButtonComponent
                    varient={
                      isButtonDisabled ? ButtonVarient.lightgreen : ButtonVarient.continue
                    }
                    labelVarient={TextVarient.black}
                    label={'Next'}
                    onPress={handleFirstContinueButtonPress}
                    disabled={isButtonDisabled}
                  />
                </View>
              </View>
            </KeyboardAwareScrollView>
          </View>
        </>
      ) : (
        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 25,
              paddingTop: 15,
              alignItems: 'center',
            }}>
            <Ionicons
              name='arrow-back-sharp'
              size={24}
              color='white'
              onPress={() => {
                setStep(1)
                setIsButtonDisabled(true)
                checkInputsFilled()
              }}
            />
            <Pressable
              style={isButtonDisabled ? styles.disabledButton : styles.button}
              disabled={isButtonDisabled}
              onPress={() => {
                onSaveProfile()
              }}>
              <Text
                style={{
                  color: 'black',
                  fontFamily: MONTSERRAT_REGULAR,
                }}>
                Get my plan
              </Text>
            </Pressable>
          </View>
          <View style={styles.titlecontainer}>
            <LabelComponent style={styles.title} label="What's your Goal?" />
          </View>
          <View>
            <LabelComponent
              label={'Enter your goal to get your personalized diet plan'}
              style={styles.subtitle}
            />
            <KeyboardAwareScrollView style={{ height: '75%' }}>
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
                      onPress={() => setGoalid(value)}>
                      <Text
                        style={
                          value === goalid ? styles.selectedOptionText : styles.optionText
                        }>
                        {label}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </View>
            </KeyboardAwareScrollView>
          </View>
        </View>
      )}
    </SafeAreaView>
  )
}

//function secondStep() {
//  return (
//    <>
//      <View>
//        <LabelComponent label={Strings.HEIGHT_CMS} style={styles.label} />
//        <TextInputComponent
//          placeholder={Strings.HEIGHT}
//          style={styles.txtinput}
//          keyboardType='number-pad'
//          onChangeText={text => setHeight(parseInt(text, 10))}
//        />
//      </View>
//      <View>
//        <LabelComponent label={Strings.WEIGHT_LBS} style={styles.label} />
//        <TextInputComponent
//          placeholder={Strings.WEIGHT}
//          style={styles.txtinput}
//          keyboardType='number-pad'
//          onChangeText={text => setWeight(parseInt(text, 10))}
//        />
//      </View>
//      <View>
//        <LabelComponent label={Strings.GOAL} style={styles.label} />

//        <View>
//          <TouchableOpacity style={styles.dropdown} onPress={() => setModalVisible(true)}>
//            <Text style={styles.label1}>
//              {selectedgoal ? selectedgoal : 'Select Goal'}
//            </Text>
//            <AntDesign name='down' size={20} color='white' />
//          </TouchableOpacity>
//        </View>
//        <View>
//          <Modal
//            isVisible={modalVisible}
//            style={{
//              alignItems: 'center',
//              justifyContent: 'center',
//              flex: 1,
//            }}
//            onBackdropPress={() => {
//              setModalVisible(false)
//            }}>
//            <View style={styles.optionsContainer}>
//              {GOALDATA.map(option => (
//                <TouchableOpacity
//                  key={option.id}
//                  style={styles.option}
//                  onPress={() => {
//                    handleSelectGoal(option.label)
//                    setGoalid(option?.id)
//                    setModalVisible(false)
//                  }}>
//                  <LabelComponent
//                    label={option.label}
//                    style={{
//                      color: Colors.WHITE,
//                      fontSize: FONT_SIZE_14,
//                      marginHorizontal: 12,
//                      paddingVertical: 6,
//                    }}
//                  />
//                </TouchableOpacity>
//              ))}
//            </View>
//          </Modal>
//        </View>
//      </View>
//    </>
//  )
//}
