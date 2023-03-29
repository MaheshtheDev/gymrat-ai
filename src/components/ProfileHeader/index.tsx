import React from 'react'
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native'
import styles from './style'
import Colors from '@styles/colors'
import { LabelComponent } from '@components/Label'
import ProfileIcon from '../../assets/svg/profileicon.svg'
import { Ionicons } from '@expo/vector-icons'

interface ProfileHeaderProps {
  onProfilePress?: () => void
  onLogoutPress?: () => void
  Profile?: boolean
  username: string
  age: string
}

export const ProfileHeader = ({
  Profile = false,
  onProfilePress,
  username,
  onLogoutPress,
  age,
}: ProfileHeaderProps) => {
  return (
    <SafeAreaView style={styles.container}>
      {Profile && (
        <TouchableOpacity style={styles.profilebutton} onPress={onProfilePress}>
          <ProfileIcon height={40} width={40} />
        </TouchableOpacity>
      )}
      <View style={styles.profilecontainer}>
        <View>
          <LabelComponent label={username} style={styles.username} />
          <LabelComponent label={age} style={styles.agenumber} />
        </View>
        <View style={styles.iconcontainer}>
          <TouchableOpacity onPress={onLogoutPress}>
            <Ionicons name='log-out' size={35} color={Colors.CAPE_COD} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}
