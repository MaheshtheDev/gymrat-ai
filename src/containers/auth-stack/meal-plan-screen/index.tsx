import React, { useEffect, useState } from 'react'

import { HomeStackNavProps, NavigationService } from '@navigation'
import { SafeAreaView, View, FlatList, ScrollView, ActivityIndicator } from 'react-native'
import { styles } from './style'
import axios from 'axios'

import { CardComponent, Header, LabelComponent } from '@components'
import Colors from '@styles/colors'

export const MealScreen: React.FC<HomeStackNavProps<'MealScreen'>> = ({
}) => {
  const [mealPlan, setMealPlan] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getMealData()
  }, [])

  const getMealData = async () => {
    setIsLoading(true)

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
          timeout: 120000,
        }
      )
      setMealPlan(response?.data?.mealPlan)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }
  return isLoading ? (
    <View style={{ backgroundColor: Colors.BLACK, flex: 1 }}>
      <ActivityIndicator
        size={'large'}
        style={{
          alignSelf: 'center',
          justifyContent: 'center',
          flex: 1,
        }}
      />
    </View>
  ) : (
    <SafeAreaView style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>
        <Header onBackPress={() => NavigationService.goBack()} />
        <LabelComponent label='Meal Plan Schedules' style={styles.title} />
      </View>
      <ScrollView>
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
