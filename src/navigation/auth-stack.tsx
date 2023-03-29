import * as React from 'react'

import { ROUTES, Strings } from '@constants'

import { AuthStackParamList } from './stack-param-list'
import {
  SignUpOptionsScreen,
  SignUpOtpScreen,
  SignUpScreen,
  SignUpConfirmScreen,
  SignInScreen,
  AddMoreDetailsScreen,
  HomeScreen,
  ProfileScreen
} from '@containers'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Header, ProfileHeader } from '@components'
import { NavigationService, navigationRef } from './NavigationService'

const Stack = createNativeStackNavigator<AuthStackParamList>()
type AuthStackProps = {
  onPress?:() => void
}

export const AuthStack: React.FC<AuthStackProps> = ({ navigation ,onPress}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={ROUTES.SIGN_UP_OPTIONS_SCREEN}
        component={SignUpOptionsScreen}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name={ROUTES.SIGN_UP_SCREEN}
        component={SignUpScreen}
        options={{
          headerStyle: headerStyle,
          header: () => (
            <Header
              onBackPress={() => NavigationService.goBack()}
              showLoginButton={true}
            />
          ),
        }}
      />
      <Stack.Screen
        name={ROUTES.SIGN_UP_OTP_SCREEN}
        component={SignUpOtpScreen}
        options={{
          headerStyle: headerStyle,
          header: () => (
            <Header
              onBackPress={() => NavigationService.goBack()}
              showLoginButton={false}
            />
          ),
        }}
      />
      <Stack.Screen
        name={ROUTES.SIGN_UP_CONFIRM_SCREEN}
        component={SignUpConfirmScreen}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name={ROUTES.SIGN_IN_SCREEN}
        component={SignInScreen}
        options={{
          headerStyle: headerStyle,
          header: () => (
            <Header
              onBackPress={() => NavigationService.goBack()}
              showLoginButton={false}
              showSignUpButton={true}
            />
          ),
        }}
      />
      <Stack.Screen
        name={ROUTES.ADD_MORE_DETAILS_SCREEN}
        component={AddMoreDetailsScreen}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name={ROUTES.HOME_SCREEN}
        component={HomeScreen}
        options={{
          headerStyle: headerStyle,
          header: () => (
            <ProfileHeader
              Profile={true}
              onProfilePress={() =>
                navigation.navigate(ROUTES.AUTH_STACK, { screen: ROUTES.PROFILE_SCREEN })
              }
              username='Nimesh Goel'
              age='Age: 30'
            />
          ),
        }}
      />
      <Stack.Screen
        name={ROUTES.PROFILE_SCREEN}
        component={ProfileScreen}
        options={{headerShown: false, gestureEnabled: false }}
      />
    </Stack.Navigator>
  )
}

const headerStyle = {
  backgroundColor: 'white',
  borderBottomColor: 'gray',
  borderBottomWidth: 1,
  height: 60,
}
