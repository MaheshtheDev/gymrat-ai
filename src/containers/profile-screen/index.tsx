import React, { useEffect, useState } from 'react'

import { NavigationService } from '../../navigation/NavigationService'
import { SafeAreaView, View, Text } from 'react-native'
import { styles } from './style'

import { Header } from '../../components'
import { GENDER, ROUTES } from '../../constants'
import { API } from '../../helpers/api'
import { hp } from '../../helpers'
import { Loader } from '../../components/Loader'

export function ProfileScreen({ route, navigation }: any) {
  const [disabled, setDisabled] = useState(false)
  const [visible, setVisible] = useState(true)
  const [isLoading, setLoading] = useState(false)

  const { userData, id } = route.params as any

  const handleIconPress = () => {
    setDisabled(true)
  }

  const getGenderLabel = (value: number) => {
    const gender = GENDER.find(item => item.value === value)
    return gender ? gender.label : ''
  }

  useEffect(() => {
    console.log('In Profile Screen user details')
  }, [])

  return isLoading ? (
    <Loader />
  ) : (
    <SafeAreaView style={styles.container}>
      <Header
        Lebel={true}
        editICon={false}
        onBackPress={() => NavigationService.goBack()}
        onIconPress={() => handleIconPress()}
      />
      <View style={styles.maincontainer}>
        <View style={{ paddingVertical: hp('0.5%') }}>
          <Text style={styles.title}>Full Name </Text>
          <Text style={styles.subtitle}>{userData.fullName}</Text>
        </View>
        <View style={{ paddingVertical: hp('0.5%') }}>
          {/* form that shows the user profile details */}
          <Text style={styles.title}>Email </Text>
          <Text style={styles.subtitle}>{userData.email}</Text>
        </View>
        <View style={{ paddingVertical: hp('0.5%') }}>
          {/* form that shows the user profile details */}
          <Text style={styles.title}>Age </Text>
          <Text style={styles.subtitle}>{userData.age}</Text>
        </View>
        <View style={{ paddingVertical: hp('0.5%') }}>
          {/* form that shows the user profile details */}
          <Text style={styles.title}>Gender </Text>
          <Text style={styles.subtitle}>{getGenderLabel(userData.gender)}</Text>
        </View>
        {/* TODO: Test Settings Sections*/}
        {/*<View style={{ paddingVertical: hp('1.5%') }}>
          <Text style={{ color: Colors.WHITE }}>SETTINGS</Text>
          <Text></Text>
        </View>*/}
      </View>
      <View
        style={{
          paddingVertical: 25,
          alignItems: 'center',
          flexDirection: 'column',
          justifyContent: 'center',
        }}>
        <Text
          onPress={async () => {
            await API.logOut().then(res => {
              console.log('logout response', res)
              navigation.replace(ROUTES.SIGN_UP_OPTIONS_SCREEN)
            })
          }}
          style={styles.logoutbutton}>
          Logout
        </Text>

        <Text
          onPress={async () => {
            setLoading(true)
            await API.deleteAccount(userData.userId).then(res => {
              setLoading(false)
              navigation.replace(ROUTES.SIGN_UP_OPTIONS_SCREEN)
            })
          }}
          style={styles.delete}>
          Delete Account
        </Text>
      </View>
    </SafeAreaView>
  )
}
