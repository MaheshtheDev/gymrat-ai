import { AuthStack, OnboardingStack } from '@navigation'
import { LogBox, Text } from 'react-native'

import { NavigationContainer } from '@react-navigation/native'
import { ROUTES } from '@constants'
import React, { useEffect, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { navigationRef } from '@navigation'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { HomeStack } from './home-stack'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Stack = createNativeStackNavigator()

export const AppNavigator = () => {
  LogBox.ignoreLogs(['Warning: ...', 'Warning: Failed', 'Warning: Each'])
  LogBox.ignoreAllLogs()
  const routeNameRef = React.useRef()
  const insets = useSafeAreaInsets()

  const [token, setToken] = useState('')

  useEffect(() => {
    userToken()
  }, [])

  const userToken = async () => {
    const token = await AsyncStorage.getItem('Token')
    console.log(JSON.stringify(token), 'sasasaA', token)
    setToken(JSON.stringify(token))
  }

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        routeNameRef.current = navigationRef?.current?.getCurrentRoute()?.name
      }}
      fallback={<Text>Loading...</Text>}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* {token !== null && token !== undefined ? ( */}
        <Stack.Screen name={ROUTES.AUTH_STACK} component={AuthStack} />

        <Stack.Screen name={ROUTES.HOME_STACK} component={HomeStack} />
        {/* ) : ( */}
        {/* )} */}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export * from './stack-param-list'
export * from './auth-stack'
export * from './home-stack'
export * from './NavigationService'
