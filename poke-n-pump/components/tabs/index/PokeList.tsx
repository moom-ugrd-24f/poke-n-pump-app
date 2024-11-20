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
import { USER_URL, POKE_URL } from '@/constants/url';
import { router } from 'expo-router';

export default function PokeList() {
    const colorScheme = useColorScheme();

    const themeColor = Colors[colorScheme ?? 'light'];

    const [showPokeModal, setShowPokeModal] = useState(false);
    const [receiverId, setReceiverId] = useState('');

    let pokees = [
        { name: 'Pikachu', receiverId: '0' },
        { name: 'Charmander', receiverId: '1' },
        { name: 'Bulbasaur', receiverId: '2' },
        { name: 'Squirtle', receiverId: '3' },
        { name: 'Jigglypuff', receiverId: '4' },,
        { name: 'Meowth', receiverId: '5' },
        { name: 'Psyduck', receiverId: '6' },
        { name: 'Snorlax', receiverId: '7' },
        { name: 'Mewtwo', receiverId: '8' },
        { name: 'Mew', receiverId: '9' },
    ];

    let shamePokees = [
        { name: 'Pikachu' },
    ];

    useEffect(() => {
        getPokeeList();
    }, []);

    const getUserId = () => {
        return '672b3de2613125bee0cdee3d';
    }

    const getPokeeList = async () => {
        const userId = getUserId();
        const getPokeeListUrl = USER_URL + '/' + userId + '/poke-list';
        fetch(getPokeeListUrl, { method: 'GET' })
        .then((response) => response.json())
        .then((data) => { 
            if (data.error === true) {
                console.log('Error fetching pokees');
            }
            const body = data.response.body;
            pokees = body.pokeList;
            shamePokees = body.shamePostUsers;
         });
    }

    const sendPoke = async (pokeType: string) => {
        const userId = getUserId();
        fetch(POKE_URL, {
            method: 'POST',
            body: JSON.stringify({
                senderId: userId,
                receiverId: receiverId,
                pokeType: pokeType,
            })
        });
    }


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
                        onPress={() => {
                            sendPoke("Just Poke");
                            setShowPokeModal(false);
                        }}
                    />
                    <ThemedButton
                        title="Join Me!"
                        onPress={() => {
                            sendPoke("Join Me!");
                            setShowPokeModal(false);
                        }}
                    />
                    <ThemedButton
                        title="Trash Talk"
                        onPress={() => {
                            sendPoke("Trash Talk");
                            setShowPokeModal(false);
                        }}
                    />
                    <ThemedButton
                        title="Shame Post"
                        onPress={() => {
                            router.navigate('/(shamePost)');
                            setShowPokeModal(false);
                        }}
                    />
                </ThemedView>
            </Modal>
            <Image source={poke} style={styles.image} />
            <ThemedScrollView style={styles.pokeesContainer} showsVerticalScrollIndicator={false}>
                { pokees.map((pokee, index) => (
                    <Pressable onPress={() => {
                        setShowPokeModal(true);
                        setReceiverId(pokee.receiverId);
                    }}>
                    <ThemedView
                        key={index}
                        style={styles.pokeeContainer}
                        lightColor={themeColor.mainLight}
                        darkColor={themeColor.mainLight}
                        lightBorderColor={themeColor.mainLight}
                        darkBorderColor={themeColor.mainLight}
                    >
                        <ThemedText type='default' lightColor={themeColor.reverse} darkColor={themeColor.reverse}>{pokee.name}</ThemedText>
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
    },
});
