import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native'
import styles from './style'
import Colors from '@styles/colors'
import { LabelComponent } from '@components/Label'
import ProfileIcon from '../../assets/svg/profileicon.svg'
import { Ionicons } from '@expo/vector-icons'
import { Auth } from 'aws-amplify'

interface ProfileHeaderProps {
  onProfilePress?: () => void
  onLogoutPress?: () => void
  Profile?: boolean
  age: string
}

export const ProfileHeader = ({
  Profile = false,
  onProfilePress,
  onLogoutPress,
  age,
}: ProfileHeaderProps) => {
  useEffect(() => {
    fetchCurrentSessions()
  }, [])

  const fetchCurrentSessions = async () => {
    const userdata = await Auth.currentUserInfo()
    setUsername(userdata?.attributes?.name)
    console.log(userdata, 'sasa')
  }

  const [username, setUsername] = useState('')
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
