import React from 'react'

import { AuthStackNavProps } from '@navigation'
import { SafeAreaView, View } from 'react-native'
import { styles } from './style'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import {
  ButtonComponent,
  ButtonVarient,
  LabelComponent,
  TextInputComponent,
  TextVarient,
} from '@components'
import { Strings } from '@constants'

export const AddMoreDetailsScreen: React.FC<
  AuthStackNavProps<'AddMoreDetailsScreen'>
> = ({ navigation, route }) => {
  return (
    <SafeAreaView style={styles.container}>
      
      <View style={styles.titlecontainer}>
        <LabelComponent style={styles.title} label={Strings.ADD_GOAL_AND_METRICS} />
      </View>
      <View>
        <LabelComponent
          label={Strings.ADD_GOAL_SCREEN_DESCRIPTION_TEXT}
          style={styles.subtitle}
        />
        <KeyboardAwareScrollView>
          <View>
            <LabelComponent label={Strings.HEIGHT_CMS} style={styles.label} />
            <TextInputComponent
              placeholder={Strings.HEIGHT}
              style={styles.txtinput}
              keyboardType='number-pad'
            />
          </View>
          <View>
            <LabelComponent label={Strings.WEIGHT_LBS} style={styles.label} />
            <TextInputComponent
              placeholder={Strings.WEIGHT}
              style={styles.txtinput}
              keyboardType='number-pad'
            />
          </View>
          <View>
            <LabelComponent label={Strings.GENDER} style={styles.label} />
            <TextInputComponent placeholder={Strings.GENDER} style={styles.txtinput} />
          </View>
          <View>
            <LabelComponent label={Strings.AGE} style={styles.label} />
            <TextInputComponent
              placeholder={'23'}
              style={styles.txtinput}
              keyboardType='number-pad'
            />
          </View>
          
          <View>
            <LabelComponent label={Strings.GOAL} style={styles.label} />
            <TextInputComponent placeholder={Strings.GOAL} style={styles.txtinput} />
          </View>
          
          <View style={styles.buttoncontainer}>
            <ButtonComponent
              varient={ButtonVarient.lightgreen}
              labelVarient={TextVarient.black}
              label={Strings.CONTINUE}
            />
          </View>
          </KeyboardAwareScrollView>
      </View>
    </SafeAreaView>
  )
}
