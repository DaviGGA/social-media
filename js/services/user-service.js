

const api = axios.create({
    baseURL: window.baseURL,
})

const user = 'user/'

export async function createUser({username,password,confirmPassword}) {
    return api.post(user,{username,password,confirmPassword});    
}