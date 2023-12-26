const baseURL = window.baseURL;

import * as Profile from '../services/profile-service.js'


function htmlToElem(html) {
    let temp = document.createElement('template');
    html = html.trim();
    temp.innerHTML = html;
    return temp.content.firstChild;
}

let modalHTML;
let searchInput;
let searchButton;
let searchedProfiles;

function createSearchProfileDOM() {
    const modalSelector = document.getElementById('content-search-profile');

    const modalString = `
    <div>
        <div class="modal-header">
            <div style="width: 100%;" class="d-flex justify-content-between">
                <input id="input-search-profile" style="width: 80%;" type="text" class="form-control">
                <button id="search-profile-button" class="btn btn-primary">Buscar</button>
            </div>
        </div>
        <div style="height:500px; overflow-y: scroll;" class="modal-body">
            <div class="c-pointer" id="searched-profiles">
            </div>
        </div>
    </div>
    `

    modalHTML = htmlToElem(modalString);

    searchInput = modalHTML.querySelector('#input-search-profile');

    searchButton = modalHTML.querySelector('#search-profile-button');
    searchButton.addEventListener('click', onSearchClicked);

    searchedProfiles = modalHTML.querySelector('#searched-profiles')

    modalSelector.appendChild(modalHTML);
}

export default createSearchProfileDOM;


async function onSearchClicked(event) {
    const searchParam = searchInput.value;

    const response = await Profile.searchProfile(searchParam);
    const profiles = response.data;
    
    searchedProfiles.innerHTML = '';
    profiles.forEach(setProfile);
    
}

function setProfile(p) {
    const fullName = p.name + " " + p.surname;
    const profilePicture = p.picture ? 
    baseURL + 'profile-picture/' + p.picture : '../imgs/blank-profile-picture.png'


    const profileString = `
        <a href="profile.html?profileId=${p.id}">
            <div class="d-flex mt-2 align-items-center">
                <img class="profile-img-40 me-2" src="${profilePicture}" alt="" srcset="">
                <div class="fw-bold">${fullName}</div>
            </div>
        </a>
    `

    const profileHTML = htmlToElem(profileString);
    searchedProfiles.appendChild(profileHTML);


}
