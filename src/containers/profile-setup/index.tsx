import { ActivityIndicator, Pressable, SafeAreaView, Text, View } from 'react-native'
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
import { TempStorage, TempStorageKeys } from '../../helpers/tempStorage'
import { useUserStore } from '../../store/userStore'
import { Loader } from '../../components/Loader'

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
  const user = useUserStore(state => state.user)
  const [credential, setCredential] = useState<any>({ fullName: { givenName: '' } })
  //const { userToken } = route.params

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
    //await API.logOut();
    //setIsLoading(false);
    const bmi = weight / (height / 100) ** 2
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
              sentry-label='GetMyPlan Button'
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