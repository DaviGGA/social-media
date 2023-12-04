import * as User from '../js/services/user-service.js';

const loginButton = document.getElementById('login-button');


// FUNCTIONS
async function onClickLogin(event) {
    event.preventDefault();

    const username = document.getElementById('input-user').value;
    const password = document.getElementById('input-password').value;

    let jwt;
    try {
        const response = await User.login({username,password});
        jwt = response.data.token;
        
    } catch (error) {
        const errorMessage = error.response.data.message;
        toastr.error(errorMessage);
 
        console.log(error);
        
        return
    }

    toastr.success("Login realizado com sucesso!");
    localStorage.setItem('jwt',jwt);
}

// EVENTS
loginButton.addEventListener("click", onClickLogin);
