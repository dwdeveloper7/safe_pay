import { create } from 'zustand';

interface ActivePageStore {
    activePage: string;
    setActivePage: (pageName: string) => void;
}

const useActivePageStore = create<ActivePageStore>(set => ({
    activePage: 'Home',
    setActivePage: pageName => {
        set({ activePage: pageName });
    },
}));

export default useActivePageStore;
