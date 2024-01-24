import { create } from 'zustand';

interface SignupStore {
    activePage: AppRoutes;
    setActivePage: (pageName: string) => void;
}

const useSignupStore = create<SignupStore>(set => ({}));

export default useSignupStore;
