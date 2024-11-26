import { Button, type ButtonProps } from 'react-native-elements';
import { useThemeColor } from '@/hooks/useThemeColor';
import { ThemedView } from '@/components/themedComponents/ThemedView';

export type ThemedButtonProps = ButtonProps & {
  lightColor?: string;
  darkColor?: string;
  lightBorderColor?: string;
  darkBorderColor?: string;
  lightTextColor?: string;
  darkTextColor?: string;
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
            borderWidth: 5,
            borderColor,
            borderRadius: 20,
            width: '100%',
          },
          buttonStyle,
        ]}
        titleStyle={[
          { 
            color: textColor, 
            fontSize: 20 
          }, 
          titleStyle
        ]}
        {...otherProps}
      />
    </ThemedView>
  );
}

export default ThemedButton;
