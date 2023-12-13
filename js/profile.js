import * as User from './services/user-service.js';
import * as Profile from './services/profile-service.js';
import * as Post from './services/post-service.js';
import createNavBarDOM from "./components/nav-bar.js";


let user;

let pageProfileId;

let pageProfile;

const profilePicture = document.getElementById('profile-picture');
const profileName = document.getElementById('profile-name');

const postContainer = document.getElementById('post-container');

start();

async function start() {
    await setUser();
    createNavBarDOM(user);
    
    getProfileFromURLParam();
    await setProfileData();
    await getProfilePosts();
}

function getProfileFromURLParam() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    pageProfileId = urlParams.get('profileId');
}

async function setProfileData() {
    try {
        const response = await Profile.getProfileById(pageProfileId);
        pageProfile = response.data;
    } catch (error) {
        const statusCode = error.response.status;
        if (statusCode == 403) {
            window.location.href = '/pages/sign-in.html'
        }
        const errorMessage = error.response.data.message;
        // toastr.error(errorMessage);      
        console.log(error);
        return
    }

    profilePicture.src = pageProfile.picture ? 
    window.baseURL + 'profile-picture/' + pageProfile.picture : '../imgs/blank-profile-picture.png'
    
    profileName.innerHTML = pageProfile.name + " " + pageProfile.surname;
}

async function setUser() {
    try {
        const response = await User.getUser();
        user = response.data;
    } catch (error) {
        const statusCode = error.response.status;
        if (statusCode == 403) {
            window.location.href = '/pages/sign-in.html'
        }
        const errorMessage = error.response.data.message;
        // toastr.error(errorMessage);      
        console.log(error);
    }
}

async function getProfilePosts() {
    let posts;

    try {
        const response = await Post.getPostsByUserId(pageProfile.userId);
        posts = response.data;
    } catch (error) {
        const statusCode = error.response.status;
        if (statusCode == 403) {
            window.location.href = '/pages/sign-in.html'
        }
        const errorMessage = error.response.data.message;
        // toastr.error(errorMessage);      
        console.log(error);
        return
    }

    setPosts(posts);

}

function setPosts(posts) {
    posts.forEach(post => {
        const postImage = window.baseURL + 'post-image/' + post.image;

        const postString = `<img data-postid="${post.id}" class="c-pointer post-image" data-bs-toggle="modal" data-bs-target="#see-post" src="${postImage}" alt="">`;
        const postHTML = htmlToElem(postString);

        postContainer.appendChild(postHTML);
    })

    const postCount = document.getElementById('posts-count');
    postCount.innerHTML = `${posts.length} publicações`
}

function htmlToElem(html) {
    let temp = document.createElement('template');
    html = html.trim();
    temp.innerHTML = html;
    return temp.content.firstChild;
}
