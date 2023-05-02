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

import awsconfig from '../../../../src/aws-exports'
import awsmobile from '../../../../src/aws-exports'
import * as Google from 'expo-auth-session/providers/google'

const isLocalHost = Boolean(__DEV__)

const [localRedirectSignIn, productionRedirectSignIn] =
  awsconfig.oauth.redirectSignIn.split(',')

const [localRedirectSignOut, productionRedirectSignOut] =
  awsconfig.oauth.redirectSignOut.split(',')

async function urlOpener(url, redirectUrl) {
  const { type, url: newUrl } = await WebBrowser.openAuthSessionAsync(url, redirectUrl)

  if (type === 'success' && Platform.OS === 'ios') {
    WebBrowser.dismissBrowser()
    return Linking.openURL(newUrl)
  }
}

const updatedConfig = {
  ...awsconfig,
  oauth: {
    ...awsconfig.oauth,
    redirectSignIn: isLocalHost ? localRedirectSignIn : productionRedirectSignIn,
    redirectSignOut: isLocalHost ? localRedirectSignOut : productionRedirectSignOut,
    urlOpener,
  },
}
Amplify.configure(updatedConfig)

export const SignUpOptionsScreen: React.FC<AuthStackNavProps<'SignUpOptionsScreen'>> = ({
  navigation,
  route,
}) => {
  const [user, setUser] = useState(null)
  const [customState, setCustomState] = useState(null)

  // useEffect(() => {
  //   Hub.listen('auth', data => {
  //     if (data) {
  //       console.log(data, 'dataline')
  //       switch (data.payload.event) {
  //         case 'signIn':
  //           let token
  //           if (data.payload.data.token) {
  //             token = data.payload.data.token
  //           }
  //           const authenticatedUser = Auth.currentAuthenticatedUser().then(value => {
  //             console.log(authenticatedUser, 'line0')
  //             if (data.payload.data.signInUserSession.accessToken.jwtToken) {
  //               console.log(data.payload, 'line1')
  //             }
  //           })
  //           break
  //         case 'cognitoHostedUI':
  //           {
  //             console.log('line3')
  //             let token
  //             if (data.payload.data.signInUserSession.accessToken.jwtToken) {
  //               token = data.payload.data.signInUserSession.accessToken.jwtToken
  //             }

  //             if (token) {
  //               console.log(token, 'line4')
  //             }
  //           }
  //           break
  //         case 'signOut':
  //           break
  //       }
  //     }
  //   })
  // })

  // const loginUsingGoogle = async () => {
  //   try {
  //     const response = await Auth.currentAuthenticatedUser()
  //   } catch (error) {}

  //   const result = await loginWithGoogle()
  //   try {
  //     const response = await Auth.currentAuthenticatedUser()
  //   } catch (error) {}
  // }

  // const loginWithGoogle = async () => {
  //   let response: any

  //   try {
  //     const respone = await Auth.federatedSignIn({
  //       provider: CognitoHostedUIIdentityProvider.Google,
  //     })
  //     console.log(respone, 'res')
  //   } catch (error) {
  //     console.log(error, 'err')
  //   }
  // }
  useEffect(() => {
    const unsubscribe = Hub.listen('auth', ({ payload: { event, data } }) => {
      console.log('event', event)
      console.log('data', data)
      switch (event) {
        case 'signIn':
          setUser(data)
          break
        case 'signOut':
          setUser(null)
          break
        case 'customOAuthState':
          setCustomState(data)
          break
      }
    })

    Auth.currentAuthenticatedUser()
      .then(currentUser => setUser(currentUser))
      .catch(() => console.log('Not signed in'))

    return unsubscribe
  }, [])
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
