import { View, Text } from 'react-native';
import { useState, useContext } from 'react';
import useWallet from '../hooks/useWallet';
import { ThemeContext } from '../context/ThemeContext';

export default function Header() {
  const { balance, totalIncome, totalExpense } = useWallet();

  const { theme } = useContext(ThemeContext);

  return (
    <View style={{ 
      backgroundColor: theme.card,
      padding: 10, 
      borderBottomWidth: 1,
      backgroundColor: '#4caf50',
      borderRadius: 10,
      marginBottom: 10
       }}>
        
      <Text style={{ color: theme.text, fontSize: 18 }}>Balance</Text>
      <Text style={{ color: theme.text, fontSize: 24, fontWeight: 'bold' }}>
        Rp {balance}
      </Text>
      
      <Text style = {{color: theme.text, fontSize: 16}}>Income: Rp {totalIncome}</Text>
      <Text style = {{color: theme.text, fontSize: 16}}>Expense: Rp {totalExpense}</Text>
    </View>
  );
}
