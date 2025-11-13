// Arquivo: src/screens/Auth/LoginScreen/LoginScreen.tsx
// (Este arquivo foi limpo de todos os caracteres de espaço em branco ilegais)

import React, { useState } from 'react';
import { StatusBar, TouchableOpacity, View, Alert } from 'react-native';
import { Path } from 'react-native-svg';

// Importação correta do @expo/vector-icons
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage'; 

import { Button, TextInput } from '../../../components'; 
import { NativeStackScreenProps } from '@react-navigation/native-stack';
type Props = NativeStackScreenProps<any, 'Login'>;

import * as S from './LoginScreen.styles';

const LoginScreen = ({ navigation }: Props) => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(false); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  
  const validateForm = () => {
    let isValid = true;
    
    if (!email.includes('@') || email.length < 5) {
      setEmailError('Email inválido');
      isValid = false;
    } else {
      setEmailError('');
    }
    
    if (password.length < 6) {
      setPasswordError('Mínimo 6 caracteres');
      isValid = false;
    } else {
      setPasswordError('');
    }
    
    return isValid;
  };
  
  const handleLogin = async () => {
    if (!validateForm()) return;
    
    setIsLoading(true);
    try {
      const BASE_URL = 'https://berta-journalish-outlandishly.ngrok-free.dev';
      const res = await fetch(`${BASE_URL}/api/v1/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        let data = null;
        try { data = await res.json(); } catch (e) { /* ignore */ }
        const message = data?.message || data?.error || `Erro ${res.status}`;
        Alert.alert('Erro de Login', message);
        console.error('Login falhou:', res.status, data);
        return;
      }

      const result = await res.json();
      const token = result?.token;
      const user = result?.user;
      
      if (token) {
        // armazenar token no AsyncStorage
        await AsyncStorage.setItem('authToken', token);
        // armazenar userId (se disponível) para uso posterior
        if (user && user.id) {
          await AsyncStorage.setItem('userId', String(user.id));
        }
        console.log('Login OK, token salvo:', token, 'userId:', user?.id);
        
        // redirecionar para Home
        Alert.alert('Sucesso', 'Login realizado com sucesso!');
        navigation.navigate('Home');
      } else {
        Alert.alert('Erro', 'Token não retornado pelo servidor.');
      }
    } catch (err) {
      console.error(err);
      Alert.alert('Erro', 'Falha ao fazer login. Verifique conexão com a API.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleNavigateToRegister = () => {
    navigation.navigate('Register'); 
  };

  return (
    <S.ScreenContainer>
      <StatusBar barStyle="light-content" backgroundColor={S.PRIMARY_COLOR} />
      
      <S.HeaderContainer>
        <S.HeaderTextContainer>
          <S.Title>Recicle Aqui</S.Title>
          <S.Subtitle>Descarte de lixo eletrônico inteligente</S.Subtitle>
        </S.HeaderTextContainer>
        <S.StyledSvg
          height="80"
          width={S.width}
          viewBox={`0 0 ${S.width} 80`}
        >
          <Path
            fill="#fff"
            d={`M0,80 Q${S.width / 2},0 ${S.width},80 Z`}
          />
        </S.StyledSvg>
      </S.HeaderContainer>

      <S.FormContainer>
        <S.LogoImage source={require('../../../../assets/images/logo-recicle-aqui.png')} />
        
        <View style={{ marginTop: 80, width: '100%' }}>
          <TextInput
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
            error={emailError}
          >
            <Icon name="email-outline" size={22} color="#888" />
          </TextInput>

          <TextInput
            placeholder="Senha"
            secureTextEntry={!isPasswordVisible}
            value={password}
            onChangeText={setPassword}
            error={passwordError}
            rightIcon={<Icon name={isPasswordVisible ? 'eye-off' : 'eye'} size={24} color="#888" />}
            onRightPress={() => setPasswordVisible(prev => !prev)}
          />
          
          <S.OptionsContainer>
            <S.CheckboxContainer onPress={() => setRememberMe(prev => !prev)}>
              <Icon 
                name={rememberMe ? 'toggle-switch' : 'toggle-switch-off-outline'} 
                size={30} 
                color={S.PRIMARY_COLOR} 
              />
              <S.CheckboxLabel>Manter-me conectado</S.CheckboxLabel>
            </S.CheckboxContainer>
            <S.ForgotPasswordButton onPress={() => alert('Navegar para Esqueci a Senha!')}>
              <S.ForgotPasswordText>Esqueci a senha</S.ForgotPasswordText>
            </S.ForgotPasswordButton>
          </S.OptionsContainer>

          <Button title="Entrar" onPress={handleLogin} isLoading={isLoading} />
        </View>
        
        <S.RegisterContainer>
          <S.RegisterText>Não tem uma conta?</S.RegisterText>
          <TouchableOpacity onPress={handleNavigateToRegister}>
            <S.RegisterLink>Cadastre-se</S.RegisterLink>
          </TouchableOpacity>
        </S.RegisterContainer>
        
      </S.FormContainer>
    </S.ScreenContainer>
  );
};

export default LoginScreen;