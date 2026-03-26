import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context'; 

import { WalletProvider } from './src/context/WalletContext';
import { ThemeProvider } from './src/context/ThemeContext';

import HomeScreen from './src/screens/HomeScreen';
import AddTransactionScreen from './src/screens/AddTransactionScreen';
import ChartScreen from './src/screens/ChartScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <WalletProvider>
      <ThemeProvider>
        <NavigationContainer>
          <Tab.Navigator 
           screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Chart') {
            iconName = 'pie-chart';
          } else if (route.name === 'Add') {
            iconName = 'add-circle';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#3B82F6',
        tabBarInactiveTintColor: 'gray'
      })}
          >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Chart" component={ChartScreen} />
            <Tab.Screen name="Add" component={AddTransactionScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </WalletProvider>
  );
}