import React, { useEffect, useState } from 'react'

import { NavigationService } from '../../navigation/NavigationService'
import { SafeAreaView, View, ActivityIndicator, Text } from 'react-native'
import { styles } from './style'

import { Header } from '../../components'
import { ROUTES } from '../../constants'
import Colors from '../../styles/colors'
import { API } from '../../helpers/api'
import { hp } from '../../helpers'

export function ProfileScreen({ route, navigation }: any) {
  const [disabled, setDisabled] = useState(false)
  const [visible, setVisible] = useState(true)
  const [isLoading, setLoading] = useState(false)

  const { userData, id } = route.params as any

  const handleIconPress = () => {
    setDisabled(true)
  }

  useEffect(() => {
    console.log('In Profile Screen user details')
    console.log(userData)
    console.log(id)
  }, [])

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
      <Header
        Lebel={true}
        editICon={false}
        onBackPress={() => NavigationService.goBack()}
        onIconPress={() => handleIconPress()}
      />
      <View style={styles.maincontainer}>
        <View>
          {/* form that shows the user profile details */}
          <View>
            <Text style={styles.title}>Full Name </Text>
            <Text style={styles.subtitle}>{userData.fullName}</Text>
          </View>
        </View>
        <View style={{ paddingVertical: hp('1.5%') }}>
          {/* form that shows the user profile details */}
          <View>
            <Text style={styles.title}>Email </Text>
            <Text style={styles.subtitle}>{userData.email}</Text>
          </View>
        </View>
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
