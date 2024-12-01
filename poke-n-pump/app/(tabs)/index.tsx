import { Image, StyleSheet } from 'react-native';
import { ThemedView } from '@/components/themedComponents/ThemedView';
import PokeList from '@/components/tabs/index/PokeList';
import logo from '@/assets/images/logo.png';
import { useState, useEffect } from 'react';
import ProfileContainer from '@/components/tabs/index/ProfileContainer';
import StartWorkoutButton from '@/components/tabs/index/StartWorkoutButton';
import { getUserInfo } from '@/hooks/useAPI';
import { getUserId } from '@/hooks/useAsyncStorage';

export default function HomeScreen() {
  const [didWorkout, setDidworkout] = useState(false);

  const [userId, setUserId] = useState('');

  useEffect(() => {
    getUserId().then((res) => {
      setUserId(res || '');
    });
  }, []);

  useEffect(() => {
    if (userId === '') return;
    getUserInfo(userId).then((res) => {
      setDidworkout(res.data.todayAttendance);
    });
  }, [userId]);

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
  },
  image: {
    width: '100%',
    height: undefined,
    aspectRatio: 958 / 260,
    resizeMode: 'contain',
  },
});
