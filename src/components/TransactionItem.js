import { View, Text, Pressable } from 'react-native';
import { useState, useContext } from 'react';
import { Ionicons } from '@expo/vector-icons';

import { ThemeContext } from '../context/ThemeContext';

export default function TransactionItem({ item, onDelete }) {

  const { theme } = useContext(ThemeContext);

  const backgroundColor = item.type === 'income' ? theme.incomeBg : theme.expenseBg

  return (
    <View style={{ 
      backgroundColor: backgroundColor,
      padding: 12,
      borderRadius: 10,
      marginVertical: 6,
      borderWidth: 1,
      borderColor: theme.border
    }}>
      
      <Text style={{ fontSize: 14, color: theme.text, textAlign: 'left', marginBottom: 5 }}>
       {new Date(item.date).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      })}
      </Text>

      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
        <Ionicons
          name={item.type === 'income' ? 'arrow-up-circle' : 'arrow-down-circle'}
          size={18}
          color={item.type === 'income' ? '#22C55E' : '#EF4444'}
          style={{ marginRight: 6 }}
        />

        <Text style={{
          fontWeight: 'bold',
          fontSize: 18,
          color: theme.text
        }}>
          {item.type.toUpperCase()}
        </Text>
      </View>
      
      <Text style={{ fontSize: 16, color: theme.text }}>Rp {item.amount}</Text>
      <Text style={{ fontSize: 14, color: theme.text }}>Note: {item.note}</Text>

      <View style={{ position: 'absolute', top: 10, right: 10 }}>
        <Pressable onPress={() => onDelete(item.id)} style={{ borderWidth:1, borderRadius:5, borderColor: theme.text}}>
                <Ionicons name="trash" size={20} color="#EF4444" />             
          </Pressable>
        </View>
    </View>
  );
}