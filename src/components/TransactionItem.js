import { View, Text, Button } from 'react-native';

export default function TransactionItem({ item, onDelete }) {
  return (
    <View style={{ marginVertical: 8, padding: 10, borderWidth: 1 }}>
      <Text>{item.type.toUpperCase()}</Text>
      <Text>Rp {item.amount}</Text>
      <Text>{item.note}</Text>

      <Button title="Delete" onPress={() => onDelete(item.id)} />
    </View>
  );
}