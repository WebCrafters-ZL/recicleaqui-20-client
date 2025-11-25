// Arquivo: src/screens/App/ProfileScreen/ProfileScreen.tsx

import React, { useState, useEffect } from 'react';
import { Alert, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useAuth } from '../../../context/AuthContext';
import { Button, TextInput } from '../../../components';
import { ClientProfileResponse } from '../../../types/Client';
import { COLORS } from '../../../constants/colors';
import * as S from './ProfileScreen.styles';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const { signOut } = useAuth();
  
  const [permissionStatus, requestPermission] = ImagePicker.useMediaLibraryPermissions();
  
  // --- ESTADOS DO PERFIL ---
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [cpf, setCpf] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [avatarUri, setAvatarUri] = useState<string | null>(null);

  // --- ESTADOS DO ENDEREÇO ---
  const [postalCode, setPostalCode] = useState('');
  const [addressName, setAddressName] = useState(''); 
  const [number, setNumber] = useState('');
  const [neighborhood, setNeighborhood] = useState(''); 
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [complement, setComplement] = useState('');

  // --- ESTADOS DE SEGURANÇA ---
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);

  const [isProfileLoading, setIsProfileLoading] = useState(false);
  const [isPasswordLoading, setIsPasswordLoading] = useState(false);

  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  // Lógica de Força de Senha (reutilizada do Register)
  useEffect(() => {
    const checkStrength = (pass: string) => {
      if (!pass) return 0;
      const hasLength = pass.length >= 8;
      const hasUpper = /[A-Z]/.test(pass);
      const hasNumber = /[0-9]/.test(pass);
      const hasSpecial = /[^A-Za-z0-9]/.test(pass);

      if (!hasLength || !hasUpper || !hasNumber) return 1; // Fraca
      let score = 2;
      if (hasSpecial) score += 1;
      if (pass.length > 10 && hasSpecial) score += 1;
      return score;
    };
    setPasswordStrength(checkStrength(newPassword));
  }, [newPassword]);

  const getStrengthColor = () => {
    if (passwordStrength <= 1) return '#ff4444';
    if (passwordStrength === 2) return '#ffbb33';
    if (passwordStrength === 3) return '#00C851';
    return '#007E33';
  };

  const getStrengthLabel = () => {
    if (passwordStrength === 0) return '';
    if (passwordStrength <= 1) return 'Fraca';
    if (passwordStrength === 2) return 'Média';
    if (passwordStrength === 3) return 'Forte';
    return 'Muito Forte';
  };

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (!token) return;

      const BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'https://berta-journalish-outlandishly.ngrok-free.dev/api/v1';

      const response = await fetch(`${BASE_URL}/clients/me`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        if (response.status === 404) return; // Usuário novo
        throw new Error(`Erro ${response.status}`);
      }

      const data: ClientProfileResponse = await response.json();
      fillData(data);

    } catch (error) {
      console.error("Erro ao carregar perfil:", error);
    }
  };

  const fillData = (data: ClientProfileResponse) => {
    if (data.user) setEmail(data.user.email);
    if (data.phone) setPhone(data.phone);
    if (data.avatarUrl) setAvatarUri(data.avatarUrl);

    if (data.type === 'individual' && data.individual) {
      setFirstName(data.individual.firstName);
      setLastName(data.individual.lastName);
      setCpf(data.individual.cpf);
    }

    if (data.address) {
      setPostalCode(data.address.postalCode);
      setAddressName(data.address.addressName);
      setNumber(data.address.number);
      setNeighborhood(data.address.neighborhood);
      setCity(data.address.city);
      setState(data.address.state);
      setComplement(data.address.additionalInfo || '');
    }
  };

  const handlePickImage = async () => {
    if (!permissionStatus) return;
    if (permissionStatus.status !== ImagePicker.PermissionStatus.GRANTED) {
      const newPermission = await requestPermission();
      if (newPermission.status !== ImagePicker.PermissionStatus.GRANTED) {
        Alert.alert("Permissão Negada", "Precisamos de acesso à galeria.");
        return;
      }
    }

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });
      if (!result.canceled) {
        setAvatarUri(result.assets[0].uri);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSaveProfile = async () => {
    setIsProfileLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      // Aqui entra a chamada PUT /clients/:id
      Alert.alert("Sucesso", "Dados atualizados com sucesso!");
    } catch (error) {
      Alert.alert("Erro", "Não foi possível atualizar o perfil.");
    } finally {
      setIsProfileLoading(false);
    }
  };

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      Alert.alert("Atenção", "Preencha todos os campos de senha.");
      return;
    }

    // Validação baseada na força
    if (passwordStrength < 2) {
       Alert.alert("Senha Fraca", "A nova senha deve ter no mínimo 8 caracteres, uma letra maiúscula e um número.");
       return;
    }

    if (newPassword !== confirmNewPassword) {
      Alert.alert("Erro", "As senhas não conferem.");
      return;
    }

    setIsPasswordLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      // Aqui entra POST /auth/change-password
      Alert.alert("Sucesso", "Senha alterada com sucesso!");
      setCurrentPassword(''); setNewPassword(''); setConfirmNewPassword('');
    } catch (error) {
      Alert.alert("Erro", "Falha ao alterar senha.");
    } finally {
      setIsPasswordLoading(false);
    }
  };

  const handleLogout = () => {
    Alert.alert("Sair", "Deseja realmente sair?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Sair", onPress: signOut, style: "destructive" }
    ]);
  };

  return (
    <S.Container>
      <S.BackButton onPress={() => navigation.goBack()}>
        <MaterialCommunityIcons name="arrow-left" size={24} color={COLORS.white} />
      </S.BackButton>

      <S.HeaderBackground>
        <S.HeaderTitle>Meu Perfil</S.HeaderTitle>
      </S.HeaderBackground>

      <S.ContentContainer showsVerticalScrollIndicator={false}>
        
        <S.AvatarWrapper>
          <S.AvatarImage 
            source={avatarUri ? { uri: avatarUri } : require('../../../../assets/images/avatar.png')} 
          />
          <S.EditIconContainer onPress={handlePickImage} activeOpacity={0.8}>
            <MaterialCommunityIcons name="camera" size={20} color={COLORS.white} />
          </S.EditIconContainer>
        </S.AvatarWrapper>

        {/* DADOS PESSOAIS */}
        <S.FormCard>
          <S.SectionTitle>Dados Pessoais</S.SectionTitle>
          <TextInput placeholder="Nome" value={firstName} onChangeText={setFirstName} rightIcon={<MaterialCommunityIcons name="account-outline" size={20} color={COLORS.gray} />} />
          <TextInput placeholder="Sobrenome" value={lastName} onChangeText={setLastName} />
          <TextInput placeholder="CPF" value={cpf} editable={false} style={{ opacity: 0.6, backgroundColor: '#f0f0f0' }} rightIcon={<MaterialCommunityIcons name="card-account-details-outline" size={20} color={COLORS.gray} />} />
          <TextInput placeholder="E-mail" value={email} editable={false} style={{ opacity: 0.6, backgroundColor: '#f0f0f0' }} rightIcon={<MaterialCommunityIcons name="email-outline" size={20} color={COLORS.gray} />} />
          <TextInput placeholder="Telefone" value={phone} onChangeText={setPhone} keyboardType="phone-pad" rightIcon={<MaterialCommunityIcons name="phone-outline" size={20} color={COLORS.gray} />} />
        </S.FormCard>

        {/* ENDEREÇO */}
        <S.FormCard>
          <S.SectionTitle>Endereço de Coleta</S.SectionTitle>
          <TextInput placeholder="CEP" value={postalCode} onChangeText={setPostalCode} keyboardType="numeric" rightIcon={<MaterialCommunityIcons name="map-marker-radius-outline" size={20} color={COLORS.gray} />} />
          <S.Row>
            <S.Col flex={3}><TextInput placeholder="Rua" value={addressName} onChangeText={setAddressName} /></S.Col>
            <S.Col flex={1}><TextInput placeholder="Nº" value={number} onChangeText={setNumber} /></S.Col>
          </S.Row>
          <TextInput placeholder="Bairro" value={neighborhood} onChangeText={setNeighborhood} />
          <TextInput placeholder="Complemento" value={complement} onChangeText={setComplement} />
          <S.Row>
            <S.Col flex={3}><TextInput placeholder="Cidade" value={city} onChangeText={setCity} /></S.Col>
            <S.Col flex={1}><TextInput placeholder="UF" value={state} onChangeText={setState} maxLength={2} autoCapitalize="characters" /></S.Col>
          </S.Row>
          <View style={{ marginTop: 15 }}>
            <Button title="SALVAR DADOS" onPress={handleSaveProfile} isLoading={isProfileLoading} />
          </View>
        </S.FormCard>

        {/* SEGURANÇA */}
        <S.FormCard>
          <S.SectionTitle>Alterar Senha</S.SectionTitle>
          
          <TextInput 
            placeholder="Senha Atual" value={currentPassword} onChangeText={setCurrentPassword} secureTextEntry={!showCurrentPass}
            rightIcon={<MaterialCommunityIcons name={showCurrentPass ? "eye-off" : "eye"} size={20} color={COLORS.gray} />}
            onRightPress={() => setShowCurrentPass(!showCurrentPass)}
          />

          <S.HelperText>Mínimo 8 caracteres, 1 maiúscula e 1 número.</S.HelperText>
          
          <TextInput 
            placeholder="Nova Senha" value={newPassword} onChangeText={setNewPassword} secureTextEntry={!showNewPass}
            rightIcon={<MaterialCommunityIcons name={showNewPass ? "eye-off" : "eye"} size={20} color={COLORS.gray} />}
            onRightPress={() => setShowNewPass(!showNewPass)}
          />

          {/* Barra de Força */}
          {newPassword.length > 0 && (
              <S.StrengthContainer>
                <S.StrengthBarContainer>
                  <S.StrengthBarFill width={`${(passwordStrength / 4) * 100}%`} color={getStrengthColor()} />
                </S.StrengthBarContainer>
                <S.StrengthLabel color={getStrengthColor()}>{getStrengthLabel()}</S.StrengthLabel>
              </S.StrengthContainer>
          )}

          <TextInput 
            placeholder="Confirmar Nova" value={confirmNewPassword} onChangeText={setConfirmNewPassword} secureTextEntry={!showConfirmPass}
            rightIcon={<MaterialCommunityIcons name={showConfirmPass ? "eye-off" : "eye"} size={20} color={COLORS.gray} />}
            onRightPress={() => setShowConfirmPass(!showConfirmPass)}
          />

          <View style={{ marginTop: 15 }}>
            <Button title="ATUALIZAR SENHA" onPress={handleChangePassword} isLoading={isPasswordLoading} />
          </View>
        </S.FormCard>

        <S.LogoutButton onPress={handleLogout}>
          <MaterialCommunityIcons name="logout" size={20} color={COLORS.error} />
          <S.LogoutText>Sair da Conta</S.LogoutText>
        </S.LogoutButton>

        <View style={{ height: 20 }} />
      </S.ContentContainer>
    </S.Container>
  );
};

export default ProfileScreen;