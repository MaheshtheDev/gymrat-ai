import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface UserState {
  isOnboarded: boolean
  userId: string
  setUserId: (userId: string) => void
  userToken: string
  setUserToken: (userToken1: string) => void
  userDetails: string
  setUserDetails: () => void
  logOut: () => void
}

export const useUserStore = create<UserState>()(
  devtools(
    persist(
      set => ({
        isOnboarded: false,
        userId: '',
        setUserId: (userId: string) => set({ userId }),
        userToken: '',
        setUserToken: (userToken1: string) => set({ userToken: userToken1 }),
        userDetails: '',
        setUserDetails: () => {
          //API.getUserDetails(userId).then(data => {
          //  set({ userDetails: data })
          //})
        },
        logOut: () => set({ userId: '', userToken: '', isOnboarded: false }),
      }),
      {
        name: 'user-storage',
        getStorage: () => AsyncStorage,
      }
    )
  )
)
