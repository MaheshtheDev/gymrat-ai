import { Alert, SafeAreaView, Text, View } from 'react-native'
import {
  ButtonComponent,
  ButtonVarient,
  LabelComponent,
  TextInputComponent,
  TextVarient,
} from '@components'
import { FONT_SIZE_10, FONT_SIZE_12 } from '@styles'
import { ROUTES, Strings } from '@constants'
import React, { useState } from 'react'

import { Auth } from 'aws-amplify'
import { AuthStackNavProps } from '@navigation'
import { styles } from './style'

export const SignInScreen: React.FC<AuthStackNavProps<'SignInScreen'>> = ({
  navigation,
  route,
}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isValid, setIsValid] = useState(true)

  const isCodeEntered = email && password.length >= 7

  const signIn = async () => {
    try {
      const user = await Auth.signIn(email, password)

      navigation.navigate(ROUTES.AUTH_STACK, { screen: ROUTES.HOME_SCREEN })
    } catch (error) {
      Alert.alert('', error?.message)
      console.log('error signing in', error)
    }
  }

  const handlePasswordChange = (password: string) => {
    setPassword(password)
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    setIsValid(regex.test(password))
  }

  return (
    <SafeAreaView style={styles.container}>
      <LabelComponent style={styles.title} label={Strings.SIGN_IN_TITLE} />
      <View>
        <LabelComponent
          label={Strings.SIGN_IN_DESCRIPTION_TEXT}
          style={styles.subtitle}
        />
        <View>
          <TextInputComponent
            placeholder={Strings.EMAIL}
            onChangeText={txt => setEmail(txt)}
            value={email}
          />
          <TextInputComponent
            placeholder={Strings.PASSWORD}
            value={password}
            secureTextEntry
            onChangeText={txt => {
              setPassword(txt), handlePasswordChange(txt)
            }}
          />
        </View>

        {/* {!isValid && (
          <LabelComponent
            label={
              'Password must have at least 8 characters, at least one uppercase letter'
            }
            style={{ color: 'red', alignSelf: 'center', marginTop: 5 }}
          />
        )} */}

        <View style={styles.buttoncontainer}>
          <ButtonComponent
            label={Strings.LOGIN}
            varient={!isCodeEntered ? ButtonVarient.lightgreen : ButtonVarient.continue}
            labelVarient={TextVarient.black}
            onPress={signIn}
            disabled={!isCodeEntered}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}
