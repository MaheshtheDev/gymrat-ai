import React, { useEffect, useState } from 'react'

import { NavigationService } from '../../navigation/NavigationService'
import { SafeAreaView, View, FlatList, ScrollView, ActivityIndicator } from 'react-native'
import { styles } from './style'
import axios from 'axios'

import { CardComponent, Header, LabelComponent } from '../../components'
import Colors from '../../styles/colors'
import { useRoute } from '@react-navigation/native'

export function MealScreen({ navigation }: any) {
  const [mealPlan, setMealPlan] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const route = useRoute()
  const { mealPlanData } = route.params as any;
  useEffect(() => {
    getMealData()
  }, [])

  const getMealData = async () => {
    setIsLoading(true)

    try {
      setMealPlan(mealPlanData)
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
          renderItem={({ item }: any) => (
            <>
              <CardComponent cardStyle={styles.mealview}>
                <View style={styles.mealview}>
                  <LabelComponent label={item.day} style={styles.days} />
                  <View style={styles.mealconatiner}>
                    <LabelComponent label='BREAKFAST' style={styles.heading} />
                    <LabelComponent
                      label={`(${item.meals.breakfast.calories}cal)`}
                      style={styles.headingmd}
                    />
                  </View>
                  <View>
                    <LabelComponent
                      label={item.meals.breakfast.meal}
                      style={styles.subheading}
                    />
                  </View>
                  <View style={styles.mealconatiner}>
                    <LabelComponent label='LUNCH' style={styles.heading} />
                    <LabelComponent
                      label={`(${item.meals.lunch.calories}cal)`}
                      style={styles.headingmd}
                    />
                  </View>
                  <View>
                    <LabelComponent
                      label={item.meals.lunch.meal}
                      style={styles.subheading}
                    />
                  </View>
                  <View style={styles.mealconatiner}>
                    <LabelComponent label='DINNER' style={styles.heading} />
                    <LabelComponent
                      label={`(${item.meals.dinner.calories}cal)`}
                      style={styles.headingmd}
                    />
                  </View>
                  <View>
                    <LabelComponent
                      label={item.meals.dinner.meal}
                      style={styles.subheading}
                    />
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
