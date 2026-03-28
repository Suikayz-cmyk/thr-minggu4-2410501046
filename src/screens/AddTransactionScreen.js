import { useState, useContext } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { WalletContext, ACTIONS } from '../context/WalletContext';
import { ThemeContext } from '../context/ThemeContext';
import { formatRupiah } from '../utils/FormatRp';

import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';

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

  const { toggleTheme, isDark } = useContext(ThemeContext);

  const [category, setCategory] = useState('Jajan');

  const [isFocused, setIsFocused] = useState(false);

  const expenseCategories = [
    'Jajan',
    'Kebutuhan',
    'Investasi',
    'Lainnya'
  ];

  const isExpense = type === 'expense'

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

  const handleAmountChange = (text) => {
      const numeric = text.replace(/[^0-9]/g, '');
      setAmount(numeric);
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

        {/* AMOUNT */}
        <TextInput
          style={{ 
            borderWidth: 1, 
            padding: 10, 
            marginVertical: 8, 
            borderRadius: 6,
            backgroundColor: theme.card,
            borderColor: theme.border,
            color: theme.text
          }}

          placeholder="Amount"
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

        {/* KATEGORY */}
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
                  <Text
                    style={{
                      color: category === cat ? '#fff' : theme.text
                    }}
                  >
                    {cat}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
        )}

        {/* NOTE */}
        <TextInput
          style={{ 
            borderWidth: 1, 
            padding: 10, 
            marginVertical: 8, 
            borderRadius: 6,
            backgroundColor: theme.card,
            borderColor: theme.border,
            color: theme.text
          }}
          
          placeholder="Note (e.g. Ayah / Belanja)"
          placeholderTextColor={theme.inputPlaceholder}

          value={note}
          onChangeText={setNote}
        />

        <Pressable
          onPress={handleAdd}
          style={({ pressed }) => ({
            backgroundColor: pressed ? theme.primary : theme.primary,
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
    </SafeAreaView>
  );
}