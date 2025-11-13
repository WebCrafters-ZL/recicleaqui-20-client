// Arquivo: src/screens/App/HomeScreen/HomeScreen.styles.ts
import styled from 'styled-components/native';
import { PRIMARY_COLOR } from '../Auth/LoginScreen/LoginScreen.styles';

export const Container = styled.View`
  flex: 1;
  background-color: #f5f7fa;
  flex-direction: column;
`;

// ============= HEADER =============
export const Header = styled.View`
  background-color: ${PRIMARY_COLOR};
  padding-top: 12px;
  padding-bottom: 14px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 5;
  z-index: 10;
`;

export const HeaderTop = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
`;

export const HeaderTitle = styled.Text`
  font-size: 17px;
  font-family: 'Montserrat-Bold';
  color: white;
  flex: 1;
  text-align: center;
  margin: 0 8px;
`;

// ============= SCROLL CONTENT =============
export const ScrollContent = styled.ScrollView`
  flex: 1;
`;

// ============= WELCOME SECTION =============
export const WelcomeSection = styled.View`
  padding: 24px 16px 16px;
  background-color: white;
  margin-bottom: 12px;
`;

export const WelcomeTitle = styled.Text`
  font-size: 22px;
  font-family: 'Montserrat-Bold';
  color: #1a1a1a;
  margin-bottom: 4px;
`;

export const WelcomeSubtitle = styled.Text`
  font-size: 14px;
  font-family: 'Montserrat-Regular';
  color: #666;
`;

// ============= PROFILE CARD =============
export const ProfileCard = styled.View`
  margin: 0 16px 12px;
  background-color: white;
  border-radius: 12px;
  padding: 16px;
  shadow-color: #000;
  shadow-offset: 0px 1px;
  shadow-opacity: 0.08;
  shadow-radius: 3px;
  elevation: 2;
`;

export const ProfileHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

export const ProfileTitle = styled.Text`
  font-size: 15px;
  font-family: 'Montserrat-Bold';
  color: ${PRIMARY_COLOR};
`;

export const EditButton = styled.TouchableOpacity`
  padding: 6px 12px;
  background-color: #f0f0f0;
  border-radius: 6px;
`;

export const EditButtonText = styled.Text`
  font-size: 12px;
  font-family: 'Montserrat-Bold';
  color: ${PRIMARY_COLOR};
`;

export const LogoutButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 6px 10px;
  background-color: #fff;
  border-radius: 8px;
  border-width: 1px;
  border-color: #f2f2f2;
`;

export const LogoutLabel = styled.Text`
  font-size: 13px;
  font-family: 'Montserrat-Bold';
  color: #E74C3C;
  margin-left: 8px;
`;

export const HeaderIconButton = styled.TouchableOpacity`
  padding: 6px;
  margin-left: 8px;
  border-radius: 8px;
  background-color: rgba(255,255,255,0.08);
`;

export const ProfileInfo = styled.View`
  margin-bottom: 8px;
`;

export const ProfileInfoLabel = styled.Text`
  font-size: 11px;
  font-family: 'Montserrat-Regular';
  color: #999;
  margin-bottom: 2px;
`;

export const ProfileInfoValue = styled.Text`
  font-size: 13px;
  font-family: 'Montserrat-Bold';
  color: #333;
`;

// ============= ACTION BUTTONS =============
export const ActionButtonsContainer = styled.View`
  margin: 0 16px 20px;
  gap: 10px;
`;

export const ActionButton = styled.TouchableOpacity<{ variant?: string }>`
  background-color: ${(props: any) => props.variant === 'danger' ? '#dc3545' : PRIMARY_COLOR};
  padding: 14px 16px;
  border-radius: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  shadow-color: #000;
  shadow-offset: 0px 1px;
  shadow-opacity: 0.08;
  shadow-radius: 3px;
  elevation: 2;
`;

export const ActionButtonText = styled.Text`
  font-size: 14px;
  font-family: 'Montserrat-Bold';
  color: white;
  margin-left: 8px;
`;

// ============= BOTTOM NAVIGATION =============
export const BottomNav = styled.View`
  background-color: white;
  flex-direction: row;
  border-top-width: 1px;
  border-top-color: #e8e8e8;
  shadow-color: #000;
  shadow-offset: 0px -4px;
  shadow-opacity: 0.12;
  shadow-radius: 6px;
  elevation: 12;
  z-index: 100;
`;

export const BottomNavLabel = styled.Text`
  font-size: 11px;
  font-family: 'Montserrat-Bold';
  color: ${PRIMARY_COLOR};
  margin-top: 3px;
  letter-spacing: 0.3px;
`;