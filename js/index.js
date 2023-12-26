import * as User from './services/user-service.js'


redirect()

async function redirect() {
    let response;

    try {
        response = await User.getUser()
    } catch (error) {
        if (error.response == 403) {
            window.location.href = '/pages/sign-in.html'
        } 
            
        return
    }

    window.location.href = '/pages/main-page.html'
}