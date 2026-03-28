import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useContext } from 'react';

import { Ionicons } from '@expo/vector-icons';

import { ThemeContext } from '../context/ThemeContext';
import { formatRupiah } from '../utils/FormatRp';

export default function TransactionItem({ item, onDelete }) {

  const { theme } = useContext(ThemeContext);

   const isIncome = item.type === 'income';

  const bgColor = isIncome ? theme.incomeBg : theme.expenseBg;
  const iconName = isIncome ? 'arrow-up-circle' : 'arrow-down-circle';
  const iconColor = isIncome ? '#22C55E' : '#EF4444';

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
  <View style={[styles.container, { backgroundColor: bgColor, borderColor: theme.border }]}>
  
    {/* Date */}
    <Text style={[styles.date, { color: theme.text }]}>
      {formatDate(item.date)}
    </Text>

    {/* Type */}
    <View style={styles.row}>
      <Ionicons
        name={iconName}
        size={18}
        color={iconColor}
        style={styles.icon}
      />

      <Text style={[styles.type, { color: theme.text }]}>
        {item.type === 'income' ? 'Income' : 'Expense'}
      </Text>
    </View>

    {/* Amount */}
    <Text style={[styles.amount, { color: isIncome ? '#22C55E' : '#EF4444'}]}>
      {formatRupiah(item.amount)}
    </Text>

    {/* Category */}
    {!isIncome && item.category && (
      <Text style={[styles.text, { color: theme.text }]}>
        Category: {item.category}
      </Text>
    )}

    {/* Note */}
    <Text style={[styles.text, { color: theme.text }]}>
      Note: {item.note}
    </Text>

    {/* Delete */}
    <View style={styles.deleteContainer}>
      <Pressable
        onPress={() => onDelete(item.id)}
        style={[styles.deleteButton, { borderColor: theme.text }]}
      >
        <Ionicons name="trash" size={20} color="#EF4444" />
      </Pressable>
    </View>

  </View>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderRadius: 10,
    marginVertical: 6,
    borderWidth: 1
  },

  date: {
    fontSize: 14,
    marginBottom: 5
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4
  },

  icon: {
    marginRight: 6
  },

  type: {
    fontWeight: 'bold',
    fontSize: 18
  },

  amount: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 4
  },

  text: {
    fontSize: 14
  },

  deleteContainer: {
    position: 'absolute',
    top: 10,
    right: 10
  },

  deleteButton: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 2
  }
});