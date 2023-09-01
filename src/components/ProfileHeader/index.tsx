import React, { useEffect, useState } from 'react'
import { View, TouchableOpacity, SafeAreaView } from 'react-native'
import styles from './style'
import Colors from '../../styles/colors'
import { LabelComponent } from '../../components/Label'
import ProfileIcon from '../../assets/svg/profileicon.svg'
import FprofileIcon from '../../assets/svg/fprofileicon.svg'
import { Ionicons } from '@expo/vector-icons'
import { User } from '../../models/api'

interface ProfileHeaderProps {
  onProfilePress?: () => void
  onLogoutPress?: () => void
  Profile?: boolean
  userData?: User
}

export const ProfileHeader = ({
  Profile = false,
  onProfilePress,
  onLogoutPress,
  userData,
}: ProfileHeaderProps) => {

  return (
    <SafeAreaView style={styles.container}>
      {Profile && (
        <TouchableOpacity style={styles.profilebutton} onPress={onProfilePress}>
          {
            userData?.gender == 0 ? (
              <ProfileIcon height={40} width={40} />
            ) : (
              <FprofileIcon height={40} width={40} />
            )
          }
        </TouchableOpacity>
      )}
      <View style={styles.profilecontainer}>
        <View>
          <LabelComponent label={userData?.fullName} style={styles.username} />
          <LabelComponent label={'Age: ' + userData?.age} style={styles.agenumber} />
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
