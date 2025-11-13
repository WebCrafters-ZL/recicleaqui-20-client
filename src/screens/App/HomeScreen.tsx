// Arquivo: src/screens/App/HomeScreen/HomeScreen.tsx
import React from 'react';
import { Alert, TouchableOpacity, ScrollView, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as S from './HomeScreen.styles';

const HomeScreen = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [userName, setUserName] = React.useState('Carregando...');
  const [userEmail, setUserEmail] = React.useState('Carregando...');
  const [userPhone, setUserPhone] = React.useState('Carregando...');
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      const userId = await AsyncStorage.getItem('userId');
      if (!token || !userId) {
        Alert.alert('Erro', 'Token ou userId não encontrado');
        return;
      }

      const BASE_URL = 'https://berta-journalish-outlandishly.ngrok-free.dev';
      const response = await fetch(`${BASE_URL}/api/v1/clients/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Erro ${response.status} ao buscar dados do usuário`);
      }

      const data = await response.json();
      setUserName(data.name || `${data.firstName || ''} ${data.lastName || ''}`.trim() || 'Usuário');
      setUserEmail(data.email || 'Email não disponível');
      setUserPhone(formatPhone(data.phone) || 'Telefone não disponível');
    } catch (err) {
      console.error('Erro ao buscar dados do usuário:', err);
      Alert.alert('Erro', 'Falha ao carregar dados do perfil');
      // Valores padrão em caso de erro
      setUserName('Usuário');
      setUserEmail('Email não disponível');
      setUserPhone('Telefone não disponível');
    } finally {
      setIsLoading(false);
    }
  };

  // Formata número de telefone para (xx) xxxxx-xxxx ou (xx) xxxx-xxxx
  function onlyDigits(value?: string) {
    if (!value) return '';
    return value.replace(/\D/g, '');
  }

  function formatPhone(value?: string) {
    if (!value) return '';
    const digits = onlyDigits(value);
    if (!digits) return '';
    // remover código do país se começar com 55 (Brasil)
    let d = digits;
    if (d.length > 11 && d.startsWith('55')) {
      d = d.slice(2);
    }
    if (d.length === 11) {
      // (12) 91234-5678
      return `(${d.slice(0,2)}) ${d.slice(2,7)}-${d.slice(7)}`;
    }
    if (d.length === 10) {
      // (12) 1234-5678
      return `(${d.slice(0,2)}) ${d.slice(2,6)}-${d.slice(6)}`;
    }
    // fallback: format in groups
    if (d.length > 6) return `${d.slice(0, d.length-8)} ${d.slice(-8,-4)}-${d.slice(-4)}`;
    return value;
  }

  const menuItems = [
    { label: 'Home', icon: 'home' },
    { label: 'Pontos', icon: 'map-marker' },
  ];

  const handleLogout = async () => {
    Alert.alert(
      'Sair',
      'Tem certeza que deseja fazer logout?',
      [
        { text: 'Cancelar', onPress: () => {}, style: 'cancel' },
        {
          text: 'Sair',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('authToken');
              Alert.alert('Sucesso', 'Logout realizado com sucesso!');
              navigation.reset({
                index: 0,
                routes: [{ name: 'Login' as never }],
              });
            } catch (err) {
              Alert.alert('Erro', 'Falha ao fazer logout.');
              console.error('Logout error:', err);
            }
          },
          style: 'destructive',
        },
      ]
    );
  };

  const handleEditProfile = () => {
    Alert.alert('Editar Perfil', 'Funcionalidade de edição em desenvolvimento');
  };

  const handleSearchCollectionCompanies = () => {
    Alert.alert('Pesquisar Empresas', 'Funcionalidade de busca em desenvolvimento');
  };

  return (
    <S.Container>
      {/* Header */}
      <S.Header style={{ paddingTop: insets.top + 8 }}>
        <S.HeaderTop>
          <View style={{ width: 24 }} />
          <S.HeaderTitle>Dashboard</S.HeaderTitle>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity onPress={handleEditProfile} style={{ marginRight: 8 }}>
              <MaterialCommunityIcons name="account-circle" size={28} color="white" />
            </TouchableOpacity>
            <S.HeaderIconButton onPress={handleLogout} activeOpacity={0.7}>
              <MaterialCommunityIcons name="logout" size={20} color="white" />
            </S.HeaderIconButton>
          </View>
        </S.HeaderTop>
      </S.Header>

      {/* Main Content - ScrollView */}
      <ScrollView 
        style={{ flex: 1 }}
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
      >
        {/* Welcome Section */}
        <S.WelcomeSection>
          <S.WelcomeTitle>Bem-vindo, {userName}!</S.WelcomeTitle>
          <S.WelcomeSubtitle>Gerencie seu descarte de eletrônicos</S.WelcomeSubtitle>
        </S.WelcomeSection>

        {/* Profile Card */}
        <S.ProfileCard>
          <S.ProfileHeader>
            <S.ProfileTitle>Perfil</S.ProfileTitle>
          </S.ProfileHeader>

          <S.ProfileInfo>
            <S.ProfileInfoLabel>Nome</S.ProfileInfoLabel>
            <S.ProfileInfoValue>{userName}</S.ProfileInfoValue>
          </S.ProfileInfo>

          <S.ProfileInfo>
            <S.ProfileInfoLabel>Email</S.ProfileInfoLabel>
            <S.ProfileInfoValue>{userEmail}</S.ProfileInfoValue>
          </S.ProfileInfo>

          <S.ProfileInfo>
            <S.ProfileInfoLabel>Telefone</S.ProfileInfoLabel>
            <S.ProfileInfoValue>{userPhone}</S.ProfileInfoValue>
          </S.ProfileInfo>
        </S.ProfileCard>

        {/* Action Buttons */}
        <S.ActionButtonsContainer>
          <S.ActionButton onPress={handleSearchCollectionCompanies}>
            <MaterialCommunityIcons name="map-search" size={20} color="white" />
            <S.ActionButtonText>Pesquisar Empresas de Coleta</S.ActionButtonText>
          </S.ActionButton>

          {/* botão de logout removido daqui - agora está no header */}
        </S.ActionButtonsContainer>

        {/* Spacing */}
        <View style={{ height: 20 }} />
      </ScrollView>

      {/* Bottom Navigation */}
      <S.BottomNav style={{ paddingBottom: insets.bottom }}>
        {menuItems.map((item, index) => (
          <TouchableOpacity 
            key={index} 
            style={{ 
              flex: 1, 
              alignItems: 'center', 
              justifyContent: 'center',
              paddingVertical: 8
            }}
          >
            <MaterialCommunityIcons 
              name={item.icon as any} 
              size={26} 
              color="#348e57" 
            />
            <S.BottomNavLabel>{item.label}</S.BottomNavLabel>
          </TouchableOpacity>
        ))}
      </S.BottomNav>
    </S.Container>
  );
};

export default HomeScreen;