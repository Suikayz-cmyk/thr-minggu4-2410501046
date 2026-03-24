import { View, Text, Pressable } from 'react-native';

export default function TransactionItem({ item, onDelete }) {
  return (
    <View style={{ 
      marginVertical: 8,
      padding: 15, 
      borderWidth: 1,
      borderRadius: 15,
      backgroundColor: item.type === 'income' ? '#d4edda' : '#f8d7da',
      }}>

      <Text style={{ fontWeight: 'bold',fontSize: 18 }}>{item.type.toUpperCase()}</Text>
      <Text style={{ fontSize: 16 }}>Rp {item.amount}</Text>
      <Text style={{ fontSize: 14 }}>Note: {item.note}</Text>

      <Pressable
              onPress={() => onDelete(item.id)}
              style={({ pressed }) => ({
                backgroundColor: pressed ? '#B91C1C' : '#DC2626',
                padding: 12,
                borderRadius: 10,
                alignItems: 'center',
                marginTop: 10,
                borderColor: '#000000',
                borderWidth: 1
              })}
            >
              <Text style={{ color: 'white', fontWeight: 'bold' }}>
                Delete
              </Text>
        </Pressable>
    </View>
  );
}