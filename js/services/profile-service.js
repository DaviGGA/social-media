
const token = localStorage.getItem('jwt');

const api = axios.create({
    baseURL: window.baseURL,
    headers: {'Authorization': `Bearer ${token}`}
})

export async function createProfile({name, surname}) {
    return api.post('profile/', {name, surname});    
}