import { StyleSheet } from 'react-native';
import { useNavigation } from 'expo-router';
import { useState } from 'react';
import ProfileInfos from '@/components/login/ProfileInfos';
import VisibilityOption from '@/components/login/VisibilityOption';
import WorkoutInfos from '@/components/login/WorkoutInfos';
import ThemedButton from '@/components/ThemedButton';
import { ThemedView } from '@/components/ThemedView';
import ShameOption from '@/components/login/ShameOption';

enum LOGIN_STAGE {
  PROFILE = 'PROFILE',
  VISIBILITY = 'VISIBILITY',
  WORKOUT = 'WORKOUT',
  SHAME = 'SHAME'
}

export default function LoginScreen() {
  const navigation = useNavigation();
  const [stage, setStage] = useState<LOGIN_STAGE>(LOGIN_STAGE.PROFILE);

  return (
    <ThemedView style={styles.container}  >
      {
        stage === LOGIN_STAGE.PROFILE ? 
        <ProfileInfos /> : 
        stage === LOGIN_STAGE.VISIBILITY ? 
        <VisibilityOption /> : 
        stage === LOGIN_STAGE.WORKOUT ? 
        <WorkoutInfos /> : <ShameOption />
      }
      <ThemedButton 
        title="Complete" 
        onPress={() => {
          stage === LOGIN_STAGE.PROFILE ? setStage(LOGIN_STAGE.VISIBILITY) :
          stage === LOGIN_STAGE.VISIBILITY ? setStage(LOGIN_STAGE.WORKOUT) :
          stage === LOGIN_STAGE.WORKOUT ? setStage(LOGIN_STAGE.SHAME) :
          navigation.navigate('(tabs)')
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
});