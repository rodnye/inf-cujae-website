import { User } from '@/types/user';
import { StateCreator, create } from 'zustand';
import { persist, createJSONStorage, PersistOptions } from 'zustand/middleware';

type UserStore = {
  userData: User | null;
  sessionKey: string | null;
  _setSessionKey: (session: string | null) => void;
  _setUserData: (user: User | null) => void;
};

export const useUserStore = create<UserStore>()(
  (
    persist as (
      config: StateCreator<UserStore>,
      options: PersistOptions<UserStore>,
    ) => StateCreator<UserStore>
  )(
    (set, get) => ({
      sessionKey: null,
      userData: null,
      _setUserData: (user) => set({ userData: user }),
      _setSessionKey: (value) => set({ sessionKey: value }),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
