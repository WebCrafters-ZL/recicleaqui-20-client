// Arquivo: src/components/GamificationCard/index.tsx

import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// --- Interfaces ---
interface BadgeProps {
  color: string;
}

interface ProgressBarFillProps {
  width: string;
}

// --- Estilos Locais ---
const CardContainer = styled.View`
  margin: 20px 20px 20px;
  background-color: ${(props: any) => props.theme.colors.surface};
  border-radius: 26px;
  padding: 16px 24px;
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.1;
  shadow-radius: 12px;
  elevation: 8; /* Sombra alta para ficar acima do header */
  z-index: 10;
`;

const BadgesRow = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 12px;
`;

const BadgeContainer = styled.View<BadgeProps>`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background-color: ${(props: any) => props.color};
  justify-content: center;
  align-items: center;
  border-width: 3px;
  border-color: ${(props: any) => props.theme.colors.surface};
  
  shadow-color: ${(props: any) => props.color};
  shadow-offset: 0px 4px;
  shadow-opacity: 0.3;
  shadow-radius: 4px;
  elevation: 5;
`;

const FeedbackBubble = styled.View`
  background-color: ${(props: any) => props.theme.mode === 'dark' ? props.theme.colors.background : '#FFF8E1'};
  padding: 6px 12px;
  border-radius: 16px;
  align-self: center;
  margin-bottom: 12px;
  border-width: 1px;
  border-color: ${(props: any) => props.theme.mode === 'dark' ? props.theme.colors.border : '#FFE082'};
`;

const FeedbackText = styled.Text`
  color: #FF8F00;
  font-family: 'Montserrat-Bold';
  font-size: 12px;
`;

const ProgressBarContainer = styled.View`
  height: 18px;
  background-color: ${(props: any) => props.theme.colors.border}; 
  border-radius: 10px;
  margin-bottom: 6px;
  overflow: hidden;
`;

const ProgressBarFill = styled.View<ProgressBarFillProps>`
  height: 100%;
  width: ${(props: any) => props.width};
  background-color: #26A69A;
  border-radius: 10px;
`;

const ProgressTextRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
`;

const LevelText = styled.Text`
  font-size: 26px;
  font-family: 'Montserrat-Bold';
  /* Texto muda de cor no dark */
  color: ${(props: any) => props.theme.colors.text};
`;

const XpText = styled.Text`
  font-size: 13px;
  font-family: 'Montserrat-Regular';
  color: ${(props: any) => props.theme.colors.textLight};
`;

// --- Componente ---
interface Props {
  level: number;
  currentXp: number;
  nextXp: number;
}

export const GamificationCard = ({ level, currentXp, nextXp }: Props) => {
  const progressPercent = `${(currentXp / nextXp) * 100}%`;

  return (
    <CardContainer>
      <BadgesRow>
        <BadgeContainer color="#FFD54F">
          <MaterialCommunityIcons name="star" size={24} color="white" />
        </BadgeContainer>
        <BadgeContainer color="#4DB6AC">
           <MaterialCommunityIcons name="shield-check" size={26} color="white" />
        </BadgeContainer>
        <BadgeContainer color="#FF8A65">
           <MaterialCommunityIcons name="medal" size={24} color="white" />
        </BadgeContainer>
      </BadgesRow>

      <FeedbackBubble>
        <FeedbackText>✨ Ótimo progresso! Continue assim.</FeedbackText>
      </FeedbackBubble>

      <View>
        <ProgressTextRow>
          <LevelText>{level}</LevelText>
          <XpText>{currentXp} / {nextXp} XP</XpText>
        </ProgressTextRow>
        
        <ProgressBarContainer>
          <ProgressBarFill width={progressPercent} />
        </ProgressBarContainer>
        
        <XpText style={{ fontSize: 11, textAlign: 'right' }}>
          Faltam {nextXp - currentXp} XP para o nível {level + 1}
        </XpText>
      </View>
    </CardContainer>
  );
};