import { View, Text, StyleSheet } from 'react-native';
import { useContext } from 'react';
import { Ionicons } from '@expo/vector-icons';

import useWallet from '../hooks/useWallet';
import { ThemeContext } from '../context/ThemeContext';
import { formatRupiah } from '../utils/FormatRp';

export default function Header() {
  const { balance, totalIncome, totalExpense } = useWallet();
  const { theme } = useContext(ThemeContext);

  return (
    <View style={[styles.container, { backgroundColor: theme.summaryBg }]}>
      
      {/* Title */}
      <View style={styles.row}>
        <Ionicons
          name="wallet-outline"
          size={18}
          color={theme.summaryText}
          style={styles.icon}
        />
        <Text style={[styles.title, { color: theme.summaryText }]}>
          Balance
        </Text>
      </View>

      {/* Balance */}
      <Text
        style={[
          styles.balance,
          {
            color: balance >= 0 ? '#22C55E' : '#EF4444'
          }
        ]}
      >
        {formatRupiah(balance)}
      </Text>

      {/* Details */}
      <Text style={[styles.text, { color: theme.summaryText }]}>
        Income: {formatRupiah(totalIncome)}
      </Text>
      <Text style={[styles.text, { color: theme.summaryText }]}>
        Expense: {formatRupiah(totalExpense)}
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    borderBottomWidth: 1,

    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8
  },

  icon: {
    marginRight: 8
  },

  title: {
    fontWeight: 'bold',
    fontSize: 18
  },

  balance: {
    fontSize: 24,
    fontWeight: 'bold'
  },

  text: {
    fontSize: 16,
    marginTop: 6
  }
});