import { Platform, StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from "@/constants/Colors";
import { useState } from "react";
import { ThemedSwitch } from "@/components/ThemedSwitch";
import { ThemedPicker } from "@/components/ThemedPicker";
import { Picker } from "@react-native-picker/picker";

export default function ShameOption() {
    const colorScheme = useColorScheme();

    const themeColor = Colors[colorScheme ?? 'light'];

    const [isShamePostAllowed, setIsShamePostAllowed] = useState(false);
    const toggleSwitch = () => setIsShamePostAllowed(previousState => !previousState);

    const [selectedValue, setSelectedValue] = useState(0);

    return (
        <ThemedView style={styles.shameView}>
            <ThemedText type='title'>Will you allow others to{" "}
                <ThemedText 
                type='title' 
                lightColor={themeColor.sub} 
                darkColor={themeColor.sub}> 
                    shame post 
                </ThemedText>
            {" "}on you?</ThemedText>
            <ThemedSwitch onValueChange={toggleSwitch} value={isShamePostAllowed} />
            <ThemedText type='title'>Set{" "}
                <ThemedText 
                type='title' 
                lightColor={themeColor.sub} 
                darkColor={themeColor.sub}> 
                    no-gym streak
                </ThemedText>
            {" "}to be shame posted</ThemedText>
            <ThemedPicker
                selectedValue={selectedValue}
                onValueChange={(itemValue) => setSelectedValue(Number(itemValue))}
                style={{ height: 50, width: 100 }}
            >
                { Array.from({length: 10}, (_, i) => i + 1).map((num) => (
                    <Picker.Item key={num} label={num.toString()} value={num} color={Platform.OS === 'ios' ? themeColor.mainLight : themeColor.reverse} />
                ))}
            </ThemedPicker>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    shameView: {
        height: '40%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
});
