// Arquivo: src/components/Button/Button.tsx

import React from 'react';
import styled from 'styled-components/native';
import { ActivityIndicator } from 'react-native';
import type { TouchableOpacityProps } from 'react-native';

type ButtonProps = {
  title: string;
  onPress: () => void;
  isLoading?: boolean;
  disabled?: boolean;
};

interface ButtonContainerProps extends TouchableOpacityProps {
  disabled?: boolean;
}

const ButtonContainer = styled.TouchableOpacity<ButtonContainerProps>`
  background-color: ${(props: ButtonContainerProps) => (props.disabled ? '#cccccc' : '#348e57')};
  padding: 15px 30px;
  border-radius: 50px;
  align-items: center;
  justify-content: center;
  width: 100%;
  elevation: 3;
  
  shadow-color: #000;
  shadow-offset: 0px 2px; 
  shadow-opacity: 0.25;
  shadow-radius: 3.84px;

  opacity: ${(props: ButtonContainerProps) => (props.disabled ? 0.6 : 1)};
`;

const ButtonText = styled.Text`
  color: #FFFFFF;
  font-size: 16px;
  font-weight: bold;
  text-transform: uppercase;
`;

const Button = ({ title, onPress, isLoading = false, disabled = false }: ButtonProps) => {
  return (
    <ButtonContainer onPress={!disabled && !isLoading ? onPress : undefined} disabled={disabled || isLoading}>
      {isLoading ? (
        <ActivityIndicator size="small" color="#FFFFFF" />
      ) : (
        <ButtonText>{title}</ButtonText>
      )}
    </ButtonContainer>
  );
};

export default Button;