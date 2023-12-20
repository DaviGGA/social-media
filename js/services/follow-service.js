const token = localStorage.getItem('jwt');

const api = axios.create({
    baseURL: window.baseURL,
    headers: {'Authorization': `Bearer ${token}`}
})

export async function follow(data) {
    let response;

    try {
        response = await api.post('follow/', data);
    } catch (error) {  
        console.log(error);
        return error.response;
    }
    
    return response
}

export async function getFollowers(userId) {
    let response;

    try {
        response = await api.get(`follow/followers-count/${userId}`);
    } catch (error) {
        return error.response;
    }
    
    return response
}

export async function checkFollow(data) {
    let response;

    try {
        response = await api.post('follow/check-follow', data);
    } catch (error) {  
        console.log(error);
        return error.response;
    }
    
    return response
}

