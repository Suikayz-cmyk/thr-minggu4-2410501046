import { View, Text } from 'react-native';
import useWallet from '../hooks/useWallet';

export default function Header() {
  const { balance, totalIncome, totalExpense } = useWallet();

  return (
    <View style={{ padding: 10, borderBottomWidth: 1 }}>
      <Text>Balance: Rp {balance}</Text>
      <Text>Income: Rp {totalIncome}</Text>
      <Text>Expense: Rp {totalExpense}</Text>
    </View>
  );
}