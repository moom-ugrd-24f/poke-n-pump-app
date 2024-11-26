import { TextInput, type TextInputProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedTextInputProps = TextInputProps & {
  lightColor?: string;
  darkColor?: string;
  lightTextColor?: string;
  darkTextColor?: string;
};

export function ThemedTextInput({ style, lightColor, darkColor, lightTextColor, darkTextColor, ...otherProps }: ThemedTextInputProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'default');
  const color = useThemeColor({ light: lightTextColor, dark: darkTextColor }, 'reverse');

  return <TextInput 
    style={[{
        backgroundColor,
        color, 
        borderRadius: 20, 
        textAlign: 'center',
        height: 50,
        width: 250
    }, style]} {...otherProps} />;
}
