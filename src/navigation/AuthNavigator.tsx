// Arquivo: src/navigation/AuthNavigator.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// --- A CORREÇÃO ESTÁ AQUI ---
// Estamos importando diretamente o arquivo .tsx, ignorando o index.ts
import LoginScreen from '../screens/Auth/LoginScreen/LoginScreen';
import RegisterScreen from '../screens/Auth/RegisterScreen/RegisterScreen';

// (O console.log abaixo agora deve imprimir a função do componente, e não undefined)
// console.log('LoginScreen import ->', LoginScreen); 

// Tipos para este stack
export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthNavigator = () => (
  <Stack.Navigator
    initialRouteName="Login"
    screenOptions={{ headerShown: false }}
  >
    {/* Agora o 'LoginScreen' não será undefined */}
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
  </Stack.Navigator>
);

export default AuthNavigator;