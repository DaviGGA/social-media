const token = localStorage.getItem('jwt');

const api = axios.create({
    baseURL: window.baseURL,
    headers: {'Authorization': `Bearer ${token}`}
})

export async function createComment(data) {
    let response;
    
    try {
        response = await api.post('comment/', data);
    } catch (error) {
        const statusCode = error.response.status;
        const errorMessage = error.response.data.message;
        console.log(error);
        return error;
    }
    
    return response
}

export async function getPostComments(postId) {
    let response;
    
    try {
        response = await api.get(`comment/${postId}`);
    } catch (error) {
        const errorMessage = error.response.data.message;
        console.log(error);
        return error;
    }
    
    return response;
}