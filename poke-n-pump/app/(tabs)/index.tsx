import { Image, StyleSheet } from 'react-native';
import { ThemedView } from '@/components/themedComponents/ThemedView';
import PokeList from '@/components/tabs/index/PokeList';
import logo from '@/assets/images/logo.png';
import { useState, useEffect } from 'react';
import ProfileContainer from '@/components/tabs/index/ProfileContainer';
import StartWorkoutButton from '@/components/tabs/index/StartWorkoutButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserInfo } from '@/hooks/useAPI';

export default function HomeScreen() {
  const [didWorkout, setDidworkout] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('id').then((res) => {
      if (res === null) {
        return;
      }
      getUserInfo(res).then((res) => {
        setDidworkout(res.data.todayAttendance);
      });
    });
  }, []);

  return (
    <ThemedView style={styles.homeView}>
      <Image source={logo} style={styles.image} />
      <ProfileContainer />
      <PokeList didWorkout={didWorkout}/>
      {didWorkout ? null : <StartWorkoutButton setDidWorkout={setDidworkout}/>}
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
