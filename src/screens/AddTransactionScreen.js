import { useState, useContext } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
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
      <Button title="Income" onPress={() => setType('income')} />
      <Button title="Expense" onPress={() => setType('expense')} />

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

      <Button title="Add" onPress={handleAdd} />
  
    </View>
  );
}