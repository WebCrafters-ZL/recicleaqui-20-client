// Arquivo: src/screens/App/Legal/PrivacyPolicy/index.tsx

import React from 'react';
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from 'styled-components/native';

import * as S from '../TermsOfUse/styles'; 

const PrivacyPolicyScreen = () => {
  const navigation = useNavigation();
  const theme = useTheme(); 

  return (
    <S.Container>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.primary} />
      
      <S.Header>
        <S.BackButton onPress={() => navigation.navigate('Settings' as never)}>
          <MaterialCommunityIcons name="arrow-left" size={24} color={theme.colors.white} />
        </S.BackButton>
        <S.Title>Política de Privacidade</S.Title>
      </S.Header>

      <S.Content showsVerticalScrollIndicator={false}>
        <S.Paragraph>Sua privacidade é importante para o RecicleAqui.</S.Paragraph>

        <S.SectionTitle>1. Coleta de Dados</S.SectionTitle>
        <S.Paragraph>
          Coletamos informações que você nos fornece diretamente, como nome, e-mail, telefone, CPF/CNPJ e endereço completo para viabilizar a logística de coleta.
        </S.Paragraph>

        <S.SectionTitle>2. Uso da Localização</S.SectionTitle>
        <S.Paragraph>
          Utilizamos sua localização para sugerir os Pontos de Coleta mais próximos e para calcular rotas de retirada. Seus dados de localização não são compartilhados com terceiros para fins publicitários.
        </S.Paragraph>

        <S.SectionTitle>3. Compartilhamento de Informações</S.SectionTitle>
        <S.Paragraph>
          Seus dados de contato e endereço são compartilhados APENAS com os coletores parceiros quando você solicita uma "Coleta em Casa", estritamente para a execução do serviço.
        </S.Paragraph>

        <S.SectionTitle>4. Segurança</S.SectionTitle>
        <S.Paragraph>
          Adotamos práticas de segurança adequadas para proteger seus dados contra acesso não autorizado. Suas senhas são criptografadas e não temos acesso a elas.
        </S.Paragraph>

        <S.SectionTitle>5. Exclusão de Conta</S.SectionTitle>
        <S.Paragraph>
          Você pode solicitar a exclusão completa dos seus dados e histórico através da opção "Suporte" ou enviando um e-mail para dpo@recicleaqui.com.
        </S.Paragraph>
        
        <S.SectionTitle></S.SectionTitle>
      </S.Content>
    </S.Container>
  );
};

export default PrivacyPolicyScreen;