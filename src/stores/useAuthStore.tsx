import { create } from 'zustand';
import { Session as SupabaseAuthSession } from '@supabase/supabase-js';

type AuthState = {
    session: SupabaseAuthSession | null;
    setSession: (session: SupabaseAuthSession | null) => void;
};

export const useAuthStore = create<AuthState>(set => ({
    session: null,
    setSession: session => set({ session }),
}));

export default useAuthStore;
