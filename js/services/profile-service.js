const token = localStorage.getItem('jwt');

const api = axios.create({
    baseURL: window.baseURL,
    headers: {'Authorization': `Bearer ${token}`}
})

export async function createProfile(data) {
    return api.post('profile/', data);    
}

export async function getProfileByUserId(userId) {
    return api.get(`profile/${userId}`);
}