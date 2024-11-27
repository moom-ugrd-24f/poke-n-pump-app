import { StyleSheet, Image } from 'react-native';
import { ThemedView } from '@/components/themedComponents/ThemedView';
import { ThemedText } from '@/components/themedComponents/ThemedText';
import { ThemedScrollView } from '@/components/themedComponents/ThemedScrollView';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { useState, useEffect } from 'react';
import { getWeeklyRanking } from '@/hooks/useAPI';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RankingList() {
    const colorScheme = useColorScheme();

    const themeColor = Colors[colorScheme ?? 'light'];

    const dummyRankings = [
        { rank: 1, nickname: 'Paul', xp: 1500, _id: '', profilePicture: null },
        { rank: 2, nickname: 'David', xp: 1480, _id: '', profilePicture: null },
        { rank: 3, nickname: 'Nina', xp: 1320, _id: '', profilePicture: null },
        { rank: 4, nickname: 'Peter', xp: 1200, _id: '', profilePicture: null },
        { rank: 5, nickname: 'Lynn', xp: 1190, _id: '', profilePicture: null },
        { rank: 6, nickname: 'Chan', xp: 1185, _id: '', profilePicture: null },
        { rank: 7, nickname: 'Sejun', xp: 1150, _id: '', profilePicture: null },
        { rank: 8, nickname: 'Clara', xp: 1080, _id: '', profilePicture: null },
        { rank: 9, nickname: 'Moom', xp: 1000, _id: '', profilePicture: null },
        { rank: 10, nickname: 'Mew', xp: 800, _id: '', profilePicture: null },
    ];

    const [rankings, setRankings] = useState(dummyRankings);
    const [userId, setUserId] = useState('');

    useEffect(() => {
        getRankings();
    }, []);

    const getRankings = async () => {
        AsyncStorage.getItem('id').then((storedId) => {
            if (!storedId) return;
            setUserId(storedId);
            getWeeklyRanking(userId).then((res) => {
                if (res.status !== 400) {
                    if (!res.data.weeklyRanking.some((user) => user._id === userId)) {
                        res.data.weeklyRanking.push(res.data.currentUser);
                    }
                    setRankings(res.data.weeklyRanking);
                }
            });
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
