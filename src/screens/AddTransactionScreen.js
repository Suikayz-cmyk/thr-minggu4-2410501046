import { useState, useContext } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';

import { WalletContext, ACTIONS } from '../context/WalletContext';
import { ThemeContext } from '../context/ThemeContext';
import { formatRupiah } from '../utils/FormatRp';

export default function AddTransactionScreen({ navigation }) {
  // Context
  const { dispatch } = useContext(WalletContext);
  const { theme, toggleTheme, isDark } = useContext(ThemeContext);

  //State
  const [type, setType] = useState('income'); // 'income' atau 'expense'
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [category, setCategory] = useState('Jajan');

  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const isExpense = type === 'expense'
  const expenseCategories = [
    'Jajan',
    'Kebutuhan',
    'Investasi',
    'Lainnya'
  ];

  //Handlers
  const handleAmountChange = (text) => {
    const numeric = text.replace(/[^0-9]/g, '');
    setAmount(numeric);
  };

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
      category: isExpense ? category : null,
      date: date.toISOString()
    };

    dispatch({
      type: type === 'income'
        ? ACTIONS.ADD_INCOME
        : ACTIONS.ADD_EXPENSE,
      payload: newTransaction
    });
    
    // Reset form
    setAmount('');
    setNote('');
    navigation.goBack();
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.background
      }}
    >
    <View style={{ flex: 1, padding: 16 }}>
       <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 10
        }}>
          <Text style={{
            fontSize: 22,
            fontWeight: 'bold',
            color: theme.text
          }}>
            Add Transaction
          </Text>

          <Pressable  
            onPress={toggleTheme}
            style={({ pressed }) => ({
              opacity: pressed ? 0.5 : 1
            })}
          >
            <Ionicons
              name={isDark ? 'sunny' : 'moon'}
              size={24}
              color={theme.text}
            />
          </Pressable>
        </View>

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
        
        {/* DATE */}
        <View style={{ marginVertical: 10 }}>
            <Text style={{ color: theme.text, marginBottom: 6 }}>
              Date
            </Text>
        <Pressable onPress={() => setShowPicker(true)}
          style={{
              flexDirection: 'row',
              alignItems: 'center',
              padding: 12,
              borderWidth: 1,
              borderRadius: 8,
              backgroundColor: theme.card,
              borderColor: theme.border
          }}
        >
          <Ionicons
            name="calendar"
            size={18}
            color={theme.text}
            style={{ marginRight: 8 }}
          />
           <Text style={{ color: theme.text }}>
            {date.toLocaleDateString('id-ID')}
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
        </View>

        {/* AMOUNT */}
        <View style={{ marginVertical: 10 }}>
            <Text style={{ color: theme.text, marginBottom: 6 }}>
              Amount
            </Text>
        <TextInput
          style={{ 
            borderWidth: 1, 
            padding: 10, 
            borderRadius: 6,
            backgroundColor: theme.card,
            borderColor: theme.border,
            color: theme.text
          }}

          placeholder="Enter amount"
          placeholderTextColor={theme.inputPlaceholder}

          value={
            amount
              ? isFocused
                ? amount
                : formatRupiah(amount)
              : ''
          }
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChangeText={handleAmountChange}
          keyboardType="numeric"
        />
        </View>

        {/* CATEGORY */}
        {isExpense && (
          <View style={{ marginVertical: 10 }}>
            <Text style={{ color: theme.text, marginBottom: 6 }}>
              Category
            </Text>

            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
              {expenseCategories.map((cat) => (
                <Pressable
                  key={cat}
                  onPress={() => setCategory(cat)}
                  style={{
                    padding: 8,
                    borderRadius: 8,
                    backgroundColor:
                      category === cat ? theme.primary : theme.card,
                    borderWidth: 1,
                    borderColor: theme.border
                  }}
                >
                  <Text style={{ color: category === cat ? '#fff' : theme.text }}>
                    {cat}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
        )}

        {/* NOTE */}
        <View style={{ marginVertical: 10 }}>
            <Text style={{ color: theme.text, marginBottom: 6 }}>
              Note
            </Text>
        <TextInput
          style={{ 
            borderWidth: 1, 
            padding: 10, 
            borderRadius: 6,
            backgroundColor: theme.card,
            borderColor: theme.border,
            color: theme.text
          }}
          
          placeholder="Add a note (optional)"
          placeholderTextColor={theme.inputPlaceholder}

          value={note}
          onChangeText={setNote}
        />
        </View>

        {/* ADD BUTTON */}
        <Pressable
          onPress={handleAdd}
           style={({ pressed }) => ({
            backgroundColor: pressed ? theme.primary : theme.primary,
            opacity: pressed ? 0.8 : 1,
            padding: 12,
            borderRadius: 8,
            alignItems: 'center',
            marginTop: 10,
            marginBottom: 10
          })}
        >
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>
            Add
          </Text>
        </Pressable>
    
      </View>
    </SafeAreaView>
  );
}
