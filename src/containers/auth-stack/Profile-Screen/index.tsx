import React, { useEffect, useState } from 'react'

import { HomeStackNavProps, NavigationService } from '../../../navigation'
import { SafeAreaView, View, TouchableOpacity, ActivityIndicator } from 'react-native'
import { styles } from './style'

import {
  ButtonComponent,
  ButtonVarient,
  Header,
  LabelComponent,
  TextInputComponent,
  TextVarient,
} from '../../../components'
import { ROUTES, Strings } from '../../../constants'
import axios from 'axios'
import Colors from '../../../styles/colors'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { API } from '../../../helpers/api'

export const ProfileScreen: React.FC = ({ navigation }: any) => {
  const [firstName, setFirstName] = useState('')
  const [age, setAge] = useState('')
  const [lastName, setLastName] = useState('')
  const [gender, setGender] = useState('')
  const [disabled, setDisabled] = useState(false)
  const [visible, setVisible] = useState(true)
  const [userdata, setUserdata] = useState({})
  const [showButton, setShowButton] = useState(false)
  const [userdetails, setUserdetails] = useState('')
  const [name, setName] = useState<string>()
  const [isLoading, setLoading] = useState(true)

  const handleIconPress = () => {
    setShowButton(true)
    setDisabled(true)
  }

  useEffect(() => {
    fetchCurrentSessions()
    getUserDetails()
  }, [])

  useEffect(() => {
    handleGender()
  }, [gender, userdata])
  const getUserDetails = async () => {
    setLoading(true)

    try {
      const data = await API.getUserDetails()
      setUserdata(data)
      handleGender()
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const fetchCurrentSessions = async () => {
    const data = await API.getUserDetails()
    setUserdata(data)
    const name = data.fullName
    setName(name)
  }
  const handleGender = () => {
    if (userdata?.gender === 0) {
      setGender('Male')
    } else if (userdata?.gender === 1) {
      setGender('Female')
    } else if (userdata?.gender === 2) {
      setGender('Others')
    } else {
      setGender('')
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
      <Header
        Lebel={true}
        editICon={visible}
        onBackPress={() => NavigationService.goBack()}
        onIconPress={() => handleIconPress()}
      />
      <View style={styles.maincontainer}>
        <View style={{ flex: 1 }}>
          <View>
            <LabelComponent label={Strings.FRIST_NAME} style={styles.title} />
            <TextInputComponent
              value={firstName}
              onChangeText={txt => setFirstName(txt)}
              placeholder={name}
              editable={disabled}
              maxLength={15}
              style={styles.subtitle}
              onBlur={() => (disabled ? setDisabled(false) : setDisabled(true))}
            />
          </View>
          <View style={styles.titlecontainer}>
            <LabelComponent label={Strings.AGE} style={styles.title} />
            <TextInputComponent
              placeholder={`${userdata?.age}`}
              maxLength={2}
              value={age}
              editable={disabled}
              keyboardType='number-pad'
              onBlur={() => (disabled ? setDisabled(false) : setDisabled(true))}
              onChangeText={txt => setAge(txt)}
              style={styles.subtitle}
            />
          </View>
          <View style={styles.titlecontainer}>
            <LabelComponent label={Strings.GENDER} style={styles.title} />
            <TextInputComponent
              placeholder={gender}
              maxLength={6}
              value={gender}
              editable={disabled}
              onBlur={() => (disabled ? setDisabled(false) : setDisabled(true))}
              onChangeText={txt => setGender(txt)}
              style={[styles.subtitle, { opacity: 0.6 }]}
            />
          </View>
        </View>
      </View>
      <View style={styles.accountlinkcontainer}>
        <LabelComponent label={Strings.EMAIL_ADDRESS} style={styles.title} />
        <LabelComponent label={userdetails?.email} style={styles.subtitle} />
        {/* <View style={styles.linkconatiner}>
          <LabelComponent label={Strings.ACCOUNT_LINK} style={styles.title} />
          <View style={styles.ss}>
            <View style={styles.linkemailcontainer}>
              <Google height={15} width={15} />
              <LabelComponent
                label='mahesh.svmr@gmail.com'
                numberOfLines={2}
                style={styles.email}
              />
            </View>
          </View>
        </View> */}

        {showButton && (
          <TouchableOpacity
            onPress={() => {
              setVisible(true)
              setShowButton(false)
            }}>
            <View style={styles.linkemailcontainer1}>
              <LabelComponent label='SAVE' style={styles.save} />
            </View>
          </TouchableOpacity>
        )}
      </View>
      <ButtonComponent
        onPress={() => {
          AsyncStorage.clear()
          navigation.replace(ROUTES.AUTH_STACK)
        }}
        varient={ButtonVarient.logoutbutton}
        labelVarient={TextVarient.LogOut}
        label={Strings.LOG_OUT}
      />
    </SafeAreaView>
  )
}
