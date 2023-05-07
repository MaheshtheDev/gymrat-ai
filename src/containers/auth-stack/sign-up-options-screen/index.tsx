import React, { useEffect, useState } from 'react'
import { AuthStackNavProps } from '@navigation'
import { SafeAreaView, View, Linking, Platform, Text, Button, Alert } from 'react-native'
import { styles } from './style'
import { Amplify, Auth, Hub } from 'aws-amplify'
import * as WebBrowser from 'expo-web-browser'

import {
  ButtonComponent,
  ButtonVarient,
  ImageBackgroundComponent,
  LabelComponent,
  TextVarient,
} from '@components'
import { Images, ROUTES, Strings } from '@constants'
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth'

export const SignUpOptionsScreen: React.FC<AuthStackNavProps<'SignUpOptionsScreen'>> = ({
  navigation,
  route,
}) => {
  const [user, setUser] = useState(null)
  const [customState, setCustomState] = useState(null)

 
   
  return (
    <SafeAreaView style={styles.parentContainer}>
      <View style={styles.titlecontainer}>
        <LabelComponent label={Strings.WELCOME_TEXT} varient={TextVarient.signuptitle} />
      </View>
      <ImageBackgroundComponent src={Images.welcomeImage} resizeMode='contain'>
        <View style={styles.buttoncontainer}>
          <View style={styles.loginbtncontainer}>
            <ButtonComponent
              onPress={() =>
                navigation.navigate(ROUTES.AUTH_STACK, { screen: ROUTES.SIGN_UP_SCREEN })
              }
              varient={ButtonVarient.green}
              label={Strings.SIGN_UP}
              labelVarient={TextVarient.signupbutton}
            />
          </View>

          <View>
            <ButtonComponent
              onPress={() =>
                navigation.navigate(ROUTES.AUTH_STACK, { screen: ROUTES.SIGN_IN_SCREEN })
              }
              varient={ButtonVarient.withBorder}
              label={Strings.LOGIN}
              labelVarient={TextVarient.whitebutton}
            />
          </View>
          <View style={styles.ortxt}>
            <LabelComponent
              label={Strings.OR}
              varient={TextVarient.title}
              style={styles.orlabeltxt}
            />
          </View>
          <View style={styles.googlebtncoinatiner}>
            <ButtonComponent
              onPress={() =>
                Auth.federatedSignIn({
                  provider: CognitoHostedUIIdentityProvider.Google,
                })
              }
              varient={ButtonVarient.withBorder}
              label={Strings.GOOGLE_BUTTON_TEXT}
              labelVarient={TextVarient.whitebutton}
              GoogleIcon={true}
            />
          </View>
          <View>
            <ButtonComponent
              onPress={() =>
                Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Apple })
              }
              varient={ButtonVarient.withBorder}
              label={Strings.APPLE_BUTTON_TEXT}
              labelVarient={TextVarient.whitebutton}
              AppleIcon={true}
            />
          </View>
        </View>
      </ImageBackgroundComponent>
    </SafeAreaView>
  )
}
