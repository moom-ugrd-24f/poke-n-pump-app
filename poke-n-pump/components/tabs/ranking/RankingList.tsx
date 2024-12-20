import { StyleSheet, Image, ActivityIndicator } from 'react-native';
import { ThemedView } from '@/components/themedComponents/ThemedView';
import { ThemedText } from '@/components/themedComponents/ThemedText';
import { ThemedScrollView } from '@/components/themedComponents/ThemedScrollView';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { useState, useEffect, useCallback } from 'react';
import { getWeeklyRanking } from '@/hooks/useAPI';
import { getUserId } from '@/hooks/useAsyncStorage';

export default function RankingList({update, setUpdate}) {
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
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getRankings();
    }, [userId]);

    useEffect(() => {
        if (update) {
            if (!userId) {
                getUserId().then((res) => {
                    setUserId(res || '');
                });
            } else {
                getRankings();
            }
            setUpdate(false);
        }
    }), [update];

    const getRankings = async () => {
        getWeeklyRanking(userId).then((res) => {
            if (res.status !== 400) {
                if (!res.data.weeklyRanking.some((user) => user._id === userId)) {
                    res.data.weeklyRanking.push(res.data.currentUser);
                }
                console.log(res.data.weeklyRanking);
                setRankings(res.data.weeklyRanking);
            }
            setIsLoading(false);
        });
    }

    return (
        <ThemedView style={styles.rankingListView}>
            { isLoading 
            ? <ActivityIndicator color={themeColor.default} style={{ height: '70%' }} /> 
            : <ThemedScrollView 
                style={styles.rankingsContainer} 
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingBottom: 100}}>
                { rankings.map((ranking, index) => (
                    <ThemedView
                        key={index}
                        style={styles.rankingContainer}
                        lightColor={themeColor.mainLight}
                        darkColor={themeColor.mainLight}
                        lightBorderColor={themeColor.mainLight}
                        darkBorderColor={themeColor.mainLight}>
                        { ranking._id === userId
                        ? <>
                            <ThemedText type='default' lightColor={themeColor.subDark} darkColor={themeColor.subDark}>{ranking.rank}</ThemedText>
                            <ThemedText type='default' lightColor={themeColor.subDark} darkColor={themeColor.subDark}>{ranking.nickname}</ThemedText>
                            <ThemedText type='default' lightColor={themeColor.subDark} darkColor={themeColor.subDark}>{ranking.xp}XP</ThemedText>
                        </>
                        : <>
                            <ThemedText type='default' lightColor={themeColor.reverse} darkColor={themeColor.reverse}>{ranking.rank}</ThemedText>
                            <ThemedText type='default' lightColor={themeColor.reverse} darkColor={themeColor.reverse}>{ranking.nickname}</ThemedText>
                            <ThemedText type='default' lightColor={themeColor.reverse} darkColor={themeColor.reverse}>{ranking.xp}XP</ThemedText>
                        </>
                        }
                    </ThemedView>
                )) }
            </ThemedScrollView>
            }
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    rankingListView: {
        top: 20,
        height: '80%',
        width: '90%',
        alignItems: 'center',
        marginBottom: 5,
    },
    rankingsContainer: {
        width: '100%',
        height: '100%',
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
