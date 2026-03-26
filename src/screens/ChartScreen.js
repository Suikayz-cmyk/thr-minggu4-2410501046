import { View, Text, Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { useState, useContext } from 'react';
import useWallet from '../hooks/useWallet';
import { ThemeContext } from '../context/ThemeContext';

export default function ChartScreen() {
  const { totalIncome, totalExpense } = useWallet();

  const { theme } = useContext(ThemeContext); 
  const screenWidth = Dimensions.get('window').width;

  const data = [
    {
      name: 'Income',
      amount: totalIncome,
      color: '#4CAF50',
      legendFontColor: '#000',
      legendFontSize: 14
    },
    {
      name: 'Expense',
      amount: totalExpense,
      color: '#F44336',
      legendFontColor: '#000',
      legendFontSize: 14
    }
  ];

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: theme.background }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10,color: theme.text }}>
        Financial Overview
      </Text>

      <PieChart
        data={data}
        width={screenWidth - 32}
        height={220}
        chartConfig={{
          color: () => '#000'
        }}
        accessor="amount"
        backgroundColor= 'white'
        paddingLeft="15"

        
      />
    </View>
  );
}