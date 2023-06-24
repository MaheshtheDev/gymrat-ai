import React, { useEffect, useState } from 'react'

import { AuthStackNavProps } from '@navigation'
import { View, SafeAreaView, ScrollView, Alert } from 'react-native'
import { styles } from './style'
import {
  ButtonComponent,
  ButtonVarient,
  LabelComponent,
  TextInputComponent,
  TextVarient,
} from '@components'
import { ROUTES, Strings } from '@constants'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Auth, Hub } from 'aws-amplify'

export const SignUpScreen: React.FC = ({ navigation, route }) => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isValid, setIsValid] = useState(false)
  const [isValidpassword, setIsValidpassword] = useState(true)
  const [userexits, setUserexits] = useState(true)
  useEffect(() => {
    setIsValid(
      firstName !== '' &&
        lastName !== '' &&
        email !== '' &&
        password !== '' &&
        confirmPassword.length >= 7
    )
  }, [firstName, lastName, email, password, confirmPassword])

  useEffect(() => {
    listenToAutoSignInEvent()
  }, [])

  const signUp = async (
    firstname: string,
    lastname: string,
    password: string,
    username: string
  ) => {
    try {
      const { user } = await Auth.signUp({
        firstname,
        lastname,
        password,
        username,
        attributes: {
          email: username,
          name: firstName + ' ' + lastName,
        },
        autoSignIn: {
          enabled: true,
        },
      })
    } catch (error) {
      Alert.alert('', error.message)
      console.log('error signing up:', error)
    }
  }

  const handleContinuePress = async () => {
    if (isValid && password === confirmPassword) {
      try {
        await Auth.signIn(email, password)
        setUserexits(false)
        console.log('user is already sign up')
        Alert.alert('', error.message)
      } catch (error) {
        if (error.code === 'UserNotFoundException') {
          signUp(firstName, lastName, password, email)
          navigation.push(ROUTES.AUTH_STACK, {
            screen: ROUTES.SIGN_UP_OTP_SCREEN,
            params: { email },
          })
        } else {
          Alert.alert('', error.message)
        }
      }
    } else {
      console.log('passwords are not same')
      Alert.alert('passwords and confirm password are not same')
    }
  }

  function listenToAutoSignInEvent() {
    Hub.listen('auth', ({ payload }) => {
      const { event } = payload
      if (event === 'autoSignIn') {
        const user = payload.data
      } else if (event === 'autoSignIn_failure') {
        navigation.push(ROUTES.AUTH_STACK, {
          screen: ROUTES.SIGN_IN_SCREEN,
        })
      }
    })
  }

  const handlePasswordChange = (password: string, confirmPassword?: string) => {
    setPassword(password)
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    setIsValidpassword(regex.test(password))

    if (confirmPassword !== '' && password !== confirmPassword) {
      setIsValidpassword(false)
    }
  }

  return (
    <SafeAreaView style={styles.coinatiner}>
      <ScrollView>
        <LabelComponent label={Strings.SET_UP_PROFILE} style={styles.title} />
        <LabelComponent label={Strings.PROFILE_DESCRIPTION} style={styles.subtitle} />
        <KeyboardAwareScrollView>
          <View>
            <TextInputComponent
              value={firstName}
              placeholder={Strings.FRIST_NAME}
              onChangeText={txt => setFirstName(txt)}
            />
            <TextInputComponent
              value={lastName}
              placeholder={Strings.LAST_NAME}
              onChangeText={txt => setLastName(txt)}
            />
            <TextInputComponent
              value={email}
              placeholder={Strings.EMAIL}
              onChangeText={txt => setEmail(txt)}
            />
            <TextInputComponent
              value={password}
              textContentType='oneTimeCode'
              placeholder={Strings.PASSWORD}
              secureTextEntry
              onChangeText={txt => {
                setPassword(txt), handlePasswordChange(txt)
              }}
            />
            <TextInputComponent
              value={confirmPassword}
              textContentType='oneTimeCode'
              placeholder={Strings.CONFIRM_PASSWORD}
              secureTextEntry
              onChangeText={txt => {
                setConfirmPassword(txt), handlePasswordChange(password, txt)
              }}
            />
          </View>
          {!isValidpassword && (
            <LabelComponent
              label={
                'Password must have at least 8 characters, at least one uppercase letter or check password and confrim password are not same'
              }
              style={{
                color: 'red',
                alignSelf: 'center',
                marginTop: 5,
                marginHorizontal: 15,
              }}
            />
          )}
          {!userexits && (
            <LabelComponent
              label={'user already exists'}
              style={{
                color: 'red',
                alignSelf: 'center',
                marginTop: 5,
                marginHorizontal: 15,
              }}
            />
          )}
          <View style={styles.buttoncontainer}>
            <ButtonComponent
              onPress={handleContinuePress}
              varient={isValid ? ButtonVarient.continue : ButtonVarient.lightgreen}
              label={Strings.CONTINUE}
              labelVarient={TextVarient.black}
              disabled={!isValid}
            />
          </View>
        </KeyboardAwareScrollView>
      </ScrollView>
    </SafeAreaView>
  )
}
