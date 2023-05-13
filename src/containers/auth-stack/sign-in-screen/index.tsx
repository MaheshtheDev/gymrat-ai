import { ActivityIndicator, Alert, SafeAreaView, Text, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

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
import Colors from '@styles/colors'

export const SignInScreen: React.FC<AuthStackNavProps<'SignInScreen'>> = ({
  navigation,
  route,
}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isValid, setIsValid] = useState(true)
  // const [isloading, setIsLoading] = useState(false)

  const isCodeEntered = email && password.length >= 7

  const signIn = async () => {
    // setIsLoading(true)

    try {
      const user = await Auth.signIn(email, password)

      navigation.replace(ROUTES.HOME_STACK)
      AsyncStorage.setItem('Token', user?.signInUserSession?.accessToken?.jwtToken)
    } catch (error) {
      Alert.alert('', error?.message)
      console.log('error signing in', error)
    }
    //  finally {
    //   setIsLoading(false)
    // }
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

        {/* {isloading && (
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
