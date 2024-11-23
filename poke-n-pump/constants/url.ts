// export const BASE_URL = 'http://43.203.52.26:3000';
// export const BASE_URL = 'http://localhost:3000';
export const BASE_URL = 'http://172.30.1.98:3000';

export const API_BASE_URL = BASE_URL + '/api';

export const USER_URL = API_BASE_URL + '/users';
export const WEEKLY_RANKING_URL = USER_URL + '/weekly-ranking';
export const CHECK_USERNAME_URL = USER_URL + '/exists';

export const FRIEND_REQUEST_URL = API_BASE_URL + '/friend-requests';

export const POKE_URL = API_BASE_URL + '/pokes';