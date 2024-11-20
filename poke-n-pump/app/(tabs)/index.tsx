import { Image, StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import PokeList from '@/components/tabs/index/PokeList';
import logo from '@/assets/images/logo.png';
import ProfileContainer from '@/components/tabs/index/ProfileContainer';
import StartWorkoutButton from '@/components/tabs/index/StartWorkoutButton';

export default function HomeScreen() {

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
