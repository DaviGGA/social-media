import * as User from '../js/services/user-service.js';

const loginButton = document.getElementById('login-button');


// FUNCTIONS
async function onClickLogin(event) {
    event.preventDefault();

    const username = document.getElementById('input-user').value;
    const password = document.getElementById('input-password').value;

    let jwt;
    let profile;
    try {
        const response = await User.login({username,password});
        jwt = response.data.token;
        profile = response.data.user.profile;
    } catch (error) {
        const errorMessage = error.response.data.message;
        toastr.error(errorMessage);

        console.log(error);
        
        return
    }

    localStorage.setItem('jwt',jwt);

    if(profile) {
        setTimeout(() => {moveTo('main-page')},1500)
        return 
    }

    setTimeout(() => {moveTo('create-profile')},1500);
}

function moveTo(page) {
    window.location.href = `/pages/${page}.html`
}

// EVENTS
loginButton.addEventListener("click", onClickLogin);
