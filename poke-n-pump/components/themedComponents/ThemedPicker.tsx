import { Picker, type PickerProps } from '@react-native-picker/picker';
import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedPickerProps = PickerProps & {
    lightColor?: string;
    darkColor?: string;
    lightBackgroundColor?: string;
    darkBackgroundColor?: string;
};

export function ThemedPicker({ 
    lightColor, 
    darkColor, 
    lightBackgroundColor,
    darkBackgroundColor,
    style, 
    ...otherProps
}: ThemedPickerProps) {
    const color = useThemeColor({ light: lightColor, dark: darkColor }, 'mainLight');
    const backgroundColor = useThemeColor({ light: lightBackgroundColor, dark: darkBackgroundColor }, 'background');

    return (
        <Picker
            dropdownIconColor={color}
            style={[{color, backgroundColor, width: 100}, style]}
            {...otherProps}
        ></Picker>
    );
}
