import { create } from 'zustand';

type AmountStore = {
    amount: string;
    setAmount: (newAmount: string) => void;
    backspace: () => void;
};

const useAmountStore = create<AmountStore>(set => ({
    amount: '',
    setAmount: newAmount => set({ amount: newAmount }),
    backspace: () => set(state => ({ amount: state.amount.slice(0, -1) })),
}));

export default useAmountStore;
