import { StateCreator, create } from 'zustand';
import { persist, createJSONStorage, PersistOptions } from 'zustand/middleware';

type AdminStore = {
  apiKey: string | null;
  setApiKey: (value: string) => void;
  clearApiKey: () => void;
};

type AdminStorePersist = (
  config: StateCreator<AdminStore>,
  options: PersistOptions<AdminStore>,
) => StateCreator<AdminStore>;

export const useAdminStore = create<AdminStore>()(
  (persist as AdminStorePersist)(
    (set) => ({
      apiKey: null,
      setApiKey: (value: string) => set({ apiKey: value }),
      clearApiKey: () => set({ apiKey: null }),
    }),
    {
      name: 'admin-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
