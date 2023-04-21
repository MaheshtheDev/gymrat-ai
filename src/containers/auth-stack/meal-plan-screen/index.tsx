import React, { useEffect, useState } from 'react'

import { AuthStackNavProps } from '@navigation'
import {
  SafeAreaView,
  SectionList,
  View,
  FlatList,
  TouchableOpacity,
  Text,
  ScrollView,
} from 'react-native'
import { styles } from './style'
import Modal from 'react-native-modal'
import axios from 'axios'

import { Entypo } from '@expo/vector-icons'
import {
  ButtonComponent,
  ButtonVarient,
  CardComponent,
  LabelComponent,
  TextInputComponent,
  TextVarient,
} from '@components'
import { Strings } from '@constants'
import Colors from '@styles/colors'
import { StatusBar } from 'expo-status-bar'

export const MealScreen: React.FC<AuthStackNavProps<'MealScreen'>> = ({
  navigation,
  route,
}) => {
  const [mealPlan, setMealPlan] = useState([])

  useEffect(() => {
    getMealData()
  }, [])

  const getMealData = async () => {
    try {
      const response = await axios.post(
        'https://gymrat-api.vercel.app//api/gpt/meal',
        {
          height: 155,
          weight: 160,
          gender: 2,
          age: 24,
          goal: 1,
        },
        {
          headers: {
            Authorization: 'Bearer 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',
            'Content-Type': 'application/json',
          },
        }
      )
      console.log(response.data, 'sagar')
      setMealPlan(response?.data?.mealPlan)
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <LabelComponent label='Meal Plan Schedules' style={styles.title} />
        <FlatList
          data={mealPlan}
          renderItem={({ item }) => (
            <>
              <CardComponent cardStyle={styles.mealview}>
                <View style={styles.mealview}>
                  <LabelComponent label={item.day} style={styles.days} />
                  <View style={styles.mealconatiner}>
                    <LabelComponent label='BREAKFAST' style={styles.heading} />
                    <LabelComponent
                      label={`(${item.breakfast.calories}cal)`}
                      style={styles.headingmd}
                    />
                  </View>
                  <View>
                    <LabelComponent
                      label={item.breakfast.meal}
                      style={styles.subheading}
                    />
                  </View>
                  <View style={styles.mealconatiner}>
                    <LabelComponent label='LUNCH' style={styles.heading} />
                    <LabelComponent
                      label={`(${item.lunch.calories}cal)`}
                      style={styles.headingmd}
                    />
                  </View>
                  <View>
                    <LabelComponent label={item.lunch.meal} style={styles.subheading} />
                  </View>
                  <View style={styles.mealconatiner}>
                    <LabelComponent label='DINNER' style={styles.heading} />
                    <LabelComponent
                      label={`(${item.dinner.calories}cal)`}
                      style={styles.headingmd}
                    />
                  </View>
                  <View>
                    <LabelComponent label={item.dinner.meal} style={styles.subheading} />
                  </View>
                </View>
              </CardComponent>
            </>
          )}
        />
      </ScrollView>
    </SafeAreaView>
  )
}
