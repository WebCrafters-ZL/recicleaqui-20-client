// Arquivo: src/screens/App/Legal/TermsOfUse/styles.ts

import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  /* Fundo dinâmico (Branco ou Preto) */
  background-color: ${(props: any) => props.theme.colors.background};
`;

export const Header = styled.View`
  padding: 20px;
  padding-top: 60px;
  background-color: ${(props: any) => props.theme.colors.primary};
  height: 120px;
  align-items: center;
  justify-content: center;
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
  position: relative;
`;

export const Title = styled.Text`
  font-size: 20px;
  font-family: 'Montserrat-Bold';
  color: ${(props: any) => props.theme.colors.white};
  margin-top: 10px;
`;

export const BackButton = styled.TouchableOpacity`
  position: absolute;
  top: 50px;
  left: 20px;
  z-index: 10;
  padding: 8px;
  background-color: ${(props: any) => props.theme.colors.whiteTransparent};
  border-radius: 12px;
`;

export const Content = styled.ScrollView`
  flex: 1;
  padding: 24px;
`;

export const SectionTitle = styled.Text`
  font-size: 16px;
  font-family: 'Montserrat-Bold';
  /* Texto muda de cor no escuro */
  color: ${(props: any) => props.theme.colors.text};
  margin-top: 20px;
  margin-bottom: 8px;
`;

export const Paragraph = styled.Text`
  font-size: 14px;
  font-family: 'Montserrat-Regular';
  /* Texto secundário adaptável */
  color: ${(props: any) => props.theme.colors.textLight}; 
  line-height: 22px;
  margin-bottom: 10px;
  text-align: justify;
`;