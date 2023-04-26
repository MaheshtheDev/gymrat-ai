import React, { useEffect, useState } from 'react'

import { AuthStackNavProps } from '@navigation'
import { View, SafeAreaView, ScrollView } from 'react-native'
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
import { Auth } from 'aws-amplify'

export const SignUpScreen: React.FC<AuthStackNavProps<'SignUpScreen'>> = ({
  navigation,
  route,
}) => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isValid, setIsValid] = useState(false)

  useEffect(() => {
    setIsValid(
      firstName !== '' &&
        lastName !== '' &&
        email !== '' &&
        password !== '' &&
        confirmPassword !== ''
    )
  }, [firstName, lastName, email, password, confirmPassword])

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
        },
        autoSignIn: {
          enabled: true,
        },
      })
    } catch (error) {
      console.log('error signing up:', error)
    }
  }

  const handleContinuePress = () => {
    if (isValid && password == confirmPassword) {
      signUp(firstName, lastName, password, email)
      navigation.push(ROUTES.AUTH_STACK, {
        screen: ROUTES.SIGN_UP_OTP_SCREEN,
        params: { email },
      })
    } else {
      console.log('passwords are not same')
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
              placeholder={Strings.FRIST_NAME}
              onChangeText={txt => setFirstName(txt)}
            />
            <TextInputComponent
              placeholder={Strings.LAST_NAME}
              onChangeText={txt => setLastName(txt)}
            />
            <TextInputComponent
              placeholder={Strings.EMAIL}
              onChangeText={txt => setEmail(txt)}
            />
            <TextInputComponent
              textContentType='oneTimeCode'
              placeholder={Strings.PASSWORD}
              secureTextEntry
              onChangeText={txt => setPassword(txt)}
            />
            <TextInputComponent
              textContentType='oneTimeCode'
              placeholder={Strings.CONFIRM_PASSWORD}
              secureTextEntry
              onChangeText={txt => setConfirmPassword(txt)}
            />
          </View>
          <View style={styles.buttoncontainer}>
            <ButtonComponent
              onPress={handleContinuePress}
              varient={isValid ? ButtonVarient.continue : ButtonVarient.lightgreen}
              label={Strings.CONTINUE}
              labelVarient={TextVarient.black}
            />
          </View>
        </KeyboardAwareScrollView>
      </ScrollView>
    </SafeAreaView>
  )
}
