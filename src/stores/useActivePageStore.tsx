import { create } from 'zustand';
import { type AppRoutes } from '../../router/RouterStacks';

type ActivePageStore = {
    activePage: AppRoutes;
    setActivePage: (pageName: string) => void;
};

const useActivePageStore = create<ActivePageStore>(set => ({
    activePage: 'Transactions',
    setActivePage: (pageName: AppRoutes) => {
        set({ activePage: pageName });
    },
}));

export default useActivePageStore;
