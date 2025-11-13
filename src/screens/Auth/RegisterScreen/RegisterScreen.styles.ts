// src/screens/Auth/RegisterScreen/RegisterScreen.styles.ts
import styled from 'styled-components/native';
import { PRIMARY_COLOR } from '../LoginScreen/LoginScreen.styles';

export const SafeContainer = styled.SafeAreaView`
  flex: 1;
  background-color: #fff;
`;

export const Header = styled.View`
  padding: 15px 20px;
  flex-direction: row;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-color: #eee;
`;

export const BackButton = styled.TouchableOpacity`
  margin-right: 20px;
`;

export const HeaderTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${PRIMARY_COLOR};
  font-family: 'Montserrat-Bold';
`;

export const FormContainer = styled.View`
  flex: 1;
  padding: 20px;
`;

export const StepTitle = styled.Text`
  font-size: 22px;
  font-family: 'Montserrat-Bold';
  color: #333;
  margin-bottom: 30px;
`;

export const StepsContainer = styled.View`
  margin-bottom: 18px;
`;

export const ProgressBackground = styled.View`
  width: 100%;
  height: 8px;
  background-color: #eee;
  border-radius: 8px;
  overflow: hidden;
`;

export const ProgressFill = styled.View`
  height: 100%;
  background-color: ${PRIMARY_COLOR};
  border-radius: 8px;
`;