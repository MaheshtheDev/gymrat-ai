import React, { useEffect, useState } from 'react'

import { HomeStackNavProps, NavigationService } from '@navigation'
import { SafeAreaView, View, FlatList, ActivityIndicator } from 'react-native'
import { styles } from './style'
import axios from 'axios'

import { Header, LabelComponent } from '@components'
import Colors from '@styles/colors'

export const Workoutscreen: React.FC = ({}) => {
  const [workoutPlan, setWorkoutPlan] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getWorkoutData()
  }, [])

  const getWorkoutData = async () => {
    setIsLoading(true)

    try {
      const response = await axios.post(
        'https://gymrat-api.vercel.app/api/gpt/workout',
        {
          height: 155,
          weight: 160,
          gender: 2,
          age: 24,
          goal: 1,
          partOfWeek: 1,
        },
        {
          headers: {
            Authorization: 'Bearer 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',
            'Content-Type': 'application/json',
          },
        }
      )
      setWorkoutPlan(response?.data?.workoutPlan)
      console.log(response?.data, 'shajshjahsjahsjhasjhasjj')
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
        <LabelComponent label='Workout Schedules' style={styles.title} />
      </View>

      <FlatList
        data={workoutPlan}
        renderItem={({ item }) => (
          <View style={styles.card}>
            {item?.exercises?.map(v => {
              return (
                <View>
                  {v.sets == '4' && (
                    <View style={styles.tablecontainer}>
                      <LabelComponent
                        style={[styles.tableitem, { color: Colors.SPRING_GREEN }]}
                        label={item.day}
                      />
                      <View style={{ flex: 1, flexDirection: 'row' }}>
                        <LabelComponent style={styles.tableitem} label='Sets' />
                        <LabelComponent style={styles.tableitem} label='Reps' />
                      </View>
                    </View>
                  )}
                  <View style={styles.tablecontainer}>
                    <LabelComponent style={styles.tableitem} label={v.name} />
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                      <LabelComponent label={v.sets} style={styles.repsitem} />
                      <LabelComponent label={v.reps} style={styles.repsitem} />
                    </View>
                  </View>
                </View>
              )
            })}
          </View>
        )}
        scrollEnabled={true}
      />
    </SafeAreaView>
  )
}
