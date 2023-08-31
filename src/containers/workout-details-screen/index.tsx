import React, { useEffect, useState } from 'react'

import { NavigationService } from '../../navigation/NavigationService'
import { SafeAreaView, View, FlatList, ActivityIndicator } from 'react-native'
import { styles } from './style'

import { Header, LabelComponent } from '../../components'
import Colors from '../../styles/colors'
import { useRoute } from '@react-navigation/native'

export function Workoutscreen({ navigation }: any) {
  const [workoutPlan, setWorkoutPlan] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const route = useRoute()
  const { workoutData } = route.params as any
  useEffect(() => {
    getWorkoutData()
  }, [])

  const getWorkoutData = async () => {
    setIsLoading(true)

    try {
      console.log('workoutplan in wds screen')
      console.log(workoutData)
      setWorkoutPlan(workoutData)
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
        renderItem={({ item, index }: any) => (
          <View style={styles.card} key={index}>
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
            {item?.exercises?.map((v: any) => {
              return (
                <View key={v.name}>
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
