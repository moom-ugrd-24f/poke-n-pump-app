import { View, StyleSheet, Image, Modal, TouchableWithoutFeedback } from 'react-native';
import poke from '@/assets/images/poke.png';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedScrollView } from '@/components/ThemedScrollView';
import { ThemedButton } from '@/components/ThemedButton';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { useEffect, useState } from 'react';
import { Pressable } from 'react-native';
import { router } from 'expo-router';
import { getPokeeList } from '@/hooks/useAPI';
import AsyncStorage from '@react-native-async-storage/async-storage';
import usePushNotifications from '@/hooks/usePushNotifications';

export default function PokeList() {
    const colorScheme = useColorScheme();

    const themeColor = Colors[colorScheme ?? 'light'];

    const [showPokeModal, setShowPokeModal] = useState(false);
    const [receiverId, setReceiverId] = useState('');
    const [receiverName, setReceiverName] = useState('');
    const [enableShamePost, setEnableShamePost] = useState(false);

    interface Pokee {
        id: string;
        nickname: string;
        expoPushToken: string;
    }

    const [ pokees, setPokees ] = useState<Pokee[]>([]);  
    const [ shamePokees, setShamePokees ] = useState<string[]>([]);  

    const { sendNotification } = usePushNotifications();

    useEffect(() => {
        AsyncStorage.getItem("id").then((userId) => {
            if (userId) {
                getPokeeList(userId).then((res) => {
                    setPokees(res.data.pokeList);
                    setShamePokees(res.data.shamePostUsers);
                });
            }
        });
    }, []);

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
            <ThemedScrollView style={styles.pokeesContainer} showsVerticalScrollIndicator={false}>
                { !pokees ? null : pokees.map((pokee, index) => (
                    <Pressable 
                        key={index}
                        onPress={() => {
                            setShowPokeModal(true);
                            setReceiverId(pokee.expoPushToken);
                            setReceiverName(pokee.nickname);
                            setEnableShamePost(shamePokees.includes(pokee.nickname));
                        }}
                    >
                        <ThemedView
                            key={index}
                            style={styles.pokeeContainer}
                            lightColor={shamePokees.includes(pokee.nickname) ? themeColor.subLight : themeColor.mainLight}
                            darkColor={shamePokees.includes(pokee.nickname) ? themeColor.subLight : themeColor.mainLight}
                            lightBorderColor={shamePokees.includes(pokee.nickname) ? themeColor.subDark : themeColor.mainDark}
                            darkBorderColor={shamePokees.includes(pokee.nickname) ? themeColor.subDark : themeColor.mainDark}
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
