import React from 'react'
import { View } from 'react-native'
import styles from './style'
import { LabelComponent } from '@components/Label'

interface WorkOutComponentProps {
  setslabel: string
  repslabel: string
  tablelabel: string
}

export const WorkOutComponent = ({
  setslabel,
  repslabel,
  tablelabel,
}: WorkOutComponentProps) => {
  return (
    <View style={styles.tablecontainer}>
      <LabelComponent style={styles.tableitem} label={tablelabel} />
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <LabelComponent label={setslabel} style={styles.repsitem} />
        <LabelComponent label={repslabel} style={styles.repsitem} />
      </View>
    </View>
  )
}
