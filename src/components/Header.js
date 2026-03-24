import { View, Text } from 'react-native';
import useWallet from '../hooks/useWallet';

export default function Header() {
  const { balance, totalIncome, totalExpense } = useWallet();

  return (
    <View style={{ 
      padding: 10, 
      borderBottomWidth: 1,
      backgroundColor: '#4caf50',
      borderRadius: 10,
      marginBottom: 10
       }}>
       <Text style={{ color: 'white', fontSize: 18 }}>Balance</Text>
      <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}>
        Rp {balance}
      </Text>
      
      <Text style = {{color: 'white', fontSize: 16}}>Income: Rp {totalIncome}</Text>
      <Text style = {{color: 'white', fontSize: 16}}>Expense: Rp {totalExpense}</Text>
    </View>
  );
}
