import { useState, useContext } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import { WalletContext, ACTIONS } from '../context/WalletContext';

export default function AddTransactionScreen({ navigation }) {

  //Local State
  const [type, setType] = useState('income'); // 'income' atau 'expense'
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');

  //Global State
  const { dispatch } = useContext(WalletContext);

  const handleAdd = () => {
    if (!amount) return;

    const newTransaction = {
      id: Date.now().toString(),
      type,
      amount: Number(amount),
      note,
      date: new Date().toISOString()
    };

    if (type === 'income') {
      dispatch({ type: ACTIONS.ADD_INCOME, payload: newTransaction });
    } else {
      dispatch({ type: ACTIONS.ADD_EXPENSE, payload: newTransaction });
    }
    
    // Reset form
    setAmount('');
    setNote('');

    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center' }}>Add Transaction</Text>

      {/* Type */}
      <View style={{ flexDirection: 'row', gap: 10, marginVertical: 10 }}>
        {/* INCOME */}
        <Pressable
          onPress={() => setType('income')}
          style={{
            flex: 1,
            padding: 12,
            borderRadius: 8,
            alignItems: 'center',
            backgroundColor: type === 'income' ? '#4CAF50' : '#d4edda'
          }}
        >
          <Text style={{ color: type === 'income' ? 'white' : 'black' }}>
            Income
          </Text>
        </Pressable>

        {/* EXPENSE */}
        <Pressable
          onPress={() => setType('expense')}
          style={{
            flex: 1,
            padding: 12,
            borderRadius: 8,
            alignItems: 'center',
            backgroundColor: type === 'expense' ? '#F44336' : '#f8d7da'
          }}
        >
          <Text style={{ color: type === 'expense' ? 'white' : 'black' }}>
            Expense
          </Text>
        </Pressable>
      </View>
      

      {/* AMOUNT */}
      <TextInput
        style={{ borderWidth: 1, padding: 10, marginVertical: 8, borderRadius: 6 }}

        placeholder="Amount"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />

      {/* NOTE */}
      <TextInput
        style={{ borderWidth: 1, padding: 10, marginVertical: 8, borderRadius: 6 }}

        placeholder="Note (e.g. Ayah / Belanja)"
        value={note}
        onChangeText={setNote}
      />

      <Pressable
        onPress={handleAdd}
        style={({ pressed }) => ({
          backgroundColor: pressed ? '#2563EB' : '#3B82F6',
          padding: 12,
          borderRadius: 8,
          alignItems: 'center',
          marginTop: 10
        })}
      >
        <Text style={{ color: 'white', fontWeight: 'bold' }}>
          Add
        </Text>
      </Pressable>
  
    </View>
  );
}