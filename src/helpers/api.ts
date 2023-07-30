import axios from 'axios'
import { User } from '../models/api'
import { TempStorage, TempStorageKeys } from './tempStorage'

export const API = {
  BASE_URL: 'https://gymrat-api.vercel.app/api',
  async User(body: User) {
    var response: any
    try {
      const userDetails = await this.getUserDetails(body.userId)
      if (userDetails && userDetails.status == 200) {
        console.log('user already exists')
        console.log(userDetails.data)
        return userDetails
      }
      console.log(body)
      response = await axios
        .post(`${this.BASE_URL}/user/details`, body)
        .then(async res => {
          console.log('Response from creating')
          console.log(res)
          console.log(res)
          const userDetails: User = {
            userId: res.data.userDetails.userId,
            fullName: res.data.userDetails.name,
            height: res.data.userDetails.bodyMetrics.height,
            weight: res.data.userDetails.bodyMetrics.weight,
            bmiValue: res.data.userDetails.bodyMetrics.bmiValue,
            age: res.data.userDetails.bodyMetrics.age,
            goal: res.data.userDetails.bodyMetrics.goal,
            gender: res.data.userDetails.gender,
            suggestedPlanId: res.data.userDetails.suggestedPlanId,
            mealPlan: res.data.suggestedPlan[0].mealPlan,
            workoutPlan: res.data.suggestedPlan[0].workoutPlan,
          }
          console.log(userDetails)
          await TempStorage.setItem(
            TempStorageKeys.USER_PROFILE,
            JSON.stringify(userDetails)
          )
          return { data: res.data.userDetails, status: res.status }
        })
        .catch(err => {
          console.log('Error from creating')
          console.log(err)
        })
      console.log(response.data)
    } catch (e) {
      console.log(e)
    }

    return response.data
  },
  async UpdateUser(body: any) {
    var response: any
    try {
      response = await axios
        .put(`${this.BASE_URL}/user/details`, body)
        .then(async res => {
          console.log('Response from updating')
          console.log(res)
          return { data: res.data, status: res.status }
        })
        .catch(err => {
          console.log('Error from updating')
          console.log(err)
        })
      console.log(response.data)
    } catch (e) {
      console.log(e)
    }

    return response.data
  },
  async getUserDetails(userId?: string) {
    console.log('User ID in get user details')
    console.log(userId)
    const userData = await TempStorage.getItem(TempStorageKeys.USER_PROFILE)
    if (userData) {
      console.log('user already exists')
      console.log(userData)
      console.log('user already exists end')
      const userDetails = JSON.parse(userData) as User
      return { data: userDetails, status: 200 }
    }

    if (userId == undefined) {
      return { data: null, status: 404 }
    }

    try {
      console.log('get user details in try')
      const res = await axios
        .get(`${this.BASE_URL}/user/details?userId=${userId}`)
        .then(async res => {
          console.log('Response ' + userId)
          console.log(res)
          const userDetails: User = {
            userId: res.data.userDetails.userId,
            fullName: res.data.userDetails.name,
            height: res.data.userDetails.bodyMetrics.height,
            weight: res.data.userDetails.bodyMetrics.weight,
            bmiValue: res.data.userDetails.bodyMetrics.bmiValue,
            age: res.data.userDetails.bodyMetrics.age,
            goal: res.data.userDetails.bodyMetrics.goal,
            gender: res.data.userDetails.gender,
            suggestedPlanId: res.data.userDetails.suggestedPlanId,
            mealPlan: res.data.suggestedPlan[0].mealPlan,
            workoutPlan: res.data.suggestedPlan[0].workoutPlan,
          }
          console.log(userDetails)
          await TempStorage.setItem(
            TempStorageKeys.USER_PROFILE,
            JSON.stringify(userDetails)
          )
          return { data: userDetails, status: res.status }
        })
      return res
    } catch (e) {
      console.log(e)
      return { data: null, status: 404 }
    }
  },
  async getPlanDetails(id: string, bmiValue: number) {
    console.log('getPlanDetails')
    console.log(id)
    console.log(bmiValue)
    const workoutPlan = await TempStorage.getItem(TempStorageKeys.WORKOUT_PLAN)
    const mealPlan = await TempStorage.getItem(TempStorageKeys.MEAL_PLAN)
    if (workoutPlan && mealPlan) {
      return {
        mealPlan: JSON.parse(mealPlan),
        workoutPlan: JSON.parse(workoutPlan),
        status: 200,
      }
    }

    await axios
      .get(`${this.BASE_URL}/gpt/plan?id=${id}&bmiValue=${bmiValue?.toString()}`)
      .then(async res => {
        await Promise.all([
          TempStorage.setItem(
            TempStorageKeys.WORKOUT_PLAN,
            JSON.stringify(res.data[0].workoutPlan)
          ),
          TempStorage.setItem(
            TempStorageKeys.MEAL_PLAN,
            JSON.stringify(res.data[0].mealPlan)
          ),
        ])
        return {
          mealPlan: res.data[0].mealPlan,
          workoutPlan: res.data[0].workoutPlan,
          status: res.status,
        }
      })
      .catch(err => {
        console.log(err)
        console.log('Error from getting plan')
        return { mealPlan: null, workoutPlan: null, status: 404 }
      })
  },
  async getNewPlan(userId: string) {
    await axios
      .get(`${this.BASE_URL}/gpt/new?userId=${userId}`)
      .then(async res => {
        console.log('Response from getting new plan')
      })
      .catch(err => {
        console.log('Error from getting new plan')
        console.log(err)
      })
  },

  async logOut() {
    await Promise.all([
      TempStorage.removeItem(TempStorageKeys.USER_PROFILE),
      TempStorage.removeItem(TempStorageKeys.WORKOUT_PLAN),
      TempStorage.removeItem(TempStorageKeys.MEAL_PLAN),
      TempStorage.removeItem(TempStorageKeys.APPLE_CREDENTIALS),
    ])
  },
}
