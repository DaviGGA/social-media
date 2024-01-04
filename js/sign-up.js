import * as User from '../js/services/user-service.js';

const createAccountBtn = document.getElementById('create-account');

// FUNCTIONS
async function onClickCreateUser(event) {
    event.preventDefault();

    const username = document.getElementById('input-user').value;
    const password = document.getElementById('input-password').value;
    const confirmPassword = document.getElementById('input-confirm-password').value;

    const hasBlankFields = !username || !password || !confirmPassword
    if (hasBlankFields) {
        toastr.info("Não deixe nenhum campo vazio!")
        return
    }

    try {
        const response = await User.createUser({username,password,confirmPassword});
        
    } catch (error) {
        const errorMessage = error.response.data.message;
        toastr.error(errorMessage);
        
        console.log(error);
        
        return
    }

    toastr.success("Usuário criado com sucesso!");
   
    setTimeout(moveToLoginPage,3000);
}

function moveToLoginPage() {
    window.location.href = '/pages/sign-in.html'
}

// EVENTS
createAccountBtn.addEventListener('click', onClickCreateUser)