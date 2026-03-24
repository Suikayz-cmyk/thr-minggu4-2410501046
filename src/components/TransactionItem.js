import { View, Text, Button } from 'react-native';

export default function TransactionItem({ item, onDelete }) {
  return (
    <View style={{ 
      marginVertical: 8,
      padding: 15, 
      borderWidth: 1,
      borderRadius: 15,
      backgroundColor: item.type === 'income' ? '#d4edda' : '#f8d7da',
      }}>
      <Text>{item.type.toUpperCase()}</Text>
      <Text>Rp {item.amount}</Text>
      <Text>{item.note}</Text>

      <Button title="Delete" onPress={() => onDelete(item.id)} />
    </View>
  );
}