import { StyleSheet } from "react-native";
import { ThemedText } from "../../themedComponents/ThemedText";
import { ThemedView } from "../../themedComponents/ThemedView";
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from "@/constants/Colors";
import ShameToggle from "../../shame/ShameToggle";
import ShameStreakPicker from "../../shame/ShameStreakPicker";

export default function ShameOption({shame, setShame, noGymStreakLimit, setNoGymStreakLimit}) {
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
            <ShameToggle shame={shame} setShame={setShame}/>
            <ThemedText type='subtitle'>Set{" "}
                <ThemedText 
                type='subtitle' 
                lightColor={themeColor.sub} 
                darkColor={themeColor.sub}> 
                    no-gym streak
                </ThemedText>
            {" "}to be shame posted</ThemedText>
            <ShameStreakPicker noGymStreakLimit={noGymStreakLimit} setNoGymStreakLimit={setNoGymStreakLimit}/>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    shameView: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 10,
        marginBottom: 100,
    },
});
