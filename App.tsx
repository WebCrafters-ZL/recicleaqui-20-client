// Arquivo: App.tsx

import AuthNavigator from './src/navigation/AuthNavigator';
import MainNavigator from './src/navigation/MainNavigator';

import * as React from 'react';
import { StatusBar, View, ActivityIndicator } from 'react-native';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// --- 2. Componente Principal ---
function App(): React.ReactElement {
  
  // --- 3. O ESTADO DE LOGIN ---
  // Verificar token no AsyncStorage para determinar se está autenticado
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isChecking, setIsChecking] = React.useState(true);

  // Carregamento das fontes (seu código original)
  const [fontsLoaded] = useFonts({
    'Montserrat-Regular': require('./assets/fonts/Montserrat-Regular.ttf'),
    'Montserrat-Bold': require('./assets/fonts/Montserrat-Bold.ttf'),
  });

  // Verificar token ao montar o componente
  React.useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');
        setIsLoggedIn(!!token); // true se token existir, false caso contrário
        console.log('Token check:', token ? 'Token encontrado' : 'Sem token');
      } catch (err) {
        console.error('Erro ao verificar token:', err);
        setIsLoggedIn(false);
      } finally {
        setIsChecking(false);
      }
    };
    checkToken();

    // Listener para detectar mudanças no AsyncStorage (logout)
    // Usando um intervalo para verificar a cada 500ms
    const intervalId = setInterval(checkToken, 500);
    return () => clearInterval(intervalId);
  }, []);

  // Se as fontes não carregaram OU ainda está verificando o token, mostre o loading
  if (!fontsLoaded || isChecking) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#348e57" />
      </View>
    );
  }

  // As fontes carregaram e o token foi verificado. Renderize o app.
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer>
        {isLoggedIn ? <MainNavigator /> : <AuthNavigator />}
        {/* --- 4. A LÓGICA DO "PORTEIRO" --- */}
        {/* Se tem token → MainNavigator (Home), caso contrário → AuthNavigator (Login/Register) */}
      </NavigationContainer>
    </>
  );
}

export default App;