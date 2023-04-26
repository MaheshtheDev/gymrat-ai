import React, { useState } from 'react'

import { AuthStackNavProps } from '@navigation'
import { SafeAreaView, View } from 'react-native'
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

export const SignInScreen: React.FC<AuthStackNavProps<'SignInScreen'>> = ({
  navigation,
  route,
}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const signIn = async () => {
    try {
      const user = await Auth.signIn(email, password)
      navigation.navigate(ROUTES.AUTH_STACK, { screen: ROUTES.HOME_SCREEN })
    } catch (error) {
      console.log('error signing in', error)
    }
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
          />
          <TextInputComponent
            placeholder={Strings.PASSWORD}
            secureTextEntry
            onChangeText={txt => setPassword(txt)}
          />
        </View>
        <View style={styles.buttoncontainer}>
          <ButtonComponent
            label={Strings.LOGIN}
            varient={ButtonVarient.lightgreen}
            labelVarient={TextVarient.black}
            onPress={signIn}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}
