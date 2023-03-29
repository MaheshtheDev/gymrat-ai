import React from 'react'

import { AuthStackNavProps } from '@navigation'
import {  View, SafeAreaView, ScrollView } from 'react-native'
import { styles } from './style'
import {
  ButtonComponent,
  ButtonVarient,
  LabelComponent,
  TextInputComponent,
  TextVarient,
} from '@components'
import {  ROUTES, Strings } from '@constants'

export const SignUpOtpScreen: React.FC<AuthStackNavProps<'SignUpOtpScreen'>> = ({
  navigation,
  route,
}) => {
  return (
    <SafeAreaView style={styles.coinatiner}>
      <LabelComponent label={Strings.CONFRIMATION_CODE} style={styles.title} />
      <LabelComponent
        label={Strings.OTP_DESCRIPTION_TEXT}
        style={styles.subtitle}
      />
      <View>
        <TextInputComponent placeholder={Strings.ENTER_CODE} keyboardType='number-pad' />
        <View style={styles.buttoncontainer}>
          <ButtonComponent
            onPress={() =>
              navigation.push(ROUTES.AUTH_STACK, { screen: ROUTES.SIGN_UP_CONFIRM_SCREEN })
            }
            varient={ButtonVarient.lightgreen}
            label={Strings.CONFRIM}
            labelVarient={TextVarient.black}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}
