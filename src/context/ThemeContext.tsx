// Arquivo: src/context/ThemeContext.tsx

import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeProvider as StyledProvider } from 'styled-components/native';
import { lightTheme, darkTheme } from '../constants/colors';

// --- CORREÇÃO AQUI: Definindo a interface corretamente ---
type ThemeContextData = {
  isDark: boolean;      // Mudamos de 'theme' string para 'isDark' boolean
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextData>({} as ThemeContextData);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    async function loadTheme() {
      const savedTheme = await AsyncStorage.getItem('theme');
      if (savedTheme === 'dark') {
        setIsDark(true);
      }
    }
    loadTheme();
  }, []);

  const toggleTheme = async () => {
    const newStatus = !isDark;
    setIsDark(newStatus);
    await AsyncStorage.setItem('theme', newStatus ? 'dark' : 'light');
  };

  const theme = isDark ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <StyledProvider theme={theme}>
        {children}
      </StyledProvider>
    </ThemeContext.Provider>
  );
};

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme deve ser usado dentro de um ThemeProvider');
  return context;
}