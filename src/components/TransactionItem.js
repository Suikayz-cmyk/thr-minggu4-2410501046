import { View, Text, Pressable } from 'react-native';
import { useState, useContext } from 'react';

import { ThemeContext } from '../context/ThemeContext';

export default function TransactionItem({ item, onDelete }) {

  const { theme } = useContext(ThemeContext);

  return (
    <View style={{ 
      backgroundColor: theme.card,
      padding: 12,
      borderRadius: 10,
      marginVertical: 6,
      borderWidth: 1,
      borderColor: theme.border
    }}>
      
      <Text style={{ fontSize: 14, color: theme.text, textAlign: 'right' }}>
       {new Date(item.date).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      })}
      </Text>

      <Text style={{ fontWeight: 'bold',fontSize: 18,color: theme.text }}>{item.type.toUpperCase()}</Text>
      
      <Text style={{ fontSize: 16, color: theme.text }}>Rp {item.amount}</Text>
      <Text style={{ fontSize: 14, color: theme.text }}>Note: {item.note}</Text>

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