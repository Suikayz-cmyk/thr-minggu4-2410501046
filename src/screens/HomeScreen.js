import { useState, useContext } from 'react';
import { View, Text, FlatList, Pressable, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context'; 

import { WalletContext, ACTIONS } from '../context/WalletContext';
import { ThemeContext } from '../context/ThemeContext';

import TransactionItem from '../components/TransactionItem';
import Header from '../components/Header';

export default function HomeScreen({ navigation }) {
  const { state, dispatch } = useContext(WalletContext);

  const [type, setType] = useState('income'); 

  const { toggleTheme, isDark } = useContext(ThemeContext);

  const { theme } = useContext(ThemeContext);

  const [filter, setFilter] = useState('all'); 

  const handleDelete = (id) => {
    Alert.alert(
      'Delete Transaction',
      'Are you sure?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', 
          onPress: () => {
            dispatch({
              type: ACTIONS.DELETE_TRANSACTION,
              payload: id
            });
          }
        }
      ]
    );
  };
  
  const filteredTransactions = state.transactions.filter(t => {
  if (filter === 'all') return true;
  return t.type === filter;
  });

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
          <Text style={{ fontSize: 22, fontWeight: 'bold', color: theme.text }}>
              Transaction List
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

        <Header />

      {/* ADD TRANSACTION */}
        <Pressable
          onPress={() => navigation.navigate('Add')}
          style={({ pressed }) => ({
            backgroundColor: pressed ? theme.primary : theme.primary,
            opacity: pressed ? 0.8 : 1,
            padding: 12,
            borderRadius: 8,
            alignItems: 'center',
            marginBottom: 10
          })}
        >
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>
            Add Transaction
          </Text>
        </Pressable>
        
        <View style={{ flexDirection: 'row', gap: 10, marginVertical: 8 }}>

          {/* ALL */}
          <Pressable
            onPress={() => setFilter('all')}
            style={{
              flex: 1,
              padding: 10,
              borderRadius: 8,
              alignItems: 'center',
              backgroundColor: filter === 'all' ? '#747474' : '#ddd'
            }}
          >
            <Text style={{ color: filter === 'all' ? 'white' : 'black' }}>
              All
            </Text>
          </Pressable>

          {/* INCOME */}
          <Pressable
            onPress={() => setFilter('income')}
            style={{
              flex: 1,
              padding: 10,
              borderRadius: 8,
              alignItems: 'center',
              backgroundColor: filter === 'income' ? '#4CAF50' : '#d4edda' 
            }}
          >
            <Text style={{ color: filter === 'income' ? 'white' : 'black' }}>
              Income
            </Text>
          </Pressable>

          {/* EXPENSE */}
          <Pressable
            onPress={() => setFilter('expense')}
            style={{
              flex: 1,
              padding: 10,
              borderRadius: 8,
              alignItems: 'center',
              backgroundColor: filter === 'expense' ? '#F44336' : '#f8d7da'
            }}
          >
            <Text style={{ color: filter === 'expense' ? 'white' : 'black' }}>
              Expense
            </Text>
          </Pressable>

        </View>

        <FlatList
          data={filteredTransactions}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TransactionItem item={item} onDelete={handleDelete} />
          )}
          ListEmptyComponent={<Text style={{ color: theme.text }}>No transactions yet</Text>}
        />

        
      </View>
    </SafeAreaView>
  );
}