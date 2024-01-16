import { create } from 'zustand';

type AmountStore = {
    amount: string;
    setAmount: (newAmount: string) => void;
    backspace: () => void;
};

const useAmountStore = create<AmountStore>(set => ({
    amount: '0',
    setAmount: newAmount =>
        set(state => {
            const hasDecimal = state.amount.includes('.');
            let updatedAmount = newAmount;

            // Append a decimal if the newAmount is just a decimal point and the current amount does not have one.
            if (newAmount === '.' && !hasDecimal) {
                updatedAmount = state.amount + '.';
            }
            // Ignore the new input only if it's a decimal and the current amount already has a decimal.
            else if (newAmount.slice(-1) === '.' && hasDecimal) {
                updatedAmount = state.amount;
            }
            // Remove the leading zero if the current amount is '0'.
            else if (state.amount === '0') {
                updatedAmount = newAmount.replace(/^0+/, '');
            }
            // Otherwise, set the amount normally.
            else {
                updatedAmount = newAmount;
            }

            return { amount: updatedAmount };
        }),
    backspace: () =>
        set(state => {
            const newAmount = state.amount.slice(0, -1);
            return { amount: newAmount === '' ? '0' : newAmount };
        }),
}));

export default useAmountStore;
