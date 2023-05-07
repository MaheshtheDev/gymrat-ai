import React, { useEffect, useState } from 'react'

import { AuthStackNavProps, NavigationService } from '@navigation'
import { SafeAreaView, View, TouchableOpacity } from 'react-native'
import { styles } from './style'

import { Header, LabelComponent, TextInputComponent } from '@components'
import { Strings } from '@constants'
import Google from '../../../assets/svg/google.svg'
import { Auth } from 'aws-amplify'

export const ProfileScreen: React.FC<AuthStackNavProps<'ProfileScreen'>> = ({
  navigation,
  route,
}) => {
  const [firstName, setFirstName] = useState('')
  const [age, setAge] = useState('')
  const [lastName, setLastName] = useState('')
  const [gender, setGender] = useState('')
  const [disabled, setDisabled] = useState(false)
  const [visible, setVisible] = useState(true)
  const [showButton, setShowButton] = useState(false)
  const [email, setEmail] = useState('')

  const handleIconPress = () => {
    setShowButton(true)
    setDisabled(true)
  }

  useEffect(() => {
    fetchCurrentSessions()
  }, [])

  
  const fetchCurrentSessions = async () => {
    const userdata = await Auth.currentUserInfo()
    setEmail(userdata?.attributes?.email)
  }

  return (
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
              placeholder='Nimesh'
              editable={disabled}
              maxLength={15}
              style={styles.subtitle}
              onBlur={() => (disabled ? setDisabled(false) : setDisabled(true))}
            />
          </View>
          <View style={styles.titlecontainer}>
            <LabelComponent label={Strings.AGE} style={styles.title} />
            <TextInputComponent
              placeholder='23'
              maxLength={2}
              value={age}
              editable={disabled}
              keyboardType='number-pad'
              onBlur={() => (disabled ? setDisabled(false) : setDisabled(true))}
              onChangeText={txt => setAge(txt)}
              style={styles.subtitle}
            />
          </View>
        </View>
        <View style={styles.subcontainer}>
          <View>
            <LabelComponent label={Strings.LAST_NAME} style={styles.title} />
            <TextInputComponent
              placeholder='Goel'
              value={lastName}
              maxLength={15}
              editable={disabled}
              onBlur={() => (disabled ? setDisabled(false) : setDisabled(true))}
              onChangeText={txt => setLastName(txt)}
              style={styles.subtitle}
            />
          </View>
          <View style={styles.titlecontainer}>
            <LabelComponent label={Strings.GENDER} style={styles.title} />
            <TextInputComponent
              placeholder='Male'
              maxLength={6}
              value={gender}
              editable={disabled}
              onBlur={() => (disabled ? setDisabled(false) : setDisabled(true))}
              onChangeText={txt => setGender(txt)}
              style={styles.subtitle}
            />
          </View>
        </View>
      </View>
      <View style={styles.accountlinkcontainer}>
        <LabelComponent label={Strings.EMAIL_ADDRESS} style={styles.title} />
        <LabelComponent label={email} style={styles.subtitle} />
        <View style={styles.linkconatiner}>
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
        </View>

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
    </SafeAreaView>
  )
}
