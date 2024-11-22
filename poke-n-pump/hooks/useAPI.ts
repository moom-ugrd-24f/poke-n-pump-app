import axios from 'axios';
import { FRIEND_REQUEST_URL, USER_URL } from '@/constants/url';

interface UserData {
    nickname: string;
    shamePostSettings: Object;
    workoutPlan: Object;
    expoPushToken: string;
}

export const addUser = (data: UserData) => {
    const formData = new FormData();
    formData.append('nickname', data.nickname);
    formData.append('shamePostSettings', JSON.stringify(data.shamePostSettings));
    formData.append('workoutPlan', JSON.stringify(data.workoutPlan));
    formData.append('expoPushToken', data.expoPushToken);

    return axios.post(USER_URL, formData, {headers: { 'Content-Type': 'multipart/form-data' },}).then((res) => {
        return res;
    }).catch((error) => {
        return { data: 'Error while adding user', status: 400 };
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
