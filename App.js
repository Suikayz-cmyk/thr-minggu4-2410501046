import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { WalletProvider } from './src/context/WalletContext';

import HomeScreen from './src/screens/HomeScreen';
import AddTransactionScreen from './src/screens/AddTransactionScreen';
import ChartScreen from './src/screens/ChartScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <WalletProvider>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Chart" component={ChartScreen} />
          <Tab.Screen name="Add" component={AddTransactionScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </WalletProvider>
  );
}