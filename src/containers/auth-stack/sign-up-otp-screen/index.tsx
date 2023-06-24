import React, { useState } from 'react'

import { AuthStackNavProps } from '@navigation'
import { View, SafeAreaView, Alert } from 'react-native'
import { styles } from './style'
import {
  ButtonComponent,
  ButtonVarient,
  LabelComponent,
  TextInputComponent,
  TextVarient,
} from '@components'
import { ROUTES, Strings } from '@constants'
import { Auth } from 'aws-amplify'

export const SignUpOtpScreen: React.FC = ({ navigation, route }) => {
  const [code, setCode] = useState('')
  const [isCodeEntered, setIsCodeEntered] = useState(false)

  const { email } = route.params

  const confirmSignUp = async () => {
    try {
      const user = await Auth.confirmSignUp(email, code)
      navigation.push(ROUTES.AUTH_STACK, {
        screen: ROUTES.SIGN_UP_CONFIRM_SCREEN,
      })
      console.log(user, 'sasajsnajsbjsb')
    } catch (error) {
      console.log('error confirming sign up', error)
      Alert.alert('', error.message)
    }
  }

  const handleCodeChange = (txt: string) => {
    setCode(txt)
    setIsCodeEntered(code.length >= 5)
  }
  return (
    <SafeAreaView style={styles.coinatiner}>
      <LabelComponent label={Strings.CONFRIMATION_CODE} style={styles.title} />
      <LabelComponent label={Strings.OTP_DESCRIPTION_TEXT} style={styles.subtitle} />
      <View>
        <TextInputComponent
          value={code}
          placeholder={Strings.ENTER_CODE}
          keyboardType='number-pad'
          onChangeText={txt => handleCodeChange(txt)}
        />
        <View style={styles.buttoncontainer}>
          <ButtonComponent
            onPress={confirmSignUp}
            varient={!isCodeEntered ? ButtonVarient.lightgreen : ButtonVarient.continue}
            label={Strings.CONFRIM}
            labelVarient={TextVarient.black}
            disabled={!isCodeEntered}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}
