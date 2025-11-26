// Arquivo: src/screens/App/SettingsScreen/SettingsScreen.tsx

import React, { useState } from 'react';
import { Switch, StatusBar } from 'react-native';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Usamos o Hook e o Tema
import { useTheme } from '../../../context/ThemeContext';
import { useTheme as useStyledTheme } from 'styled-components/native';
import * as S from './SettingsScreen.styles';

const SettingsScreen = () => {
  const navigation = useNavigation();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  
  // 1. Pegamos o controle do tema
  const { isDark, toggleTheme } = useTheme();
  
  // 2. Pegamos as cores atuais (para passar para os ícones)
  const theme = useStyledTheme(); 

  return (
    <S.Container>
      <StatusBar 
        barStyle={isDark ? "light-content" : "light-content"} 
        backgroundColor={theme.colors.primary} 
      />
      
      <S.Header>
        <S.MenuButton onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
          <MaterialCommunityIcons name="menu" size={28} color={theme.colors.white} />
        </S.MenuButton>
        <S.Title>Configurações</S.Title>
      </S.Header>

      <S.Content showsVerticalScrollIndicator={false}>
        
        {/* Notificações */}
        <S.SettingItem activeOpacity={1}>
          <MaterialCommunityIcons name="bell-outline" size={24} color={theme.colors.icon} />
          <S.SettingTextContainer>
            <S.SettingTitle>Notificações Push</S.SettingTitle>
            <S.SettingSubtitle>Receber alertas sobre coletas</S.SettingSubtitle>
          </S.SettingTextContainer>
          <Switch 
            value={notificationsEnabled} 
            onValueChange={setNotificationsEnabled}
            trackColor={{ false: '#ddd', true: theme.colors.secondary }}
            thumbColor={notificationsEnabled ? theme.colors.primary : '#f4f3f4'}
          />
        </S.SettingItem>

        {/* MODO ESCURO (AGORA FUNCIONAL) */}
        <S.SettingItem activeOpacity={1}>
          <MaterialCommunityIcons name="theme-light-dark" size={24} color={theme.colors.icon} />
          <S.SettingTextContainer>
            <S.SettingTitle>Modo Escuro</S.SettingTitle>
            <S.SettingSubtitle>{isDark ? 'Ativado' : 'Desativado'}</S.SettingSubtitle>
          </S.SettingTextContainer>
          <Switch 
            value={isDark} 
            onValueChange={toggleTheme} // Chama a função real
            trackColor={{ false: '#ddd', true: theme.colors.secondary }}
            thumbColor={isDark ? theme.colors.primary : '#f4f3f4'}
          />
        </S.SettingItem>

        {/* Links */}
        <S.SettingItem onPress={() => navigation.navigate('TermsOfUse' as never)}>
          <MaterialCommunityIcons name="file-document-outline" size={24} color="#666" />
          <S.SettingTextContainer>
            <S.SettingTitle>Termos de Uso</S.SettingTitle>
          </S.SettingTextContainer>
          <MaterialCommunityIcons name="chevron-right" size={24} color="#ccc" />
        </S.SettingItem>

        <S.SettingItem onPress={() => navigation.navigate('PrivacyPolicy' as never)}>
          <MaterialCommunityIcons name="shield-account-outline" size={24} color="#666" />
          <S.SettingTextContainer>
            <S.SettingTitle>Política de Privacidade</S.SettingTitle>
          </S.SettingTextContainer>
          <MaterialCommunityIcons name="chevron-right" size={24} color="#ccc" />
        </S.SettingItem>

      </S.Content>
    </S.Container>
  );
};

export default SettingsScreen;