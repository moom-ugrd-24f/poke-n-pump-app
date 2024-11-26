import { Image, StyleSheet } from 'react-native';
import { ThemedView } from '@/components/themedComponents/ThemedView';
import PokeList from '@/components/tabs/index/PokeList';
import logo from '@/assets/images/logo.png';
import ProfileContainer from '@/components/tabs/index/ProfileContainer';
import StartWorkoutButton from '@/components/tabs/index/StartWorkoutButton';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen() {

  useEffect(() => {
    AsyncStorage.getAllKeys().then((keys) => {
      // log all keys and values
      keys.map((key) => {
        AsyncStorage.getItem(key).then((value) => {
          console.log(key, value);
        });
      });
    });
  }, []);

  return (
    <ThemedView style={styles.homeView}>
      <Image source={logo} style={styles.image} />
      <ProfileContainer />
      <PokeList />
      <StartWorkoutButton />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  homeView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: '5%',
  },
  image: {
    width: '100%',
    height: undefined,
    aspectRatio: 958 / 260,
    resizeMode: 'contain',
  },
});
