import { AppNavigator } from './src/navigation'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import React, { useEffect, useState } from 'react'
import { useFonts } from 'expo-font'
import Toast from 'react-native-toast-message'
import { Platform, Text, View } from 'react-native'
import { MONTSERRAT_REGULAR } from './src/styles'
import * as Device from 'expo-device'
import * as Notifications from 'expo-notifications'
import Constants from 'expo-constants'
import Colors from './src/styles/colors'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
})

async function sendPushNotification(expoPushToken: any) {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: 'Original Title',
    body: 'And here is the body!',
    data: { someData: 'goes here' },
  }

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  })
}

async function registerForPushNotificationsAsync() {
  let token
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync()
    let finalStatus = existingStatus
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync()
      finalStatus = status
    }
    if (finalStatus !== 'granted') {
      console.error('Failed to get push token for push notification!')
      return
    }
    token = await Notifications.getExpoPushTokenAsync({
      projectId: Constants.expoConfig?.extra?.eas?.projectId ?? '',
    })
    console.log(token)
  } else {
    console.log('Must use physical device for Push Notifications')
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    })
  }

  return token
}

export default function App() {
  const [fontsLoaded] = useFonts({
    'Montserrat-Black': require('./src/assets/fonts/Montserrat-Black.ttf'),
    'Montserrat-BlackItalic': require('./src/assets/fonts/Montserrat-BlackItalic.ttf'),
    'Montserrat-Bold': require('./src/assets/fonts/Montserrat-Bold.ttf'),
    'Montserrat-BoldItalic': require('./src/assets/fonts/Montserrat-BoldItalic.ttf'),
    'Montserrat-ExtraBold': require('./src/assets/fonts/Montserrat-ExtraBold.ttf'),
    'Montserrat-ExtraBoldItalic': require('./src/assets/fonts/Montserrat-ExtraBoldItalic.ttf'),
    'Montserrat-ExtraLight': require('./src/assets/fonts/Montserrat-ExtraLight.ttf'),
    'Montserrat-Regular': require('./src/assets/fonts/Montserrat-Regular.ttf'),
    'Montserrat-Thin': require('./src/assets/fonts/Montserrat-Thin.ttf'),
    'SF-Pro-Display-Bold': require('./src/assets/fonts/SF-Pro-Display-Bold.ttf'),
    'sf-pro-text-semibold': require('./src/assets/fonts/sf-pro-text-semibold.ttf'),
    'sf-pro-text-heavy': require('./src/assets/fonts/sf-pro-text-heavy.ttf'),
    'Montserrat-Light': require('./src/assets/fonts/Montserrat-Light.ttf'),
    'Montserrat-Medium': require('./src/assets/fonts/Montserrat-Medium.ttf'),
  })

  const toastConfig = {
    tomatoToast: ({ text, props }: any) => (
      <View
        style={{
          backgroundColor: 'black',
          marginHorizontal: 10,
          marginTop: 20,
          paddingHorizontal: 20,
          paddingVertical: 10,
          borderWidth: 1,
          borderRadius: 10,
          borderColor: 'tomato',
        }}>
        <Text style={{ color: Colors.SUCCESS, fontFamily: MONTSERRAT_REGULAR }}>
          {props.text}
        </Text>
        <Text
          style={{ color: Colors.GRAY_DARK, fontFamily: MONTSERRAT_REGULAR, textAlign: 'center' }}>
          {props.msg}
        </Text>
      </View>
    ),
  }

  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    if (fontsLoaded) {
      setIsReady(true)
    }
  }, [fontsLoaded])

  if (!isReady) {
    return null
  }

  return (
    <SafeAreaProvider
      initialMetrics={{
        frame: { x: 0, y: 0, width: 0, height: 0 },
        insets: { top: 0, left: 0, right: 0, bottom: 0 },
      }}>
      <AppNavigator />
      <Toast config={toastConfig} />
    </SafeAreaProvider>
  )
}
