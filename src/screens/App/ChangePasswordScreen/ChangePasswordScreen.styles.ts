// Arquivo: src/screens/App/ChangePasswordScreen/ChangePasswordScreen.styles.ts

import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${(props: any) => props.theme.colors.background};
`;

export const Header = styled.View`
  padding: 20px;
  padding-top: 60px;
  background-color: ${(props: any) => props.theme.colors.primary};
  height: 140px;
  justify-content: center;
  align-items: center;
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
  position: relative;
  z-index: 10;
`;

export const Title = styled.Text`
  font-size: 22px;
  font-family: 'Montserrat-Bold';
  color: ${(props: any) => props.theme.colors.white};
  margin-top: 20px;
`;

export const BackButton = styled.TouchableOpacity`
  position: absolute;
  top: 60px;
  left: 20px;
  z-index: 10;
  padding: 8px;
  background-color: ${(props: any) => props.theme.colors.whiteTransparent};
  border-radius: 12px;
`;

export const Content = styled.ScrollView`
  flex: 1;
  padding: 20px;
`;

export const FormCard = styled.View`
  background-color: ${(props: any) => props.theme.colors.surface};
  border-radius: 20px;
  padding: 20px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.05;
  shadow-radius: 8px;
  elevation: 3;
`;

export const Description = styled.Text`
  font-size: 14px;
  font-family: 'Montserrat-Regular';
  color: ${(props: any) => props.theme.colors.textLight};
  margin-bottom: 20px;
  text-align: center;
`;

// --- BARRA DE FORÇA (Trazida do Perfil) ---
export const StrengthContainer = styled.View`
  margin-top: 5px;
  margin-bottom: 15px;
`;

export const StrengthBarContainer = styled.View`
  flex-direction: row;
  height: 4px;
  width: 100%;
  background-color: ${(props: any) => props.theme.colors.border};
  border-radius: 2px;
  overflow: hidden;
`;

interface StrengthProps {
  width: string;
  color: string;
}

export const StrengthBarFill = styled.View<StrengthProps>`
  height: 100%;
  width: ${(props: StrengthProps) => props.width};
  background-color: ${(props: StrengthProps) => props.color};
`;

export const StrengthLabel = styled.Text<{ color: string }>`
  font-size: 11px;
  color: ${(props: { color: any; }) => props.color};
  margin-top: 4px;
  font-family: 'Montserrat-Bold';
  text-align: right;
`;

export const HelperText = styled.Text`
  font-size: 11px;
  color: ${(props: any) => props.theme.colors.textLight};
  margin-top: -5px;
  margin-bottom: 10px;
  margin-left: 5px;
  font-family: 'Montserrat-Regular';
`;