import { create } from 'zustand'


export const useUserStore = create(set => ({
  bears: 0,
  increasePopulation: () => set(state => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
  user: null,
  setUser: user => set({ user }),
  removeUser: () => set({ user: null }),
}))
