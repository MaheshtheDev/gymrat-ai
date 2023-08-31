export type User = {
  userId: string
  fullName: string
  email: string
  height: number
  weight: number
  gender: number
  age: number
  goal: number
  bmiValue: number
  suggestedPlanId: string
  mealPlan?: string
  workoutPlan?: string
  expoNotificationToken?: string
}

export type UserDTO = {
  userId: string
  fullName: string
  bodyMetrics: BodyMetrics
  suggestedPlanId: string
  planGeneratedTimes: number
  Id: string
  gender: number
}

export type BodyMetrics = {
  bmiValue: number
  height: number
  weight: number
  age: number
  goal: number
}