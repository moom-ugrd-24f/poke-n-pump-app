import AsyncStorage from "@react-native-async-storage/async-storage";

export const updateXp = async (xp: number) => {
    try {
        const userId = await AsyncStorage.getItem('id');
        if (!userId) {
            console.error('User ID not found. XP update aborted.');
            return;
        }
        const prevXp = await AsyncStorage.getItem('xp');
        const newXp = (parseInt(prevXp || '0', 10) + xp).toString();
        await AsyncStorage.setItem('xp', newXp);
    } catch (error) {
        console.error('Error updating XP:', error);
    }
};