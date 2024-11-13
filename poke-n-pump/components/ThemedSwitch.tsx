import { useThemeColor } from "@/hooks/useThemeColor";
import { Switch, type SwitchProps} from "react-native";

export type ThemedSwitchProps = SwitchProps & {
    lightColor?: string;
    darkColor?: string;
    lightThumbColor?: string;
    darkThumbColor?: string;
    light_ios_backgroundColor?: string;
    dark_ios_backgroundColor?: string;
};

export function ThemedSwitch({ 
    lightColor, 
    darkColor, 
    lightThumbColor, 
    darkThumbColor, 
    light_ios_backgroundColor, 
    dark_ios_backgroundColor, 
    style, 
    ...otherProps
}: ThemedSwitchProps) {
    const trackColor = useThemeColor({ light: lightColor, dark: darkColor }, 'subLight');
    const thumbColor = useThemeColor({ light: lightThumbColor, dark: darkThumbColor }, 'default');
    const ios_backgroundColor = useThemeColor({ light: light_ios_backgroundColor, dark: dark_ios_backgroundColor }, 'subLight');

    return (
        <Switch
            trackColor={{false: trackColor, true: trackColor}}
            thumbColor={thumbColor}
            ios_backgroundColor={ios_backgroundColor}
            style={style}
            {...otherProps}
        />
    );
}
