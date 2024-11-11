import { StyleSheet, Image } from 'react-native';
import poke from '../../../assets/images/poke.png';
import { ThemedView } from '../../ThemedView';
import { ThemedText } from '../../ThemedText';
import { ThemedScrollView } from '../../ThemedScrollView';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

export default function PokeList() {
    const colorScheme = useColorScheme();

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
            <Image source={poke} style={styles.image} />
            <ThemedScrollView style={styles.pokeesContainer} showsVerticalScrollIndicator={false}>
                { pokees.map((pokee, index) => (
                    <ThemedView
                        key={index}
                        style={styles.pokeeContainer}
                        lightColor={Colors[colorScheme ?? 'light'].mainLight}
                        darkColor={Colors[colorScheme ?? 'dark'].mainLight}
                        lightBorderColor={Colors[colorScheme ?? 'light'].mainLight}
                        darkBorderColor={Colors[colorScheme ?? 'dark'].mainLight}
                    >
                        <ThemedText type='default' lightColor={Colors[colorScheme ?? 'light'].reverse} darkColor={Colors[colorScheme ?? 'light'].reverse}>{pokee.name}</ThemedText>
                    </ThemedView>
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
});
