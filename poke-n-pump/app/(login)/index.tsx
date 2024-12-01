import { StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import ProfileInfos from '@/components/login/ProfileInfos';
import VisibilityOption from '@/components/login/VisibilityOption';
import WorkoutInfos from '@/components/login/WorkoutInfos';
import ThemedButton from '@/components/themedComponents/ThemedButton';
import { ThemedView } from '@/components/themedComponents/ThemedView';
import ShameOption from '@/components/login/ShameOption';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addUser, addAndStoreUser } from '@/hooks/useAPI';
import usePushNotifications from '@/hooks/usePushNotifications';
import { updateUser } from '@/hooks/useAsyncStorage';

enum LOGIN_STAGE {
  PROFILE = 'PROFILE',
  VISIBILITY = 'VISIBILITY',
  WORKOUT = 'WORKOUT',
  SHAME = 'SHAME'
}

export default function LoginScreen() {
  const [stage, setStage] = useState<LOGIN_STAGE>(LOGIN_STAGE.PROFILE);

  const [isLoading, setIsLoading] = useState(true);

  const [enableCompleteButton, setEnableCompleteButton] = useState(true);
  const notificationToken = usePushNotifications().expoPushToken;

  const [visibility, setVisibility] = useState('friend');
  const [workoutDays, setWorkoutDays] = useState([]);
  const [shame, setShame] = useState(false);
  const [noGymStreakLimit, setNoGymStreakLimit] = useState(1);

  function finishOnboarding() {
    AsyncStorage.getItem('username').then((res) => {
      const nickname = res || 'John Doe';
      const workoutPlan = { "daysOfWeek": workoutDays};

      const data = {
        nickname: nickname,
        shamePostSettings: {
          isEnabled: shame,
          noGymStreakLimit: noGymStreakLimit
        },
        workoutPlan: workoutPlan,
        expoPushToken: notificationToken,
        visibility: visibility,
      };

      addAndStoreUser(data).then((res) => {
        router.replace('/(tabs)')
      });
    });
  }

  useEffect(() => {
    AsyncStorage.getItem('user').then((res) => {
      if (res) {
        router.replace('/(tabs)');
      } else {
        setIsLoading(false);
      }
    });
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <ThemedView style={styles.container}  >
      {
        stage === LOGIN_STAGE.PROFILE ? 
        <ProfileInfos enableCompleteButton={setEnableCompleteButton}/> : 
        stage === LOGIN_STAGE.VISIBILITY ? 
        <VisibilityOption 
          visibility={visibility} 
          setVisibility={setVisibility} 
        /> : 
        stage === LOGIN_STAGE.WORKOUT ? 
        <WorkoutInfos 
          workoutDays={workoutDays} 
          setWorkoutDays={setWorkoutDays}
        /> :
        <ShameOption 
          shame={shame}
          setShame={setShame}
          noGymStreakLimit={noGymStreakLimit}
          setNoGymStreakLimit={setNoGymStreakLimit}
        />
      }
      <ThemedButton 
        title="Complete"
        style={styles.completeButton}
        disabled={!enableCompleteButton}
        onPress={() => {
          stage === LOGIN_STAGE.PROFILE ? setStage(LOGIN_STAGE.VISIBILITY) :
          stage === LOGIN_STAGE.VISIBILITY ? setStage(LOGIN_STAGE.WORKOUT) :
          stage === LOGIN_STAGE.WORKOUT ? setStage(LOGIN_STAGE.SHAME) :
          finishOnboarding();
        }} 
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  completeButton: {
    // paddingTop: 20,
  }
});
