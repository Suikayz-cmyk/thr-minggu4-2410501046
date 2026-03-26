import { View, Text } from 'react-native';
import { useState, useContext } from 'react';
import useWallet from '../hooks/useWallet';
import { ThemeContext } from '../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

export default function Header() {
  const { balance, totalIncome, totalExpense } = useWallet();

  const { theme } = useContext(ThemeContext);

  return (
    <View style={{ 
      backgroundColor: theme.summaryBg,
      padding: 10, 
      borderBottomWidth: 1,
      borderRadius: 10,
      marginBottom: 10,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 3
      }}>

        <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 8
          }}>
            <Ionicons
              name="wallet-outline"
              size={18}
              color={theme.summaryText}
              style={{ marginRight: 8 }}
            />

            <Text style={{ color: theme.summaryText , fontWeight: 'bold', fontSize: 18 }}>Balance</Text>
          </View>
        
      
      <Text style={{ color: theme.summaryText , fontSize: 24, fontWeight: 'bold' }}>
        Rp {balance}
      </Text>
      
      <Text style = {{color: theme.summaryText , fontSize: 16}}>Income: Rp {totalIncome}</Text>
      <Text style = {{color: theme.summaryText , fontSize: 16}}>Expense: Rp {totalExpense}</Text>
    </View>
  );
}
