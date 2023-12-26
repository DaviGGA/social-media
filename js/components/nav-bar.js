const baseURL = window.baseURL;

function htmlToElem(html) {
    let temp = document.createElement('template');
    html = html.trim();
    temp.innerHTML = html;
    return temp.content.firstChild;
  }

function createNavBarDOM(user) {
    const divNavBar = document.getElementById('nav-bar'); 

    const userFullName = user.profile.name + " " + user.profile.surname;
    const profilePicture = baseURL + 'profile-picture/' + user.profile.picture

    const navBar = `
        <nav class="navbar row border-bottom">
            <div class="col-4">
                <i onclick="window.location='main-page.html'" class="h4 ms-2 c-pointer bi bi-house"></i>
                <i class="bi ms-2 h4 c-pointer bi-plus-square" data-bs-toggle="modal" data-bs-target="#create-post"></i>
                <i class="bi ms-2 h4 c-pointer bi-search" data-bs-toggle="modal" data-bs-target="#search-profile"></i>
            </div>
            <div class="col-4">

            </div>
            <div class="col-4">
            <div class="d-flex ms-2 justify-content-end align-items-center me-4">
                <img onclick="window.location='profile.html?profileId=${user.profile.id}'" class="profile-img c-pointer me-2" src="${profilePicture}" alt="" srcset="">
                <div onclick="window.location='profile.html?profileId=${user.profile.id}'" class="fw-bold c-pointer">${userFullName}</div>
            </div>
            </div>
        </nav>
    `

    const navBarHTML = htmlToElem(navBar);
    divNavBar.appendChild(navBarHTML);      
}


export default createNavBarDOM;