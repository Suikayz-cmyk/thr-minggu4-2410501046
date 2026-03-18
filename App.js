import { WalletProvider } from './src/context/WalletContext';
import HomeScreen from './src/screens/HomeScreen';

export default function App() {
  return (
    <WalletProvider>
      <HomeScreen />
    </WalletProvider>
  );
}

