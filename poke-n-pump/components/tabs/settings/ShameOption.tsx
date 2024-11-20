import { StyleSheet } from "react-native";
import { ThemedText } from "../../ThemedText";
import { ThemedView } from "../../ThemedView";
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from "@/constants/Colors";
import ShameToggle from "../../ShameToggle";
import ShameStreakPicker from "../../ShameStreakPicker";

export default function ShameOption() {
    const colorScheme = useColorScheme();

    const themeColor = Colors[colorScheme ?? 'light'];

    return (
        <ThemedView style={styles.shameView}>
            <ThemedText type='subtitle'>Enable / Disable{" "}
                <ThemedText 
                type='subtitle' 
                lightColor={themeColor.sub} 
                darkColor={themeColor.sub}> 
                    shame post 
                </ThemedText>
            {" "}</ThemedText>
            <ShameToggle />
            <ThemedText type='subtitle'>Set{" "}
                <ThemedText 
                type='subtitle' 
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
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 20,
    },
});
