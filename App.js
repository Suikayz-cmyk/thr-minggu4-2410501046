import { WalletProvider } from './src/context/WalletContext';
import HomeScreen from './src/screens/HomeScreen';
import AddTransactionScreen from './src/screens/AddTransactionScreen';

export default function App() {
  return (
    <WalletProvider>
      <HomeScreen />
    </WalletProvider>
  );
}

