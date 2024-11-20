import { View, StyleSheet, Image, Modal, TouchableWithoutFeedback } from 'react-native';
import poke from '../../../assets/images/poke.png';
import { ThemedView } from '../../ThemedView';
import { ThemedButton } from '../../ThemedButton';
import { Pressable } from 'react-native';
import { ThemedText } from '../../ThemedText';
import { ThemedScrollView } from '../../ThemedScrollView';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { useState } from 'react';

export default function PokeList() {
    const colorScheme = useColorScheme();

    const themeColor = Colors[colorScheme ?? 'light'];

    const [showPokeModal, setShowPokeModal] = useState(false);

    const pokees = [
        { name: 'Pikachu' },
        { name: 'Charmander' },
        { name: 'Bulbasaur' },
        { name: 'Squirtle' },
        { name: 'Jigglypuff' },
        { name: 'Meowth' },
        { name: 'Psyduck' },
        { name: 'Snorlax' },
        { name: 'Mewtwo' },
        { name: 'Mew' },
    ];

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
                    />
                    <ThemedButton
                        title="Join Me!"
                    />
                    <ThemedButton
                        title="Trash Talk"
                    />
                    <ThemedButton
                        title="Shame Post"
                    />
                </ThemedView>
            </Modal>
            <Image source={poke} style={styles.image} />
            <ThemedScrollView style={styles.pokeesContainer} showsVerticalScrollIndicator={false}>
                { pokees.map((pokee, index) => (
                    <Pressable onPress={() => setShowPokeModal(true)}>
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
        backgroundColor: 'white',
        position: 'absolute',
        height: 200,
        width: 150,
        marginTop: -100,
        marginLeft: -75,
        top: '50%',
        left: '50%',
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
