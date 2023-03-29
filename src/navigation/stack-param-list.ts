import { MXWidgetResultType } from '@types'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RouteProp } from '@react-navigation/native'

export type AuthStackParamList = {
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
  ProfileScreen: {
    state: string | undefined
    access_token: string | undefined
    token_type: string | undefined
  }
  AgreementsScreen: undefined
}

export type AuthStackNavProps<T extends keyof AuthStackParamList> = {
  navigation: NativeStackNavigationProp<AuthStackParamList, T>
  route: RouteProp<AuthStackParamList, T>
}

export type StepsStackParamList = {
  StepsScreen: undefined
}

export type StepsStackNavProps<T extends keyof StepsStackParamList> = {
  navigation: NativeStackNavigationProp<StepsStackParamList, T>
  route: RouteProp<StepsStackParamList, T>
}

export type DemoStackParamList = {
  DemoOnboardingScreen: undefined
  DemoAgreementsScreen: undefined
  DemoScreens: undefined
  DemoCRSMobileVerifyScreen: undefined
  DemoCRSSignupScreen: undefined
  DemoCRSUserIdentityScreen: undefined
  DemoSignUpDetailsScreen: undefined
  DemoSignUpOptionsScreen: undefined
  DemoZipcodeLocationSelectionScreen: undefined
  DemoSelectTargetGoalScreen: undefined
  DemoStepProgressScreen: {
    refresh?: boolean
    goalCompleted?: boolean
    crsCompleted?: boolean
  }
  DemoHomeScreen: undefined
  DemoClosingCashDetailsScreen: undefined
  DemoCreditScoreDetailsScreen: undefined
  DemoDTIDetailsScreen: undefined
  DemoFinancialProfileScreen: {
    loadAccounts?: boolean
  }
  DemoProfileScreen: undefined
}

export type DemoStackNavProps<T extends keyof DemoStackParamList> = {
  navigation: NativeStackNavigationProp<DemoStackParamList, T>
  route: RouteProp<DemoStackParamList, T>
}

export type MXWidgetStackParamList = {
  MXWidgetLoadingScreen: undefined
  MXWidgetScreen: {
    widgetUrl?: string
  }
  MXWidgetResultScreen: {
    resultType?: MXWidgetResultType
    status?: string
    refresh?: boolean
  }
  CRSDummyScreen: {
    title: string
    type: number
  }
}

export type MXWidgetStackNavProps<T extends keyof MXWidgetStackParamList> = {
  navigation: NativeStackNavigationProp<MXWidgetStackParamList, T>
  route: RouteProp<MXWidgetStackParamList, T>
}

export type TargetSelectionStackParamList = {
  SelectHome: undefined
  CustomiseTargetGoalScreen: undefined
  CashEarningDetailsScreen: undefined
  ResultTargetGoalScreen: undefined
  ZipcodeLocationSelectionScreen: undefined
  SelectTargetGoalScreen: {
    zipcode: string
    city: string
  }
}

export type TargetSelectionStackNavProps<T extends keyof TargetSelectionStackParamList> =
  {
    navigation: NativeStackNavigationProp<TargetSelectionStackParamList, T>
    route: RouteProp<TargetSelectionStackParamList, T>
  }

export type StepProgressStackParamList = {
  StepProgressScreen: {
    targetPrice: number
    zipcode: string
    bedroom: string
    bathrooms: string
    squarefoot: number
    incomePerMonth: number
    extraCash: number
    creditReportUpdatedDate: Date
    connectedAccounts: any
    loanType: string
    refresh: boolean
  }
  OwnItScoreScreen: {
    score: number
  }
}

export type StepProgressStackNavProps<T extends keyof StepProgressStackParamList> = {
  navigation: NativeStackNavigationProp<StepProgressStackParamList, T>
  route: RouteProp<StepProgressStackParamList, T>
}

export type OnboardingStackParamList = {
  WelcomeScreen: undefined
}

export type OnboardingStackNavProps<T extends keyof OnboardingStackParamList> = {
  navigation: NativeStackNavigationProp<OnboardingStackParamList, T>
  route: RouteProp<OnboardingStackParamList, T>
}

export type CashEarningsStackParamList = {
  CashEarningDetailsScreen: undefined
}

export type CashEarningsStackNavProps<T extends keyof CashEarningsStackParamList> = {
  navigation: NativeStackNavigationProp<CashEarningsStackParamList, T>
  route: RouteProp<CashEarningsStackParamList, T>
}

export type CRSLinkageStackParamList = {
  CRSSignupScreen: undefined
  CRSUserIdentityScreen: undefined
  CRSMobileVerifyScreen: {
    mToken: string
    mobile: string
  }
  CRSSuccessScreen: undefined
  CRSQuizVerifyScreen: undefined
  CRSLockoutScreen: undefined
  CRSManualCreditScoreScreen: undefined
  CRSScoreSuccessCongratulationsScreen: undefined
}

export type CRSLinkageStackNavProps<T extends keyof CRSLinkageStackParamList> = {
  navigation: NativeStackNavigationProp<CRSLinkageStackParamList, T>
  route: RouteProp<CRSLinkageStackParamList, T>
}

export type FinancialProfileStackParamList = {
  FinancialProfileScreen: {
    refresh: boolean
    update: boolean
  }
}

export type FinancialProfileStackNavProps<
  T extends keyof FinancialProfileStackParamList
> = {
  navigation: NativeStackNavigationProp<FinancialProfileStackParamList, T>
  route: RouteProp<FinancialProfileStackParamList, T>
}

export type HomeStackParamList = {
  HomeScreen: {
    update: boolean
  }
  DTIDetailsScreen: { score: any }
  CreditScoreDetailsScreen: {
    isManualScore: boolean
    score: any
  }
  ClosingCashDetailsScreen: { score: any }
  ProfileScreen: undefined
  ChangePassword: undefined
  ConfirmChangePassword: undefined
}

export type HomeStackNavProps<T extends keyof HomeStackParamList> = {
  navigation: NativeStackNavigationProp<HomeStackParamList, T>
  route: RouteProp<HomeStackParamList, T>
}
