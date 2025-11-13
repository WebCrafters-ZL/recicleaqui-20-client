// Arquivo: src/navigation/MainNavigator.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// --- CORREÇÃO APLICADA AQUI ---
// Importando HomeScreen diretamente da pasta App
import HomeScreen from '../screens/App/HomeScreen';

// Tipos para este stack
export type MainStackParamList = {
  Home: undefined;
};

const Stack = createNativeStackNavigator<MainStackParamList>();

const MainNavigator = () => (
  <Stack.Navigator
    screenOptions={{ 
      headerShown: false
    }}
  >
    <Stack.Screen name="Home" component={HomeScreen} />
  </Stack.Navigator>
);

export default MainNavigator;