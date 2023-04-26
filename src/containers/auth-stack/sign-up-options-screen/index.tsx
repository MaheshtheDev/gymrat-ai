import React, { useEffect, useState } from 'react'
import { AuthStackNavProps } from '@navigation'
import { SafeAreaView, View, Linking, Platform } from 'react-native'
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

// const isLocalHost = Boolean(__DEV__)

// const [localRedirectSignIn, productionRedirectSignIn] =
//   awsconfig.oauth.redirectSignIn.split(',')

// const [localRedirectSignOut, productionRedirectSignOut] =
//   awsconfig.oauth.redirectSignOut.split(',')

// async function urlOpener(url, redirectUrl) {
//   const { type, url: newUrl } = await WebBrowser.openAuthSessionAsync(url, redirectUrl)

//   if (type === 'success' && Platform.OS === 'ios') {
//     WebBrowser.dismissBrowser()
//     return Linking.openURL(newUrl)
//   }
// }

// const updatedConfig = {
//   ...awsconfig,
//   oauth: {
//     ...awsconfig.oauth,
//     redirectSignIn: isLocalHost ? localRedirectSignIn : productionRedirectSignIn,
//     redirectSignOut: isLocalHost ? localRedirectSignOut : productionRedirectSignOut,
//     urlOpener,
//   },
// }
Amplify.configure(awsconfig)

export const SignUpOptionsScreen: React.FC<AuthStackNavProps<'SignUpOptionsScreen'>> = ({
  navigation,
  route,
}) => {
  const [user, setUser] = useState(null)
  const [customState, setCustomState] = useState(null)

  useEffect(() => {
    const unsubscribe = Hub.listen('auth', ({ payload: { event, data } }) => {
      switch (event) {
        case 'signIn':
          setUser(data)
          break
        case 'signOut':
          setUser(null)
          break
        case 'customOAuthState':
          setCustomState(data)
      }
    })

    Auth.currentAuthenticatedUser()
      .then(currentUser => setUser(currentUser))
      .catch(() => console.log('Not signed in'))

    return unsubscribe
  }, [])

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
  // const handleGoogleSignIn = async () => {
  //   try {
  //     await Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Google })
  //     // On successful login, navigate to the app's main screen
  //   } catch (error) {
  //     console.log('Error signing in with Google', error)
  //   }
  // }
  // const handleAppleSignIn = async () => {
  //   try {
  //     await Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Apple })
  //     // On successful login, navigate to the app's main screen
  //   } catch (error) {
  //     console.log('Error signing in with Google', error)
  //   }
  // }
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
