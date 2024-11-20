import { Button, type ButtonProps } from 'react-native-elements';
import { useThemeColor } from '@/hooks/useThemeColor';
import { ThemedView } from '@/components/ThemedView';

export type ThemedButtonProps = ButtonProps & {
  lightColor?: string;
  darkColor?: string;
  lightBorderColor?: string;
  darkBorderColor?: string;
  lightTextColor?: string;
  darkTextColor?: string;
  type?: 'default' | 'tiny';
};

export function ThemedButton({
  lightColor,
  darkColor,
  lightBorderColor,
  darkBorderColor,
  lightTextColor,
  darkTextColor,
  buttonStyle,
  titleStyle,
  type = 'default',
  ...otherProps
}: ThemedButtonProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'subLight');
  const borderColor = useThemeColor({ light: lightBorderColor, dark: darkBorderColor }, 'subLight');
  const textColor = useThemeColor({ light: lightTextColor, dark: darkTextColor }, 'subDark');

  return (
    <ThemedView>
      <Button
        buttonStyle={[
          {
            backgroundColor,
            borderColor,
            borderRadius: 20,
            width: '100%',
          },
          type === 'default' ? { borderWidth: 5 } : undefined,
          type === 'tiny' ? { borderWidth: 1 } : undefined,
          buttonStyle,
        ]}
        titleStyle={[
          { color: textColor }, 
          type === 'default' ? { fontSize: 20 } : undefined,
          type === 'tiny' ? { fontSize: 10 } : undefined,
          titleStyle
        ]}
        {...otherProps}
      />
    </ThemedView>
  );
}

export default ThemedButton;
