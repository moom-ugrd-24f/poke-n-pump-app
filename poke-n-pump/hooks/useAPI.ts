import axios from 'axios';
import { FRIEND_REQUEST_URL, USER_URL, CHECK_USERNAME_URL, POKE_URL, WEEKLY_RANKING_URL } from '@/constants/url';
import { getUser, updateUser as updateLocalUser } from '@/hooks/useAsyncStorage';

interface UserData {
    nickname: string;
    shamePostSettings: Object;
    workoutPlan: Object;
    expoPushToken: string;
    visibility: string;
    // profilePicture: any;
    xp: number;
}

export const addUser = (data: UserData) => {
    const formData = new FormData();
    formData.append('nickname', data.nickname);
    formData.append('visibility', data.visibility);
    formData.append('shamePostSettings', JSON.stringify(data.shamePostSettings));
    formData.append('workoutPlan', JSON.stringify(data.workoutPlan));
    formData.append('expoPushToken', data.expoPushToken);
    // if (data.profilePicture) {
    //     formData.append('profilePicture', data.profilePicture);
    // }

    return axios.post(USER_URL, formData, {headers: { 'Content-Type': 'multipart/form-data' },}).then((res) => {
        return res;
    }).catch((error) => {
        return { data: 'Error while adding user', status: 400 };
    });
}

export const addAndStoreUser = (data: UserData) => {
    return addUser(data).then((res) => {
        if (res.status !== 400) {
            updateLocalUser(res.data);
            console.log('User added successfully: ', res.data);
        }
        return res;
    });
}

export const updateUser = (data: any, userId: string) => {
    const updateUserUrl = USER_URL + '/' + userId;
    
    const body = JSON.parse("{}");
    if (data.nickname) body["nickname"] = data.nickname;
    if (data.visibility) body["visibility"] = data.visibility;
    if (data.shamePostSettings) body["shamePostSettings"] = data.shamePostSettings;
    if (data.workoutPlan) body["workoutPlan"] = data.workoutPlan;
    if (data.expoPushToken) body["expoPushToken"] = data.expoPushToken;
    if (data.profilePicture) body["profilePicture"] = data.profilePicture;
    if (data.xp) body["xp"] = data.xp.toString();
    if (data.shamePostCount) body["shamePostCount"] = data.shamePostCount.toString();

    return axios.put(updateUserUrl, body, {headers: { 'Content-Type': 'application/json' },}).then((res) => {
        return res;
    }).catch((error) => {
        return { data: 'Error while updating user information: ' + error, status: 400 };
    });
}

export const updateAndStoreUser = (data: any, userId: string) => {
    return updateUser(data, userId).then((res) => {
        if (res.status !== 400) {
            updateLocalUser(res.data);
            console.log('User updated successfully: ', res.data);
        }
        return res;
    });
}

export const updateXp = (userId: string, xp: number) => {
    return updateAndStoreUser({ xp: xp }, userId);
}

export const incrementXp = (userId: string, xp: number) => {
    getUser().then((res) => {
        if (res) {
            updateXp(userId, res.xp + xp);
        }
    });
}

export const incrementShamePost = (userId: string) => {
    getUser().then((res) => {
        if (res) {
            updateAndStoreUser({ 
                shamePostCount: res.shamePostCount + 1,
                xp: res.xp + 50
            }, userId);
        }
    });
}

export const deleteUser = (userId: string) => {
    const deleteUserUrl = USER_URL + '/' + userId;
    return axios.delete(deleteUserUrl).then((res) => {
        return res;
    }).catch((error) => {
        return { data: 'Error while deleting user', status: 400 };
    });
}

export const checkUsername = (username: string) => {
    const checkUsernameUrl = CHECK_USERNAME_URL + '/' + username;
    return axios.get(checkUsernameUrl).then((res) => {
        return res;
    }).catch((error) => {
        return { data: 'Error while checking username availability', status: 400 };
    });
}

export const getUserInfo = (userId: string) => {
    const getUserInfoUrl = USER_URL + '/' + userId;
    return axios.get(getUserInfoUrl).then((res) => {
        console.log('User info: ', res.data);
        return res;
    }).catch((error) => {
        if (axios.isAxiosError(error)) console.log(error.response);
        return { data: 'Error while fetching user info', status: 400 };
    });
}

export const getPokeeList = (userId: string) => {
    const getPokeeListUrl = USER_URL + '/' + userId + '/poke-list';
    return axios.get(getPokeeListUrl).then((res) => {
        return res;
    }).catch((error) => {
        return { data: 'Error while fetching pokees', status: 400 };
    });
}

export const sendPoke = (senderId: string, receiverId: string, pokeType: string) => {
    return axios.post(POKE_URL, { senderId: senderId, receiverId: receiverId, pokeType: pokeType }).then((res) => {
        return res;
    }).catch((error) => {
        return { data: 'Error while sending poke', status: 400 };
    });
}

export const sendFriendRequest = (userId: string, friendCode: string) => {
    const sendFriendRequestUrl = FRIEND_REQUEST_URL + '/send';
    return axios.post(sendFriendRequestUrl, { senderId: userId, receiverInviteCode: friendCode }).then((res) => {
        return res;
    }).catch((error) => {
        return { data: 'Error while sending friend request', status: 400 };
    });
}

export const getReceivedRequests = (userId: string) => {
    const getReceivedRequestsUrl = FRIEND_REQUEST_URL + '/' + userId + '/received-requests';
    return axios.get(getReceivedRequestsUrl).then((res) => {
        return res;
    }).catch((error) => {
        return { data: 'Error while fetching received requests', status: 400 };
    });
}

export const acceptFriendRequest = (requestId: string) => {
    const acceptFriendRequestUrl = FRIEND_REQUEST_URL + '/accept';
    return axios.post(acceptFriendRequestUrl, { requestId }).then((res) => {
        return res;
    }).catch((error) => {
        return { data: 'Error while accepting friend request', status: 400 };
    });
}

export const removeFriend = (userId: string, id: string) => {
    const removeFriendUrl = USER_URL + '/' + userId + '/remove-friend';
    return axios.post(removeFriendUrl, { friendId: id }).then((res) => {
        return res;
    }).catch((error) => {
        return { data: 'Error while removing friend request', status: 400 };
    });
}

export const completeWorkout = (userId: string) => {
    const completeWorkoutUrl = USER_URL + '/' + userId + '/complete-workout';
    return axios.post(completeWorkoutUrl).then((res) => {
        return res;
    }).catch((error) => {
        return { data: 'Error while completing workout', status: 400 };
    });
}

export const getWeeklyRanking = (userId: string) => {
    const getWeeklyRankingUrl = WEEKLY_RANKING_URL + '/' + userId;
    return axios.get(getWeeklyRankingUrl).then((res) => {
        return res;
    }).catch((error) => {
        return { data: 'Error while fetching weekly ranking', status: 400 };
    });
}
