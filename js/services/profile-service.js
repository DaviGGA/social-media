const token = localStorage.getItem('jwt');

const api = axios.create({
    baseURL: window.baseURL,
    headers: {'Authorization': `Bearer ${token}`}
})

export async function createProfile(data) {
    return api.post('profile/', data);    
}

export async function getProfileById(profileId) {
    return api.get(`profile/${profileId}`);
}

export async function searchProfile(searchParam) {
    return api.get(`profile/search/${searchParam}`);
}

