import { useContext } from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import { WalletContext, ACTIONS } from '../context/WalletContext';
import TransactionItem from '../components/TransactionItem';

export default function HomeScreen() {
  const { state, dispatch } = useContext(WalletContext);

  const handleDelete = (id) => {
    dispatch({
      type: ACTIONS.DELETE_TRANSACTION,
      payload: id
    });
  };

  return (
    <View>
      <Text>Transaction List</Text>

      <FlatList
        data={state.transactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TransactionItem item={item} onDelete={handleDelete} />
        )}
        ListEmptyComponent={<Text>No transactions yet</Text>}
      />
    </View>
  );
}