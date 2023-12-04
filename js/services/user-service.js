

const api = axios.create({
    baseURL: window.baseURL,
})


export async function createUser({username,password,confirmPassword}) {
    return api.post('user/',{username,password,confirmPassword});    
}

export async function login({username,password}) {
    return api.post('user/login',{username,password});    
}