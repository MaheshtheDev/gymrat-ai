import * as React from 'react'
import {  HomeStackParamList } from './stack-param-list'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { HomeScreen, MealScreen, ProfileScreen, Workoutscreen } from '../containers'

const Stack = createNativeStackNavigator<HomeStackParamList>()
type HomeStackProps = {
  onPress?: () => void
}

export const HomeStack: React.FC<HomeStackProps> = ({ }) => {
  return (
    <Stack.Navigator>
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
  )
}
