import * as React from 'react'

import { ROUTES } from '@constants'

import { AuthStackParamList } from './stack-param-list'
import {
  SignUpOptionsScreen,
  SignUpOtpScreen,
  SignUpScreen,
  SignUpConfirmScreen,
  SignInScreen,
  AddMoreDetailsScreen,
  WelcomeScreen,
} from '@containers'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Header } from '@components'
import { NavigationService, navigationRef } from './NavigationService'

const Stack = createNativeStackNavigator<AuthStackParamList>()
type AuthStackProps = {
  onPress?: () => void
}

export const AuthStack: React.FC<AuthStackProps> = ({ navigation, onPress }) => {
  return (
    <Stack.Navigator initialRouteName='WelcomeScreen'>
      <Stack.Screen
        name={ROUTES.WELCOME_SCREEN}
        component={WelcomeScreen}
        options={{ headerShown: false, gestureEnabled: false }}
      />

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
              onLoginPress={() =>
                navigation.navigate(ROUTES.AUTH_STACK, { screen: ROUTES.SIGN_IN_SCREEN })
              }
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
              onSignUpPress={() =>
                navigation.navigate(ROUTES.AUTH_STACK, { screen: ROUTES.SIGN_UP_SCREEN })
              }
            />
          ),
        }}
      />
      <Stack.Screen
        name={ROUTES.ADD_MORE_DETAILS_SCREEN}
        component={AddMoreDetailsScreen}
        options={{ headerShown: false, gestureEnabled: false }}
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
