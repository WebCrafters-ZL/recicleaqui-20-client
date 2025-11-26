// Arquivo: src/navigation/MainNavigator.tsx

import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
// Importamos o hook para acessar as cores do tema atual
import { useTheme } from 'styled-components/native';

import HomeScreen from '../screens/App/HomeScreen/HomeScreen';
import ProfileScreen from '../screens/App/ProfileScreen/ProfileScreen';
import DisposalScreen from '../screens/App/DisposalScreen/DisposalScreen';
import HistoryScreen from '../screens/App/HistoryScreen/HistoryScreen';
import SettingsScreen from '../screens/App/SettingsScreen/SettingsScreen';
import HelpScreen from '../screens/App/HelpScreen/HelpScreen';
import TermsOfUseScreen from '../screens/App/Legal/TermsOfUse';
import PrivacyPolicyScreen from '../screens/App/Legal/PrivacyPolicyScreen';
import ChangePasswordScreen from '../screens/App/ChangePasswordScreen/ChangePasswordScreen';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props: any) {
  const { signOut } = useAuth();
  const theme = useTheme(); // <-- Acesso às cores dinâmicas (Light/Dark)
  const currentRoute = props.state?.routes[props.state.index]?.name;

  return (
    // Fundo dinâmico (Branco ou Preto)
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>

      <View style={{
        height: 250,
        backgroundColor: theme.colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 40,
        paddingBottom: 10,
        borderBottomRightRadius: 30,
      }}>
        <Image
          source={require('../../assets/images/logo-recicle-aqui.png')}
          style={{ width: 150, height: 150, resizeMode: 'contain', tintColor: theme.colors.white, marginBottom: -20 }}
        />
        <Text style={{ color: theme.colors.white, fontSize: 24, fontFamily: 'Montserrat-Bold', marginTop: 0 }}>
          Recicle Aqui
        </Text>
      </View>

      <DrawerContentScrollView {...props} contentContainerStyle={{ paddingTop: 10 }}>
        <DrawerItemList {...props} />

        {/* Linha divisória dinâmica */}
        <View style={{ height: 1, backgroundColor: theme.colors.border, marginVertical: 10, marginHorizontal: 20 }} />

        <DrawerItem
          label="Configurações"
          icon={({ color }) => <MaterialCommunityIcons name="cog-outline" size={22} color={color} />}
          onPress={() => props.navigation.navigate('Settings')}
          focused={currentRoute === 'Settings'}
          activeTintColor={theme.colors.primary}
          inactiveTintColor={theme.colors.text} // Texto muda cor no dark
          labelStyle={{ fontFamily: 'Montserrat-Bold', marginLeft: -10 }}
        />

        <DrawerItem
          label="Ajuda e Suporte"
          icon={({ color }) => <MaterialCommunityIcons name="help-circle-outline" size={22} color={color} />}
          onPress={() => props.navigation.navigate('Help')}
          focused={currentRoute === 'Help'}
          activeTintColor={theme.colors.primary}
          inactiveTintColor={theme.colors.text}
          labelStyle={{ fontFamily: 'Montserrat-Bold', marginLeft: -10 }}
        />
      </DrawerContentScrollView>

      <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: theme.colors.border, marginBottom: 0 }}>
        <TouchableOpacity onPress={signOut} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
          <MaterialCommunityIcons name="logout" size={22} color={theme.colors.error} />
          <Text style={{ marginLeft: 10, color: theme.colors.error, fontFamily: 'Montserrat-Bold', fontSize: 14 }}>
            Sair da Conta
          </Text>
        </TouchableOpacity>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ color: theme.colors.textLight, fontSize: 12, fontFamily: 'Montserrat-Regular' }}>Versão 1.0.0</Text>
          <Text style={{ color: theme.colors.textLight, fontSize: 10, fontFamily: 'Montserrat-Regular', marginTop: 4 }}>© 2025 RecicleAqui Inc.</Text>
        </View>
      </View>
    </View>
  );
}

const MainNavigator = () => {
  const theme = useTheme();

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: theme.colors.primary,
        drawerInactiveTintColor: theme.colors.text,
        drawerLabelStyle: { fontFamily: 'Montserrat-Bold', marginLeft: -10 },
        drawerStyle: { width: '75%', backgroundColor: theme.colors.background },
        drawerType: 'slide',
      }}
    >
      <Drawer.Screen name="Home" component={HomeScreen} options={{ drawerIcon: ({ color }) => <MaterialCommunityIcons name="home-outline" size={22} color={color} />, drawerLabel: "Início" }} />
      <Drawer.Screen name="Disposal" component={DisposalScreen} options={{ drawerIcon: ({ color }) => <MaterialCommunityIcons name="recycle" size={22} color={color} />, drawerLabel: "Registrar Descarte", swipeEnabled: false }} />
      <Drawer.Screen name="History" component={HistoryScreen} options={{ drawerIcon: ({ color }) => <MaterialCommunityIcons name="history" size={22} color={color} />, drawerLabel: "Histórico" }} />
      <Drawer.Screen name="Profile" component={ProfileScreen} options={{ drawerIcon: ({ color }) => <MaterialCommunityIcons name="account-outline" size={22} color={color} />, drawerLabel: "Meu Perfil" }} />

      <Drawer.Screen name="Settings" component={SettingsScreen} options={{ drawerItemStyle: { display: 'none' } }} />
      <Drawer.Screen name="Help" component={HelpScreen} options={{ drawerItemStyle: { display: 'none' } }} />
      <Drawer.Screen name="TermsOfUse" component={TermsOfUseScreen} options={{ drawerItemStyle: { display: 'none' }, swipeEnabled: false }} />
      <Drawer.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} options={{ drawerItemStyle: { display: 'none' }, swipeEnabled: false }} />
      <Drawer.Screen name="ChangePassword" component={ChangePasswordScreen} options={{ drawerItemStyle: { display: 'none' } }}
      />
    </Drawer.Navigator>
  );
};

export default MainNavigator;