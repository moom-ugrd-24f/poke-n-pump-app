import { Pressable, View, type ViewProps } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  lightBorderColor?: string;
  darkBorderColor?: string;
  onPress?: () => void;
};

export function ThemedView({ style, lightColor, darkColor, lightBorderColor, darkBorderColor, onPress, ...otherProps }: ThemedViewProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');
  const borderColor = useThemeColor({ light: lightBorderColor, dark: darkBorderColor }, 'backgroundLight');

  const Component = onPress ? Pressable : View;

  return <Component style={[{ backgroundColor, borderColor }, style]} onPress={onPress} {...otherProps} />;
}
