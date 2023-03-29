import { Dimensions, PixelRatio } from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { AsyncStorageKeys } from '@types'
import _ from 'lodash'

const screenWidth = Dimensions.get('window').width

const screenHeight = Dimensions.get('window').height

export const storePersistentConstants = async (key: AsyncStorageKeys, value: string) => {
  try {
    await AsyncStorage.setItem(key, value)
  } catch (error) {
    throw error
  } finally {
    return true
  }
}

export const removeAllStorageKeys = async () => {
  const keys = await AsyncStorage.getAllKeys()
  await AsyncStorage.multiRemove(keys)
}

export const getPersistentConstants = async (key: AsyncStorageKeys) => {
  const result = await AsyncStorage.getItem(key)
  return result
}

export const isBlank = (value: any) => {
  return (_.isEmpty(value) && !_.isNumber(value)) || _.isNaN(value)
}

export const wp = (widthPercent: number | string) => {
  const elemWidth =
    typeof widthPercent === 'number' ? widthPercent : parseFloat(widthPercent)
  return PixelRatio.roundToNearestPixel((screenWidth * elemWidth) / 100)
}

export const hp = (heightPercent: number | string) => {
  const elemHeight =
    typeof heightPercent === 'number' ? heightPercent : parseFloat(heightPercent)
  return PixelRatio.roundToNearestPixel((screenHeight * elemHeight) / 100)
}
