import React, { useEffect, useState } from 'react'
import { Button, SafeAreaView, Text, View } from 'react-native'
import { styles } from './style'
import * as AppleAuthentication from 'expo-apple-authentication'
import * as SecureStore from 'expo-secure-store'

import {
  ImageBackgroundComponent,
  LabelComponent,
  TextVarient,
} from '../../../components'
import { Images, ROUTES, Strings } from '../../../constants'
import { useUserStore } from './../../../store/userStore'
import { API } from '../../../helpers/api'
import Colors from '../../../styles/colors'
import { TempStorage, TempStorageKeys } from '../../../helpers/tempStorage'

export const SignUpOptionsScreen: React.FC = ({ navigation }: any) => {
  //const [appleAuthAvailable, setAppleAuthAvailable] = useState<boolean>(true)
  const [userToken, setUserToken] = useState<any>('')
  const setUser = useUserStore(state => state.setUserToken)
  const user = useUserStore(state => state.userToken)

  useEffect(() => {
    const checkAvailability = async () => {
      //const isAvailable = await AppleAuthentication.isAvailableAsync()
      //setAppleAuthAvailable(isAvailable)

      //if (isAvailable) {
      const credentialJson = await TempStorage.getItem(TempStorageKeys.APPLE_CREDENTIALS)
      
      if (credentialJson) {
        setUserToken(credentialJson.toString())
        console.log('credentialJson')
        console.log(credentialJson)
        const isUserExist = await API.getUserDetails(userToken.user)
        if (isUserExist && isUserExist.status == 200) {
          console.log('user exist')
          console.log(isUserExist)
          navigation.navigate(ROUTES.HOME_STACK, {
            screen: ROUTES.HOME_SCREEN,
          })
        } else {
          navigation.navigate(ROUTES.AUTH_STACK, {
            screen: ROUTES.ADD_MORE_DETAILS_SCREEN,
          })
        }
      }
    }
    checkAvailability()
  }, [])

  const login = async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      })
      setUserToken(credential)
      await TempStorage.setItem(TempStorageKeys.APPLE_CREDENTIALS, JSON.stringify(credential))
      const isUserExist = await API.getUserDetails(credential.user)
      if (isUserExist != null && isUserExist != undefined && isUserExist.data != null && isUserExist.data != undefined && isUserExist.status == 200) {
        navigation.navigate(ROUTES.HOME_STACK, {
          screen: ROUTES.HOME_SCREEN,
        })
      } else {
        navigation.navigate(ROUTES.AUTH_STACK, {
          screen: ROUTES.ADD_MORE_DETAILS_SCREEN,
        })
      }
    } catch (e: any) {
      console.error(e)
    }
  }

  const getCredentialState = async () => {
    const credentialState = await AppleAuthentication.getCredentialStateAsync(
      userToken.user
    )
    console.log(credentialState)
  }

  const logOut = async () => {
    SecureStore.deleteItemAsync('apple-credentials')
    setUserToken('')
  }

  const getAppleAuthContent = async () => {
    if (!user) {
      return (
        <AppleAuthentication.AppleAuthenticationButton
          buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
          buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
          cornerRadius={25}
          style={{ width: 200, height: 44 }}
          onPress={login}
        />
      )
    } else {
      const isUserExist = await API.getUserDetails(userToken.user)
      if (isUserExist) {
        console.log('user exist')
        console.log(isUserExist)
        navigation.navigate(ROUTES.HOME_STACK, {
          screen: ROUTES.HOME_SCREEN,
        })
      } else {
        navigation.navigate(ROUTES.AUTH_STACK, {
          screen: ROUTES.ADD_MORE_DETAILS_SCREEN,
        })
      }
      return <></>
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titlecontainer}>
        <LabelComponent label={Strings.WELCOME_TEXT} varient={TextVarient.title} />
      </View>
      <ImageBackgroundComponent src={Images.welcomeImage} resizeMode={'contain'}>
        <View style={styles.descriptioncontainer}>
          <LabelComponent
            numberOfLines={0}
            label={Strings.WELCOME_DESCRIPTION_TEXT}
            varient={TextVarient.description}
          />
        </View>
      </ImageBackgroundComponent>
      <View style={{flex: 1, alignItems: "center"}}>
        <AppleAuthentication.AppleAuthenticationButton
          buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
          buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
          cornerRadius={25}
          style={{
            width: "75%",
            height: 44,
            backgroundColor: Colors.CHLOROPHYL_GREEN,
            borderRadius: 50,
            alignItems: 'center',
          }}
          onPress={login}
        />
      </View>
    </SafeAreaView>
  )
}
