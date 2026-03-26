import { View, Text, Dimensions, Pressable } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { useState, useContext } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import useWallet from '../hooks/useWallet';
import { ThemeContext } from '../context/ThemeContext';

export default function ChartScreen() {
  const { totalIncome, totalExpense } = useWallet();

  const { theme } = useContext(ThemeContext); 
  const screenWidth = Dimensions.get('window').width;
  const { toggleTheme, isDark } = useContext(ThemeContext);

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
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.background
      }}
    >
      <View style={{ flex: 1, padding: 16 }}>
          <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 10
        }}>
          <Text style={{
            fontSize: 22,
            fontWeight: 'bold',
            color: theme.text
          }}>
            Chart
          </Text>

          <Pressable  
            onPress={toggleTheme}
            style={({ pressed }) => ({
              opacity: pressed ? 0.5 : 1
            })}
          >
            <Ionicons
              name={isDark ? 'sunny' : 'moon'}
              size={24}
              color={theme.text}
            />
          </Pressable>
        </View>
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
    </SafeAreaView>
  );
}