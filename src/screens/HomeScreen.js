import { useState, useContext } from 'react';
import { View, Text, FlatList, Pressable } from 'react-native';
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
    dispatch({
      type: ACTIONS.DELETE_TRANSACTION,
      payload: id
    });
  };

  const filteredTransactions = state.transactions.filter(t => {
  if (filter === 'all') return true;
  return t.type === filter;
  });

  return (
    <View
      style={{
        flex: 1,
        padding: 10,
        backgroundColor: theme.background
      }}
    >
      <Text style={{
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color: theme.text,
        marginBottom: 10
      }}
      >Transaction List</Text>
          
      <Pressable
        onPress={toggleTheme}
        style={{
          padding: 10,
          backgroundColor: theme.card,
          borderRadius: 8,
          borderWidth: 1,
          borderColor: theme.border,
          marginBottom: 10
        }}
      >
        <Text style={{ color: theme.text, textAlign: 'center' }}>
          {isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        </Text>
      </Pressable>

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
  );
}