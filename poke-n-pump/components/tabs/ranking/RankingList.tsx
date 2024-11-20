import { StyleSheet, Image } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedScrollView } from '@/components/ThemedScrollView';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

export default function RankingList() {
    const colorScheme = useColorScheme();

    const themeColor = Colors[colorScheme ?? 'light'];

    const rankings = [
        { name: 'Paul', xp: 1500 },
        { name: 'David', xp: 1500 },
        { name: 'Nina', xp: 1500 },
        { name: 'Peter', xp: 1500 },
        { name: 'Lynn', xp: 1500 },
        { name: 'Chan', xp: 1500 },
        { name: 'Sejun', xp: 1500 },
        { name: 'Clara', xp: 1500 },
        { name: 'Mewtwo', xp: 1500 },
        { name: 'Mew', xp: 1500 },
    ];

    return (
        <ThemedView style={styles.rankingListView}>
            <ThemedScrollView style={styles.rankingsContainer} showsVerticalScrollIndicator={false}>
                { rankings.map((ranking, index) => (
                    <ThemedView
                        key={index}
                        style={styles.rankingContainer}
                        lightColor={themeColor.mainLight}
                        darkColor={themeColor.mainLight}
                        lightBorderColor={themeColor.mainLight}
                        darkBorderColor={themeColor.mainLight}
                    >
                        <ThemedText type='default' lightColor={themeColor.reverse} darkColor={themeColor.reverse}>{ranking.name}</ThemedText>
                        <ThemedText type='default' lightColor={themeColor.reverse} darkColor={themeColor.reverse}>{ranking.xp}XP</ThemedText>
                    </ThemedView>
                )) }
            </ThemedScrollView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    rankingListView: {
        height: '70%',
        width: '90%',
        alignItems: 'center',
        marginBottom: 5,
    },
    rankingsContainer: {
        width: '100%',
    },
    rankingContainer: {
        margin: 5,
        padding: 10,
        borderWidth: 5,
        borderRadius: 10,
    },
});
