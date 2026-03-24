import { useState, useContext } from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import { WalletContext, ACTIONS } from '../context/WalletContext';

import TransactionItem from '../components/TransactionItem';
import Header from '../components/Header';

export default function HomeScreen({ navigation }) {
  const { state, dispatch } = useContext(WalletContext);

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

      <Button title="Add Transaction" onPress={() => navigation.navigate('Add')} />
        
      <View style={{ flexDirection: 'row', gap: 10 }}>
        <Button title="All" onPress={() => setFilter('all')} />
        <Button title="Income" onPress={() => setFilter('income')} />
        <Button title="Expense" onPress={() => setFilter('expense')} />
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