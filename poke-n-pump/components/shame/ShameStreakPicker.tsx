import { Platform } from "react-native";
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from "@/constants/Colors";
import { useEffect, useState } from "react";
import { ThemedPicker } from "../themedComponents/ThemedPicker";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ShameOption({noGymStreak, setNoGymStreak}) {
    const colorScheme = useColorScheme();

    const themeColor = Colors[colorScheme ?? 'light'];

    return (
        <ThemedPicker
            selectedValue={noGymStreak}
            onValueChange={(itemValue) => {
                setNoGymStreak(Number(itemValue));
            }}
            style={{ height: 50, width: 100 }}
        >
            { Array.from({length: 10}, (_, i) => i + 1).map((num) => (
                <Picker.Item key={num} label={num.toString()} value={num} color={Platform.OS === 'ios' ? themeColor.mainLight : themeColor.reverse} />
            ))}
        </ThemedPicker>
    );
}
