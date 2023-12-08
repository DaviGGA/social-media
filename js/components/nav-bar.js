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
            <div class="col-4"></div>
            <div class="col-4"></div>
            <div class="col-4 ">
            <div class="d-flex ms-2 justify-content-end align-items-center me-4">
                <img class="profile-img me-2" src="${profilePicture}" alt="" srcset="">
                <div class="fw-bold">${userFullName}</div>
            </div>
            </div>
        </nav>
    `

    const navBarHTML = htmlToElem(navBar);
    divNavBar.appendChild(navBarHTML);      
}


export default createNavBarDOM;