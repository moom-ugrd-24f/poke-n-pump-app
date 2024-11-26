import { StyleSheet } from "react-native";
import { ThemedText } from "@/components/themedComponents/ThemedText";
import { ThemedView } from "@/components/themedComponents/ThemedView";
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from "@/constants/Colors";
import ShameToggle from "@/components/shame/ShameToggle";
import ShameStreakPicker from "@/components/shame/ShameStreakPicker";

export default function ShameOption() {
    const colorScheme = useColorScheme();

    const themeColor = Colors[colorScheme ?? 'light'];

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
            <ShameToggle />
            <ThemedText type='title'>Set{" "}
                <ThemedText 
                type='title' 
                lightColor={themeColor.sub} 
                darkColor={themeColor.sub}> 
                    no-gym streak
                </ThemedText>
            {" "}to be shame posted</ThemedText>
            <ShameStreakPicker />
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
