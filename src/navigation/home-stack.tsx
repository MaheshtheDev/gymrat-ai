import * as React from 'react'

import { ROUTES } from '@constants'

import {  HomeStackParamList } from './stack-param-list'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { HomeScreen, MealScreen, ProfileScreen, Workoutscreen } from '@containers'

const Stack = createNativeStackNavigator<HomeStackParamList>()
type HomeStackProps = {
  onPress?: () => void
}

export const HomeStack: React.FC<HomeStackProps> = ({ }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={ROUTES.HOME_SCREEN}
        component={HomeScreen}
        options={{ headerShown: false, gestureEnabled: false }}
      />

      <Stack.Screen
        name={ROUTES.PROFILE_SCREEN}
        component={ProfileScreen}
        options={{ headerShown: false, gestureEnabled: false }}
      />

      <Stack.Screen
        name={ROUTES.WORKOUT_DETAILS}
        component={Workoutscreen}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name={ROUTES.MEAL_DETAILS}
        component={MealScreen}
        options={{ headerShown: false, gestureEnabled: false }}
      />
    </Stack.Navigator>
  )
}
