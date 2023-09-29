import { ActivityIndicator, Alert, Pressable, SafeAreaView, Text, View } from 'react-native'
import { Ionicons, Octicons } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react'

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import Colors from '../../styles/colors'
import {
  ButtonComponent,
  ButtonVarient,
  LabelComponent,
  TextInputComponent,
  TextVarient,
  Loader,
} from '../../components'
import {
  MONTSERRAT_MEDIUM,
  MONTSERRAT_REGULAR,
} from '../../styles'
import { ROUTES, Strings, GENDER, GOALDATA } from '../../constants'
import { styles } from './style'
import { API, TempStorage, TempStorageKeys } from '../../helpers'
import { User } from '../../models/api'

export function AddMoreDetailsScreen({ route, navigation }: any) {
  const [height, setHeight] = useState<number>(0)
  const [weight, setWeight] = useState<number>(0)
  const [name, setName] = useState('')
  const [age, setAge] = useState<number>(0)
  const [goalid, setGoalid] = useState<number>(-1)
  const [genderid, setGenderid] = useState<number>(-1)
  const [isLoading, setIsLoading] = useState(false)
  const [isButtonDisabled, setIsButtonDisabled] = useState(true)
  const [step, setStep] = useState(1)
  const [error, setError] = useState('')
  const [heightError, setHeightError] = useState('')
  const [weightError, setWeightError] = useState('')
  const [credential, setCredential] = useState<any>({ fullName: { givenName: '' } })

  useEffect(() => {
    checkInputsFilled()
  }, [height, weight, genderid, age, goalid])

  useEffect(() => {
    const checkUserExistence = async () => {
      const credentialJson = await TempStorage.getItem(TempStorageKeys.APPLE_CREDENTIALS)

      const parsedCredentials = JSON.parse(credentialJson || '')
      if (parsedCredentials) {
        setCredential(parsedCredentials)
        setName(parsedCredentials.fullName.givenName)
        const isUserExist = await API.getUserDetails(parsedCredentials.user)
        if (isUserExist && isUserExist.status == 200) {
          console.log('user exist')
          console.log(isUserExist)
          navigation.navigate(ROUTES.HOME_SCREEN)
          setStep(1)
        }
      }
    }
    checkUserExistence()
  }, [])

  const checkInputsFilled = () => {
    if (
      (age &&
        genderid !== undefined &&
        genderid !== null &&
        genderid !== -1 &&
        name &&
        height &&
        weight) ||
      (goalid !== undefined && goalid !== null && goalid !== -1)
    ) {
      setIsButtonDisabled(false)
    } else {
      setIsButtonDisabled(true)
    }
  }

  const handleAgeChange = (text: string) => {
    const ageNum = parseInt(text)
    if (isNaN(ageNum) || ageNum < 18) {
      setError('*Age must be 18 or older')
    } else {
      setError('')
    }
    setAge(ageNum)
  }

  const handleHeightChange = (text: string) => {
    const heightNum = parseInt(text)
    if (isNaN(heightNum) || heightNum <= 50 || heightNum >= 300) {
      setHeightError('*Please enter a valid height in cms')
    } else {
      setHeightError('')
    }
    setHeight(heightNum)
  }

  const handleWeightChange = (text: string) => {
    const weightNum = parseInt(text)
    if (isNaN(weightNum) || weightNum <= 10) {
      setWeightError('*Please enter a valid weight in pounds')
    } else {
      setWeightError('')
    }
    setWeight(weightNum)
  }

  const handleFirstContinueButtonPress = () => {
    if (
      name === '' ||
      age === 0 ||
      height === 0 ||
      weight === 0 ||
      genderid === -1 ||
      weightError !== '' ||
      heightError !== '' ||
      error !== ''
    ) {
      Alert.alert('Please fill all required details')
      return
    }
    setStep(2)
    goalid !== -1 ? setIsButtonDisabled(false) : setIsButtonDisabled(true)
  }

  const onSaveProfile = async () => {
    const bmi = (weight * 0.453592) / (height * 0.01) ** 2
    const userDetails: User = {
      userId: credential.user,
      fullName: name,
      height: height,
      weight: weight,
      gender: genderid,
      age: age,
      goal: goalid,
      bmiValue: bmi,
      suggestedPlanId: '1',
      email: credential.email,
    }
    console.log(userDetails)
    API.User(userDetails)
      .then(res => {
        console.log('res', res)
        console.log('pressed')
        navigation.navigate(ROUTES.HOME_SCREEN)
        setStep(1)
      })
      .catch(err => {
        console.log('err', err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return isLoading ? (
    <Loader />
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
                    style={[styles.txtinput, { backgroundColor: '#1E1E1E' }]}
                    onChangeText={text => setName(text)}
                    defaultValue={name ? name : ''}
                    editable={credential.fullName.givenName ? false : true}
                  />
                </View>
                <View>
                  <LabelComponent label={'Age*'} style={styles.label} />
                  <TextInputComponent
                    placeholder={'Enter your age'}
                    style={styles.txtinput}
                    keyboardType='number-pad'
                    onChangeText={text => handleAgeChange(text)}
                    defaultValue={age ? age.toString() : ''}
                  />
                  {error !== '' && <Text style={styles.inputError}>{error}</Text>}
                </View>

                <View>
                  <LabelComponent label='Height(in cms)*' style={styles.label} />
                  <TextInputComponent
                    placeholder={'Enter your height in cms'}
                    style={styles.txtinput}
                    keyboardType='number-pad'
                    onChangeText={handleHeightChange}
                    defaultValue={height ? height.toString() : ''}
                  />
                  {heightError !== '' && (
                    <Text style={styles.inputError}>{heightError}</Text>
                  )}
                </View>

                <View>
                  <LabelComponent label='Weight(in pounds)*' style={styles.label} />
                  <TextInputComponent
                    placeholder={'Enter your weight in pounds'}
                    style={styles.txtinput}
                    keyboardType='number-pad'
                    onChangeText={handleWeightChange}
                    defaultValue={weight ? weight.toString() : ''}
                  />
                  {weightError !== '' && (
                    <Text style={styles.inputError}>{weightError}</Text>
                  )}
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
      ) : isLoading ? (
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
                setIsLoading(true)
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
