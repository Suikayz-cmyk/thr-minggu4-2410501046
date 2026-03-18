import react, { createContext, useReducer } from 'react';

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

    return (
        <WalletContext.Provider value={{ state, dispatch }}>
            {children}
        </WalletContext.Provider>
    );
}