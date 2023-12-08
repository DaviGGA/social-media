const token = localStorage.getItem('jwt');

const api = axios.create({
    baseURL: window.baseURL,
    headers: {'Authorization': `Bearer ${token}`}
})

export async function likePost(postId) {
    return api.post('like/', {postId});    
}