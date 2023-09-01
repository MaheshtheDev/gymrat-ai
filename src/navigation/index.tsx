import { ActivityIndicator, LogBox, Text } from 'react-native'

import { NavigationContainer } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { navigationRef } from './NavigationService'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { API } from '../helpers/api'
import {
  AddMoreDetailsScreen,
  HomeScreen,
  MealScreen,
  ProfileScreen,
  SignUpOptionsScreen,
  Workoutscreen,
} from '../containers'

const Stack = createNativeStackNavigator()

export const AppNavigator = () => {
  LogBox.ignoreLogs(['Warning: ...', 'Warning: Failed', 'Warning: Each'])
  LogBox.ignoreAllLogs()
  const routeNameRef = React.useRef()
  const insets = useSafeAreaInsets()

  useEffect(() => {
    handleUser()
  }, [])

  const [userExists, setUserExists] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const handleUser = async () => {
    try {
      const isUserExist = await API.getUserDetails()
      if (Array.isArray(isUserExist?.data) && isUserExist?.data?.length) {
        setUserExists(true)
      } else {
        setUserExists(false)
      }
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
        <Stack.Screen
          name={'SignUpOptionsScreen'}
          component={SignUpOptionsScreen}
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <Stack.Screen
          name={'AddMoreDetailsScreen'}
          component={AddMoreDetailsScreen}
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <Stack.Screen
          name={'HomeScreen'}
          component={HomeScreen}
          options={{ headerShown: false, gestureEnabled: false }}
        />

        <Stack.Screen
          name={'ProfileScreen'}
          component={ProfileScreen}
          options={{ headerShown: false, gestureEnabled: false }}
        />

        <Stack.Screen
          name={'Workoutscreen'}
          component={Workoutscreen}
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <Stack.Screen
          name={'MealScreen'}
          component={MealScreen}
          options={{ headerShown: false, gestureEnabled: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export * from './stack-param-list'
//export * from './auth-stack'
//export * from './home-stack'
export * from './NavigationService'
