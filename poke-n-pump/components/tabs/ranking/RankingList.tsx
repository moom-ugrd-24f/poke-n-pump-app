import { StyleSheet, Image } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedScrollView } from '@/components/ThemedScrollView';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { useState, useEffect } from 'react';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import { WEEKLY_RANKING_URL } from '@/constants/url';

export default function RankingList() {
    const colorScheme = useColorScheme();

    const themeColor = Colors[colorScheme ?? 'light'];

    const dummyRankings = [
        { name: 'Paul', xp: 1500 },
        { name: 'David', xp: 1480 },
        { name: 'Nina', xp: 1320 },
        { name: 'Peter', xp: 1200 },
        { name: 'Lynn', xp: 1190 },
        { name: 'Chan', xp: 1185 },
        { name: 'Sejun', xp: 1150 },
        { name: 'Clara', xp: 1080 },
        { name: 'Moom', xp: 1000 },
        { name: 'Mew', xp: 800 },
    ];

    const [rankings, setRankings] = useState(dummyRankings);


    useEffect(() => {
        getRankings();
    }, []);

    const getRankings = async () => {
        fetch(WEEKLY_RANKING_URL, { method: 'GET' })
        .then((response) => response.json())
        .then((data) => {
            if (data.error === true) {
                console.log('Error fetching rankings');
                return;
            }
            const body = data.response.body;
            setRankings(body.map((ranking: any) => {
                return {
                    name: ranking.name, 
                    xp: ranking.xp 
                };
            }));
        });
    }


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
        top: 50,
        height: '90%',
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
    },
});
