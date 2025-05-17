import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type AdminStore = {
  apiKey: string | null;
  setApiKey: (value: string) => void;
};

export const useAdminStore = create<AdminStore>()(
  persist(
    (set) => ({
      apiKey: null,
      setApiKey: (value) => set({ apiKey: value }),
    }),
    {
      name: 'admin-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
