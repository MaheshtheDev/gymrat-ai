import { MXWidgetResultType } from '@types'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RouteProp } from '@react-navigation/native'

export type AuthStackParamList = {
  WelcomeScreen: undefined
  SignInScreen: {
    code: string | undefined
    state: string | undefined
  }
  SignUpScreen: {
    error: string | undefined
  }
  SignUpOptionsScreen: {
    code: string | undefined
    state: string | undefined
    access_token: string | undefined
    token_type: string | undefined
    expires_in: string | undefined
  }
  SignUpDetailsScreen: {
    email: string
    password: string
  }
  SignUpOtpScreen: {
    code: string | undefined
  }
  SignUpConfirmScreen: {
    text: string | undefined
  }
  AddMoreDetailsScreen: {
    height: string | undefined
    weight: string | undefined
    gender: string | undefined
  }
  HomeScreen: {
    state: string | undefined
    access_token: string | undefined
    token_type: string | undefined
  }
}

export type AuthStackNavProps<T extends keyof AuthStackParamList> = {
  navigation: NativeStackNavigationProp<AuthStackParamList, T>
  route: RouteProp<AuthStackParamList, T>
}

export type HomeStackParamList = {
  HomeScreen: {
    state: string | undefined
    access_token: string | undefined
    token_type: string | undefined
  }
  ProfileScreen: {
    state: string | undefined
    access_token: string | undefined
    token_type: string | undefined
  }
  Workoutscreen: undefined
  MealScreen: undefined
}

export type HomeStackNavProps<T extends keyof HomeStackParamList> = {
  navigation: NativeStackNavigationProp<HomeStackParamList, T>
  route: RouteProp<HomeStackParamList, T>
}
