import { useContext } from 'react';
import { WalletContext } from '../context/WalletContext';

export default function useWallet() {
  const { state } = useContext(WalletContext);

  const transactions = state.transactions;

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const balance = totalIncome - totalExpense;

  return {
    totalIncome,
    totalExpense,
    balance
  };
}