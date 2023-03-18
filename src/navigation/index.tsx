import { AuthStack, OnboardingStack } from '@navigation'
import { LogBox, Text } from 'react-native'

import { NavigationContainer } from '@react-navigation/native'
import { ROUTES } from '@constants'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { navigationRef } from '@navigation'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const Stack = createNativeStackNavigator()

export const AppNavigator = () => {
  LogBox.ignoreLogs(['Warning: ...', 'Warning: Failed', 'Warning: Each']) // Ignore log notification by message
  LogBox.ignoreAllLogs() //Ignore all log notifications
  const routeNameRef = React.useRef()
  const insets = useSafeAreaInsets()

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        routeNameRef.current = navigationRef?.current?.getCurrentRoute()?.name
      }}
      fallback={<Text>Loading...</Text>}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={ROUTES.ONBOARDING_STACK} component={OnboardingStack} />
        <Stack.Screen name={ROUTES.AUTH_STACK} component={AuthStack} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export * from './stack-param-list'
export * from './auth-stack'
export * from './onboarding-stack'
export * from './NavigationService'
