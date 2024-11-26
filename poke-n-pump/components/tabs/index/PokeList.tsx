import { View, StyleSheet, Image, Modal, TouchableWithoutFeedback } from 'react-native';
import poke from '@/assets/images/poke.png';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedScrollView } from '@/components/ThemedScrollView';
import { ThemedButton } from '@/components/ThemedButton';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { useEffect, useState } from 'react';
import { Pressable, RefreshControl } from 'react-native';
import { router } from 'expo-router';
import { getPokeeList } from '@/hooks/useAPI';
import AsyncStorage from '@react-native-async-storage/async-storage';
import usePushNotifications from '@/hooks/usePushNotifications';
import Toast from 'react-native-root-toast';
import { updateXp } from '@/hooks/useAsyncStorage';

interface Pokee {
    id: string;
    nickname: string;
    expoPushToken: string;
    isFriend: boolean;
    isShamePostCandidate: boolean;
}

export default function PokeList() {
    const colorScheme = useColorScheme();

    const { sendNotification } = usePushNotifications();

    const themeColor = Colors[colorScheme ?? 'light'];

    const [showPokeModal, setShowPokeModal] = useState(false);
    const [receiverId, setReceiverId] = useState('');
    const [receiverName, setReceiverName] = useState('');
    const [enableShamePost, setEnableShamePost] = useState(false);
    const [pokees, setPokees] = useState<Pokee[]>([]);
    const [refreshing, setRefreshing] = useState(false);
    const [myself, setMyself] = useState<Pokee>();

    useEffect(() => {
        AsyncStorage.multiGet(['id', 'nickname', 'expoPushToken']).then((res) => {
            const id = res[0][1] || '';
            const nickname = res[1][1] || '';
            const expoPushToken = res[2][1] || '';

            if (!id || !nickname || !expoPushToken) {
                return;
            }
      
            const myself = {
                id: id,
                nickname: nickname,
                expoPushToken: expoPushToken,
                isFriend: true,
                isShamePostCandidate: false
            };
            setMyself(myself);
        });
    }, []);

    useEffect(() => {
        fetchPokees();
    }, [myself]);

    const fetchPokees = async () => {
        if (myself !== undefined && myself.id !== '') {
            const res = await getPokeeList(myself.id);
            res.data.sort((a: Pokee, b: Pokee) => {
                if (a.id === myself.id) {
                    return -1;
                } else if (b.id === myself.id) {
                    return 1;
                } else {
                    return 0;
                }
            });
            setPokees(res.data);
        }
    };

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchPokees();
        setRefreshing(false);
    };

    const pokeXpUpdate = () => {
        updateXp(10);
        Toast.show('Earned 10XP by poking a lazy gym buddy!', {
            duration: Toast.durations.SHORT,
            position: Toast.positions.CENTER,
            shadow: true,
            animation: true,
            hideOnPress: true,
        });
    };

    return (
        <ThemedView style={styles.pokeListView}>
            <Modal
                transparent={true}
                visible={showPokeModal}
                onRequestClose={() => setShowPokeModal(false)}
                >
                <TouchableWithoutFeedback
                    onPress={() => setShowPokeModal(false)}
                    >
                        <View style={styles.modalOverlay} />
                    </TouchableWithoutFeedback>

                <ThemedView
                    style={styles.pokeModal}>
                    <ThemedButton
                        title="Just Poke"
                        lightColor={themeColor.mainLight}
                        darkColor={themeColor.mainLight}
                        lightBorderColor={themeColor.mainLight}
                        darkBorderColor={themeColor.mainLight}
                        onPress={() => {
                            setShowPokeModal(false);
                            sendNotification(receiverId, { title: 'PokeNPump', body: `You've been poked by ${receiverName}!` });
                            pokeXpUpdate();
                        }}
                    />
                    <ThemedButton
                        title="Join Me!"
                        lightColor={themeColor.mainLight}
                        darkColor={themeColor.mainLight}
                        lightBorderColor={themeColor.mainLight}
                        darkBorderColor={themeColor.mainLight}
                        onPress={() => {
                            setShowPokeModal(false);
                            sendNotification(receiverId, { title: 'PokeNPump', body: `Join ${receiverName} in a workout!` });
                            pokeXpUpdate();
                        }}
                    />
                    <ThemedButton
                        title="Trash Talk"
                        lightColor={themeColor.mainLight}
                        darkColor={themeColor.mainLight}
                        lightBorderColor={themeColor.mainLight}
                        darkBorderColor={themeColor.mainLight}
                        onPress={() => {
                            setShowPokeModal(false);
                            sendNotification(receiverId, { title: 'PokeNPump', body: `${receiverName} : go hit the gym you fat looser!` });
                            pokeXpUpdate();
                        }}
                    />
                    { enableShamePost ?
                        <ThemedButton
                        title="Shame Post"
                        onPress={() => {
                            router.navigate('/(shamePost)');
                            setShowPokeModal(false);
                        }}
                        /> : null
                    }
                    
                </ThemedView>
            </Modal>
            <Image source={poke} style={styles.image} />
            <ThemedScrollView 
            style={styles.pokeesContainer} 
            showsVerticalScrollIndicator={false} 
            refreshControl={ <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={themeColor.default}/> }
            >
                { (pokees === undefined || pokees === null) ? null : pokees.map((pokee, index) => (
                    <Pressable 
                        key={index}
                        onPress={() => {
                            setShowPokeModal(true);
                            setReceiverId(pokee.expoPushToken);
                            setReceiverName(pokee.nickname);
                            setEnableShamePost(pokee.isShamePostCandidate);
                        }}
                    >
                        <ThemedView
                            key={index}
                            style={styles.pokeeContainer}
                            lightColor={pokee.isShamePostCandidate ? themeColor.subLight : themeColor.mainLight}
                            darkColor={pokee.isShamePostCandidate ? themeColor.subLight : themeColor.mainLight}
                            lightBorderColor={pokee.isShamePostCandidate ? themeColor.subDark : themeColor.mainDark}
                            darkBorderColor={pokee.isShamePostCandidate ? themeColor.subDark : themeColor.mainDark}
                        >
                            <ThemedText type='default' lightColor={themeColor.reverse} darkColor={themeColor.reverse}>{pokee.nickname}</ThemedText>
                        </ThemedView>
                    </Pressable>
                )) }
            </ThemedScrollView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    pokeListView: {
        height: '70%',
        width: '90%',
        alignItems: 'center',
        marginBottom: 5,
    },
    pokeesContainer: {
        width: '100%',
    },
    pokeeContainer: {
        margin: 5,
        padding: 10,
        borderWidth: 5,
        borderRadius: 10,
    },
    image: {
        height: 50,
        resizeMode: 'contain',
    },
    pokeModal: {
        position: 'absolute',
        height: 300,
        width: 200,
        marginTop: -150,
        marginLeft: -100,
        top: '50%',
        left: '50%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20,
        borderRadius: 20
    },
    modalOverlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0,0,0,0.5)'
    }
});
