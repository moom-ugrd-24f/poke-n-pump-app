import { Platform } from "react-native";
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from "@/constants/Colors";
import { ThemedPicker } from "../themedComponents/ThemedPicker";
import { Picker } from "@react-native-picker/picker";

interface ShameOptionProps {
    noGymStreakLimit: number;
    setNoGymStreakLimit: (value: number) => void;
}

export default function ShameOption({ noGymStreakLimit, setNoGymStreakLimit }: ShameOptionProps) {
    const colorScheme = useColorScheme();

    const themeColor = Colors[colorScheme ?? 'light'];

    return (
        <ThemedPicker
            selectedValue={noGymStreakLimit}
            onValueChange={(itemValue) => {
                console.log(itemValue);
                setNoGymStreakLimit(Number(itemValue));
            }}
            style={{ height: 50, width: 100 }}
        >
            { Array.from({length: 10}, (_, i) => i + 1).map((num) => (
                <Picker.Item 
                    key={num} 
                    label={num.toString()} 
                    value={num} 
                    color={Platform.OS === 'ios' ? themeColor.mainLight : themeColor.reverse}
                />
            ))}
        </ThemedPicker>
    );
}
