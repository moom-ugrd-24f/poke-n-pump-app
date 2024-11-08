import { Button, type ButtonProps } from 'react-native-elements';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Colors } from '@/constants/Colors';

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
  const borderColor = useThemeColor({ light: lightBorderColor, dark: darkBorderColor }, 'sub');
  const textColor = useThemeColor({ light: lightTextColor, dark: darkTextColor }, 'subDark');

  return (
    <Button
      buttonStyle={[
        {
          backgroundColor,
          borderColor,
          borderWidth: 5,
          borderRadius: 10,
          width: '100%',
        },
        buttonStyle,
      ]}
      titleStyle={[{ color: textColor }, titleStyle]}
      {...otherProps}
    />
  );
}

export default ThemedButton;
