import React, { createContext, useReducer, useEffect, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


// Action Types
export const ACTIONS = {
    ADD_INCOME: 'ADD_INCOME',
    ADD_EXPENSE: 'ADD_EXPENSE',
    DELETE_TRANSACTION: 'DELETE_TRANSACTION',
    SET_TRANSACTIONS: 'SET_TRANSACTIONS'
};

// Initial State
const initialState = {
    transactions: []
};

// Reducer Function
function walletReducer(state, action) {
    switch (action.type) {

        case ACTIONS.ADD_INCOME:
            //Tambah Data Pemasukan
            return {
                ...state,
                transactions: [...state.transactions, action.payload]
            };

        case ACTIONS.ADD_EXPENSE:
            //Tambah Data Pengeluaran
            return {
                ...state,
                transactions: [...state.transactions, action.payload]
            };

        case ACTIONS.DELETE_TRANSACTION:
            //Hapus berdasarkan ID
            return {
                ...state,
                transactions: state.transactions.filter(
                    t => t.id !== action.payload
                )
            };
        
        case ACTIONS.SET_TRANSACTIONS:
            //Load Data dari AsyncStorage
            return {
                ...state,
                transactions: action.payload
            };
        
        default:
            return state;
    }
}
        
// Buat context
export const WalletContext = createContext();

//Provider 
export function WalletProvider({ children }) {
    const [state, dispatch] = useReducer(walletReducer, initialState);
    const isLoaded = useRef(false);

        //Save Data ke AsyncStorage 
       useEffect(() => {
        if (!isLoaded.current) return; 

        const saveData = async () => {
            try {
            await AsyncStorage.setItem(
                'transactions',
                JSON.stringify(state.transactions)
            );
            } catch (e) {
            console.log('Error saving data', e);
            }
        };

        saveData();
        }, [state.transactions]);

        //Load Data dari AsyncStorage 
       useEffect(() => {
        const loadData = async () => {
            try {
            const storedData = await AsyncStorage.getItem('transactions');

            if (storedData !== null) {
                dispatch({
                type: ACTIONS.SET_TRANSACTIONS,
                payload: JSON.parse(storedData)
                });
            }

            isLoaded.current = true;
            } catch (e) {
            console.log('Error loading data', e);
            }
        };

        loadData();
        }, []);

    return (
        <WalletContext.Provider value={{ state, dispatch }}>
            {children}
        </WalletContext.Provider>
    );
}