import { useState, useContext } from 'react';
import { View, Text, FlatList, Pressable } from 'react-native';
import { WalletContext, ACTIONS } from '../context/WalletContext';

import TransactionItem from '../components/TransactionItem';
import Header from '../components/Header';

export default function HomeScreen({ navigation }) {
  const { state, dispatch } = useContext(WalletContext);

  const [type, setType] = useState('income'); 

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
    <View style={{ flex: 1, padding: 10 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center' }}>Transaction List</Text>
      <Header />

     {/* ADD TRANSACTION */}
      <Pressable
        onPress={() => navigation.navigate('Add')}
        style={({ pressed }) => ({
          backgroundColor: pressed ? '#2563EB' : '#3B82F6',
          padding: 12,
          borderRadius: 8,
          alignItems: 'center',
          marginTop: 10
        })}
      >
        <Text style={{ color: 'white', fontWeight: 'bold' }}>
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
            backgroundColor: filter === 'all' ? '#333' : '#ddd'
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
        ListEmptyComponent={<Text>No transactions yet</Text>}
      />

      
    </View>
  );
}