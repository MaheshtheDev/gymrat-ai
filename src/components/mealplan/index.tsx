import React from 'react'
import { View } from 'react-native'
import styles from './style'
import { LabelComponent } from '@components/Label'

interface mealPlanComponentProps {
  breakfastcalories: string
  breakfastmeal: string
  lunchcalories: string
  lunchmeal: string
  dinnercalories: string
  dinnermeal: string
  marginTopValue: number
  breakfastheadingstyle: object
}

export const mealPlanComponent = ({
  breakfastcalories,
  breakfastmeal,
  lunchcalories,
  lunchmeal,
  dinnercalories,
  dinnermeal,
  marginTopValue,
  breakfastheadingstyle,
}: mealPlanComponentProps) => {
  return (
    <View style={[styles.mealview, { marginTop: marginTopValue }]}>
      <View style={styles.mealconatiner}>
        <LabelComponent label='BREAKFAST' style={breakfastheadingstyle} />
        <LabelComponent label={breakfastcalories} style={styles.headingmd} />
      </View>
      <View>
        <LabelComponent label={breakfastmeal} style={styles.subheading} />
      </View>
      <View style={styles.mealconatiner}>
        <LabelComponent label='LUNCH' style={styles.heading} />
        <LabelComponent label={lunchcalories} style={styles.headingmd} />
      </View>
      <View>
        <LabelComponent label={lunchmeal} style={styles.subheading} />
      </View>
      <View style={styles.mealconatiner}>
        <LabelComponent label='DINNER' style={breakfastheadingstyle} />
        <LabelComponent label={dinnercalories} style={styles.headingmd} />
      </View>
      <View>
        <LabelComponent label={dinnermeal} style={styles.subheading} />
      </View>
    </View>
  )
}
