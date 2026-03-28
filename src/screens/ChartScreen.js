import { View, Text, Dimensions, Pressable } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { useState, useContext } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { WalletContext } from '../context/WalletContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import useWallet from '../hooks/useWallet';
import { ThemeContext } from '../context/ThemeContext';

export default function ChartScreen() {
  const { totalIncome, totalExpense } = useWallet();

  const { state } = useContext(WalletContext);

  const { theme } = useContext(ThemeContext); 
  const screenWidth = Dimensions.get('window').width;
  const { toggleTheme, isDark } = useContext(ThemeContext);

  const [mode, setMode] = useState('overview')

  const overviewData = [
    {
      name:'income',
      amount: totalIncome, 
      color: '#22C55E',
      legendFontColor: theme.text,
      legendFontSize: 12
    },
    {
      name:'expense',
      amount: totalExpense, 
      color: '#EF4444',
      legendFontColor: theme.text,
      legendFontSize: 12
    }
  ];

  const categoryMap = {};

  state.transactions.forEach((t) => {
    if (t.type === 'expense') {
      const key = t.category || 'Lainnya';
      if (!categoryMap[key]) categoryMap[key] = 0;
      categoryMap[key] += t.amount;
    }
  });

  const categoryData = Object.keys(categoryMap).map((key, index) => ({
    name: key,
    amount: categoryMap[key],
    color: ['#3B82F6', '#22C55E', '#F59E0B', '#EF4444'][index % 4],
    legendFontColor: theme.text,
    legendFontSize: 12
  }));

  const data = mode === 'overview' ? overviewData : categoryData;

  const safeData = data.length > 0 ? data : [
    {
      name: 'No Data',
      amount: 1,
      color: '#9CA3AF',
      legendFontColor: theme.text,
      legendFontSize: 12
    }
  ];

  const isEmpty =
  totalIncome === 0 &&
  totalExpense === 0 &&
  (!state?.transactions || state.transactions.length === 0);
  
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

        <View style={{
          flexDirection: 'row',
          backgroundColor: theme.card,
          borderRadius: 10,
          padding: 4,
          marginBottom: 12,
          borderWidth: 1,
          borderColor: theme.border
        }}>
          {['overview', 'category'].map((item) => {
            const isActive = mode === item;

            return (
              <Pressable
                key={item}
                onPress={() => setMode(item)}
                style={({ pressed }) => ({
                  flex: 1,
                  paddingVertical: 8,
                  borderRadius: 8,
                  alignItems: 'center',
                  backgroundColor: isActive ? theme.primary : 'transparent',
                  opacity: pressed ? 0.5 : 1
                })}
              >
                <Text style={{
                  color: isActive ? '#fff' : theme.text,
                  fontWeight: '500'
                }}>
                  {item === 'overview' ? 'Overview' : 'Category'}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {isEmpty ? (
          
          <Text style={{ color: theme.text, textAlign: 'center', marginTop: 50 }}>
            No data yet. Add some transactions 
          </Text>
          
        ) : (
          <PieChart
            data={safeData}
            width={screenWidth - 32}
            height={220}
            accessor="amount"
            backgroundColor="transparent"
            paddingLeft="15"
            chartConfig={{
              color: () => theme.text
            }}
          />
        )}
      </View>
    </SafeAreaView>
  );
}