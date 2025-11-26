// Arquivo: src/types/styled.d.ts

import 'styled-components/native';
import { lightTheme } from '../constants/colors';

// Pega o tipo do nosso tema (infernindo do objeto lightTheme)
type ThemeType = typeof lightTheme;

declare module 'styled-components/native' {
  export interface DefaultTheme extends ThemeType {}
}