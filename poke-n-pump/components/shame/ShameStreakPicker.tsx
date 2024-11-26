import { Platform } from "react-native";
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from "@/constants/Colors";
import { useEffect, useState } from "react";
import { ThemedPicker } from "../themedComponents/ThemedPicker";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ShameOption() {
    const colorScheme = useColorScheme();

    const themeColor = Colors[colorScheme ?? 'light'];

    const [selectedValue, setSelectedValue] = useState(0);
    
    useEffect(() => {
        loadShameStreak();
    }, []);

    const loadShameStreak = async () => {
        try {
            const shameStreakString = await AsyncStorage.getItem('shame-streak');
            const shameStreak = shameStreakString !== null ? JSON.parse(shameStreakString) : 0;
            setSelectedValue(shameStreak);
        } catch (e) {
            console.error(e);
        }
    }

    const storeShameStreak = async (value: number) => {
        try {
            await AsyncStorage.setItem('shame-streak', JSON.stringify(value));
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <ThemedPicker
            selectedValue={selectedValue}
            onValueChange={(itemValue) => {
                setSelectedValue(Number(itemValue));
                storeShameStreak(Number(itemValue));
            }}
            style={{ height: 50, width: 100 }}
        >
            { Array.from({length: 10}, (_, i) => i + 1).map((num) => (
                <Picker.Item key={num} label={num.toString()} value={num} color={Platform.OS === 'ios' ? themeColor.mainLight : themeColor.reverse} />
            ))}
        </ThemedPicker>
    );
}
