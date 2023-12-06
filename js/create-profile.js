import * as Profile from './services/profile-service.js';

const createProfileButton = document.getElementById('create-profile-btn');
const profileImg = document.getElementById('profile-img');
const inputFile = document.getElementById('input-file');

// FUNCTIONS

async function onChangeInputFile(event) {
    const file = inputFile.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
        profileImg.src = reader.result
    }

    if (file) {
        reader.readAsDataURL(file);
    } 
}

async function onClickCreateProfile(event) {
    event.preventDefault();

    const name = document.getElementById('input-name').value;
    const surname = document.getElementById('input-surname').value;
    const profilePicture = inputFile.files[0];

    const data = new FormData();
    data.append('name', name);
    data.append('surname', surname);
    data.append('profilePicture', profilePicture);

    try {
        const response = await Profile.createProfile(data);
        
    } catch (error) {
        const errorMessage = error.response.data.message;
        toastr.error(errorMessage);      
        console.log(error);
        
        return
    }

    toastr.success("Perfil criado com sucesso!");
    setTimeout(moveToMainPage,1500);
}

function moveToMainPage() {
    window.location.href = '/pages/main-page.html'
}

async function onClickProfileImg() {
    inputFile.click();
}

// EVENTS
createProfileButton.addEventListener("click", onClickCreateProfile);
profileImg.addEventListener("click", onClickProfileImg);
inputFile.addEventListener("change",onChangeInputFile);
