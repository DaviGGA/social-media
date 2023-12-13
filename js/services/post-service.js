const token = localStorage.getItem('jwt');

const api = axios.create({
    baseURL: window.baseURL,
    headers: {'Authorization': `Bearer ${token}`}
})

export async function createPost(data) {
    return api.post('post/', data);    
}

export async function getPostsByUserId(userId) {
    return api.get('post/' + userId)
}

export async function feed() {
    return api.get('post/feed/');
}