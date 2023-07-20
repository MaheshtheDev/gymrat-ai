import AsyncStorage from '@react-native-async-storage/async-storage'

export const TempStorageKeys = {
  USER_PROFILE: 'userProfile',
  APPLE_CREDENTIALS: 'appleCredentials',
  WORKOUT_PLAN: 'workoutPlan',
  MEAL_PLAN: 'mealPlan',
}

export const TempStorage = {
  async setItem(key: string, value: string) {
    try {
      await AsyncStorage.setItem(key, value)
    } catch (e) {
      console.log(e)
    }
  },
  async getItem(key: string) {
    try {
      const value = await AsyncStorage.getItem(key)
      if (value !== null) {
        return value
      }
    } catch (e) {
      console.log(e)
    }
  },
  async removeItem(key: string) {
    try {
      await AsyncStorage.removeItem(key)
    } catch (e) {
      console.log(e)
    }
  },
}
