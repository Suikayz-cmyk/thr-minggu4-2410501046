import { useState, useContext } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import { WalletContext, ACTIONS } from '../context/WalletContext';
import { ThemeContext } from '../context/ThemeContext';

import DateTimePicker from '@react-native-community/datetimepicker';

export default function AddTransactionScreen({ navigation }) {

  //Local State
  const [type, setType] = useState('income'); // 'income' atau 'expense'
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');

  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  //Global State
  const { dispatch } = useContext(WalletContext);

  const { theme } = useContext(ThemeContext);

  const handleDateChange = (event, selectedDate) => {
    setShowPicker(false);

    if (event.type === 'set'){
      setDate(selectedDate);
    }
  };

  const handleAdd = () => {
    if (!amount) return;

    const newTransaction = {
      id: Date.now().toString(),
      type,
      amount: Number(amount),
      note,
      date: date.toISOString()
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
    <View style={{ flex: 1, padding: 10, backgroundColor: theme.background}}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center', color: theme.text }}>Add Transaction</Text>

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
      
      <Pressable onPress={() => setShowPicker(true)}
        style={{
            padding: 12,            
            borderRadius: 8,
            backgroundColor: '#ddd',
            borderWidth: 1,
            borderColor: '#ccc',}}>
        <Text>
          Date: {date.toLocaleDateString('id-ID')}
        </Text>
      </Pressable>

      {showPicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

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
        <Text style={{ color: theme.text, fontWeight: 'bold' }}>
          Add
        </Text>
      </Pressable>
  
    </View>
  );
}