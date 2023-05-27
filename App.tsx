import { AppNavigator } from '@navigation'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import React, { useEffect, useState } from 'react'
import { useFonts } from 'expo-font'
import { Amplify, Auth } from 'aws-amplify'
import awsconfig from './src/aws-exports'
import * as WebBrowser from 'expo-web-browser'
import AsyncStorage from '@react-native-async-storage/async-storage'

Amplify.configure(awsconfig)

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
    </SafeAreaProvider>
  )
}
