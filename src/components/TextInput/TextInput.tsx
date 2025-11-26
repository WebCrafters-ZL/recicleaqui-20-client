// Arquivo: src/components/TextInput/TextInput.tsx

import React from 'react';
import { TextInputProps as RNTextInputProps, View, TouchableOpacity } from 'react-native'; 
import styled, { useTheme } from 'styled-components/native';

type TextInputProps = RNTextInputProps & {
  error?: string;
  children?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightPress?: () => void;
};

interface InputWrapperProps {
  hasError: boolean;
  multiline?: boolean;
  disabled?: boolean; 
}

interface StyledInputProps {
  hasRightIcon: boolean;
}

const Container = styled(View)`
  width: 100%;
  margin-bottom: 5px;
`;

const InputWrapper = styled(View)<InputWrapperProps>`
  width: 100%;
  position: relative;
  flex-direction: row;
  align-items: ${(props: InputWrapperProps) => (props.multiline ? 'flex-start' : 'center')};
  
  /* 2. LÓGICA DE COR DE FUNDO DO CONTAINER */
  /* Se estiver desabilitado, usa a cor de fundo da tela (efeito vazado). Se não, usa a cor de input padrão. */
  background-color: ${(props: any) => 
    props.disabled ? props.theme.colors.background : props.theme.colors.inputBg};
  
  border-radius: 25px;
  height: ${(props: InputWrapperProps) => (props.multiline ? 'auto' : '55px')};
  min-height: 55px;
  border-width: 1px;
  
  /* Se desabilitado, remove a borda ou deixa bem sutil */
  border-color: ${(props: any) => {
    if (props.hasError) return props.theme.colors.error;
    if (props.disabled) return 'transparent'; 
    return props.theme.colors.border;
  }};
  
  padding-left: 20px;
  padding-top: ${(props: InputWrapperProps) => (props.multiline ? '10px' : '0px')};
  padding-bottom: ${(props: InputWrapperProps) => (props.multiline ? '10px' : '0px')};
  
  /* Opcional: Diminuir opacidade geral do container */
  opacity: ${(props: InputWrapperProps) => (props.disabled ? 0.7 : 1)};
`;

const StyledInput = styled.TextInput<StyledInputProps>`
  flex: 1;
  font-size: 16px;
  color: ${(props: any) => props.theme.colors.text};
  padding-right: ${(props: StyledInputProps) => (props.hasRightIcon ? '48px' : '20px')};
  height: 100%; 
`;

const ErrorText = styled.Text`
  color: ${(props: any) => props.theme.colors.error};
  font-size: 12px;
  margin-top: 4px;
  margin-left: 20px;
  min-height: 16px;
`;

const IconContainer = styled.View`
  position: absolute;
  right: 12px;
  top: 12px; 
  justify-content: center;
  align-items: center;
  z-index: 10;
  elevation: 6;
`;

const TextInput = ({ error, children, rightIcon, onRightPress, editable = true, ...props }: TextInputProps) => {
  const theme = useTheme();

  return (
    <Container>
      <InputWrapper hasError={!!error} multiline={props.multiline} disabled={!editable}>
        <StyledInput
          placeholderTextColor={theme.colors.textLight}
          hasRightIcon={!!rightIcon}
          editable={editable} 
          {...props}
        />
        
        <IconContainer>
          {rightIcon ? (
            <TouchableOpacity 
              onPress={onRightPress} 
              activeOpacity={0.7} 
              disabled={!editable && !onRightPress} 
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              {rightIcon}
            </TouchableOpacity>
          ) : (
            children
          )}
        </IconContainer>
      </InputWrapper>

      <ErrorText>{error || ''}</ErrorText>
    </Container>
  );
};

export default TextInput;