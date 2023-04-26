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

export const Workoutscreen: React.FC<AuthStackNavProps<'Workoutscreen'>> = ({
  navigation,
  route,
}) => {
  const [workoutPlan, setWorkoutPlan] = useState([])

  useEffect(() => {
    getWorkoutData()
  }, [])

  const getWorkoutData = async () => {
    try {
      const response = await axios.post(
        'https://gymrat-api.vercel.app/api/gpt/workout',
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
      setWorkoutPlan(response?.data?.workoutPlan)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <LabelComponent label='Workout Schedules' style={styles.title} />
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
        />
      </ScrollView>
    </SafeAreaView>
  )
}
