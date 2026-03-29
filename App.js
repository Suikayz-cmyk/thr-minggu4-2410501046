import { NavigationContainer } from '@react-navigation/native';

import { WalletProvider } from './src/context/WalletContext';
import { ThemeProvider } from './src/context/ThemeContext';
import TabNavigator from './src/navigation/TabNavigator';

export default function App() {
  return (
    <WalletProvider>
      <ThemeProvider>
        <NavigationContainer>
          <TabNavigator />
        </NavigationContainer>
      </ThemeProvider>
    </WalletProvider>
  );
}