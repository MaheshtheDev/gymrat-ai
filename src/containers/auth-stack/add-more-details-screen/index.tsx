import React, { useEffect, useState } from 'react'

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
import { ROUTES, Strings } from '@constants'
import axios from 'axios'
import { Auth } from 'aws-amplify'

export const AddMoreDetailsScreen: React.FC<
  AuthStackNavProps<'AddMoreDetailsScreen'>
> = ({ navigation, route }) => {
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')
  const [gender, setGender] = useState('')
  const [age, setAge] = useState('')
  const [goal, setGoal] = useState('')

  const [inputFilled, setInputFilled] = useState(false)



  const handleContinueButtonPress = async () => {
    if (height && weight && gender && age && goal) {
      setInputFilled(true)

      const attributes = await Auth.currentUserInfo()

      try {
        const body = JSON.stringify({
          userId: attributes.id,
          height: parseInt(height, 10),
          weight: parseInt(weight, 10),
          gender: 1,
          age: parseInt(age, 10),
          goal: parseInt(goal, 10),
          bmiValue: 24.49,
        })

        console.log(body, 'bodysagar')
        const response = await axios.post(
          'https://gymrat-api.vercel.app/api/user/details',
          body,
          {
            headers: {
              Authorization: 'Bearer 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',
              'Content-Type': 'application/json',
            },
          }
        )
        // console.log(response.data, 'sasa')
        navigation.navigate(ROUTES.AUTH_STACK, {
          screen: ROUTES.HOME_SCREEN,
        })
      } catch (error) {
        console.log(error, 'err')
        console.error(error)
      }
    } else {
      setInputFilled(false)
    }
  }

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
              onChangeText={text => setHeight(text)}
            />
          </View>
          <View>
            <LabelComponent label={Strings.WEIGHT_LBS} style={styles.label} />
            <TextInputComponent
              placeholder={Strings.WEIGHT}
              style={styles.txtinput}
              keyboardType='number-pad'
              onChangeText={text => setWeight(text)}
            />
          </View>
          <View>
            <LabelComponent label={Strings.GENDER} style={styles.label} />
            <TextInputComponent
              placeholder={Strings.GENDER}
              style={styles.txtinput}
              onChangeText={text => setGender(text)}
            />
          </View>
          <View>
            <LabelComponent label={Strings.AGE} style={styles.label} />
            <TextInputComponent
              placeholder={'23'}
              style={styles.txtinput}
              keyboardType='number-pad'
              onChangeText={text => setAge(text)}
            />
          </View>

          <View>
            <LabelComponent label={Strings.GOAL} style={styles.label} />
            <TextInputComponent
              placeholder={Strings.GOAL}
              style={styles.txtinput}
              onChangeText={text => setGoal(text)}
            />
          </View>

          <View style={styles.buttoncontainer}>
            <ButtonComponent
              varient={ButtonVarient.lightgreen}
              labelVarient={TextVarient.black}
              label={Strings.CONTINUE}
              onPress={handleContinueButtonPress}
            />
          </View>
        </KeyboardAwareScrollView>
      </View>
    </SafeAreaView>
  )
}
