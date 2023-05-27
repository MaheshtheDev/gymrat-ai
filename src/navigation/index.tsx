import { AuthStack } from '@navigation'
import { ActivityIndicator, LogBox, Text } from 'react-native'

import { NavigationContainer } from '@react-navigation/native'
import { ROUTES } from '@constants'
import React, { useEffect, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { navigationRef } from '@navigation'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { HomeStack } from './home-stack'
import { Auth } from 'aws-amplify'

const Stack = createNativeStackNavigator()

export const AppNavigator = ({ token }) => {
  LogBox.ignoreLogs(['Warning: ...', 'Warning: Failed', 'Warning: Each'])
  LogBox.ignoreAllLogs()
  const routeNameRef = React.useRef()
  const insets = useSafeAreaInsets()

  useEffect(() => {
    handleUser()
  }, [token])

  const [userExists, setUserExists] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const handleUser = async () => {
    try {
      const token = await Auth.currentSession()
      setUserExists(true)
    } catch (error) {
      setUserExists(false)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <ActivityIndicator
        size={'large'}
        style={{
          alignSelf: 'center',
          justifyContent: 'center',
          flex: 1,
        }}
      />
    )
  }

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        routeNameRef.current = navigationRef?.current?.getCurrentRoute()?.name
      }}
      fallback={<Text>Loading...</Text>}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!userExists ? (
          <>
            <Stack.Screen name={ROUTES.AUTH_STACK} component={AuthStack} />

            <Stack.Screen name={ROUTES.HOME_STACK} component={HomeStack} />
          </>
        ) : (
          <>
            <Stack.Screen name={ROUTES.HOME_STACK} component={HomeStack} />

            <Stack.Screen name={ROUTES.AUTH_STACK} component={AuthStack} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export * from './stack-param-list'
export * from './auth-stack'
export * from './home-stack'
export * from './NavigationService'
