import { AppNavigator } from './src/navigation'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import React, { useEffect, useState } from 'react'
import { useFonts } from 'expo-font'
import Toast from 'react-native-toast-message'
import { Text, View } from 'react-native'
import { MONTSERRAT_REGULAR } from './src/styles'
import * as Sentry from 'sentry-expo'
import Colors from './src/styles/colors'

Sentry.init({
  dsn: 'https://ab01207621a84c8b92958afb8dad1c73@o4504897416593408.ingest.sentry.io/4505552071688192',
  enableInExpoDevelopment: true,
  environment: 'development',
  debug: false, // If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
})

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
