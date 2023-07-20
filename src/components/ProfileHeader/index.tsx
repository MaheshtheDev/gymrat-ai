import React, { useEffect, useState } from 'react'
import { View, TouchableOpacity, SafeAreaView } from 'react-native'
import styles from './style'
import Colors from '../../styles/colors'
import { LabelComponent } from '../../components/Label'
import ProfileIcon from '../../assets/svg/profileicon.svg'
import { Ionicons } from '@expo/vector-icons'
import * as SecureStore from 'expo-secure-store'
import { User } from '../../models/api'
import { TempStorage, TempStorageKeys } from '../../helpers/tempStorage'

interface ProfileHeaderProps {
  onProfilePress?: () => void
  onLogoutPress?: () => void
  Profile?: boolean
}

export const ProfileHeader = ({
  Profile = false,
  onProfilePress,
  onLogoutPress,
}: ProfileHeaderProps) => {
  useEffect(() => {
    fetchCurrentSessions()
  }, [])

  const fetchCurrentSessions = async () => {
    //const userdata = await SecureStore.getItemAsync('userDetails')
    const userdata = await TempStorage.getItem(TempStorageKeys.USER_PROFILE)
    if (userdata) {
      const userDetails: User = JSON.parse(userdata)
      console.log(userDetails)
      setUsername(userDetails.fullName)
      setUserDetails(userDetails)
    }
  }

  const [username, setUsername] = useState('')
  const [userDetails, setUserDetails] = useState<User | null>(null)
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
          <LabelComponent label={'Age: ' + userDetails?.age} style={styles.agenumber} />
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
