import React from 'react'

import { AuthStackNavProps } from '@navigation'
import { SafeAreaView,  View } from 'react-native'
import { styles } from './style'
import {
  ButtonComponent,
  ButtonVarient,
  LabelComponent,
  TextVarient,
} from '@components'
import {  ROUTES, Strings } from '@constants'
import Verifyicon from '../../../assets/svg/Verified Account.svg'

export const SignUpConfirmScreen: React.FC<AuthStackNavProps<'SignUpConfirmScreen'>> = ({
  navigation,
  route,
}) => {
  return (
    <SafeAreaView style={styles.coinatiner}>
      <View style={styles.iconcontainer}>
        <Verifyicon  height={80} width={80} />
      </View>
      <View style={styles.titlecontainer}>
        <LabelComponent style={styles.title} label={Strings.SUCCESSFULLY_VERIFIED} />
      </View>
      <ButtonComponent  onPress={()=> navigation.reset(ROUTES.AUTH_STACK, { screen: ROUTES.ADD_MORE_DETAILS_SCREEN })}
        label={Strings.CHECK_IN}
        varient={ButtonVarient.lightgreen}
        labelVarient={TextVarient.greenbutton}
      />
    </SafeAreaView>
  )
}
