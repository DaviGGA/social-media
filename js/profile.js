import * as User from './services/user-service.js';
import * as Profile from './services/profile-service.js';
import * as Post from './services/post-service.js';
import * as Follow from './services/follow-service.js';
import createNavBarDOM from "./components/nav-bar.js";
import createSearchProfileDOM  from "./components/search-profile-component.js";
import openPost from './components/post-modal-component.js';


let user;

let pageProfileId;

let pageProfile;

const profilePicture = document.getElementById('profile-picture');
const profileName = document.getElementById('profile-name');

const postContainer = document.getElementById('post-container');
const postModalBody = document.getElementById('body-post');

const followButton = document.getElementById('follow-button');
const followersCount = document.getElementById('followers-count');
const followingCount = document.getElementById('following-count');

const FOLLOWING = {
    true: 'Seguindo',
    false: 'Seguir'
}

start();

async function start() {
    await setUser();
    createSearchProfileDOM();
    createNavBarDOM(user);
    getProfileFromURLParam();
    await setProfileData();
    await getProfilePosts();
    await setFollowersCount();
    disableFollowButton();
    await setFollowText();
}

function disableFollowButton() {
    if (user.profile.id == pageProfileId) {
        followButton.className += " " + "d-none"
    }
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

async function setFollowText() {
    const response = await Follow.checkFollow({followingId: user.id, followedId: pageProfile.userId})

    const {following} = response.data;

    const followButtonText = following ? FOLLOWING.true : FOLLOWING.false;
    
    followButton.innerHTML = followButtonText
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

        postHTML.addEventListener('click', onClickOpenPost)

        postContainer.appendChild(postHTML);
    })

    const postCount = document.getElementById('posts-count');
    postCount.innerHTML = posts.length
}

async function onClickOpenPost(event) {
    let postId = event.target.dataset.postid;

    let response;

    try {
        response = await Post.getPostById(postId);
    } catch (error) {
        console.log(error);
        return
    }

    const post = response.data;
    openPost(post, postModalBody);
}

async function onClickFollowButton(event) {
    const response = await Follow.follow(
        {
            followingId: user.id,
            followedId: pageProfile.userId,
        }
    )

    switch(response.status) {
        case 201:
            followButton.innerHTML = FOLLOWING.true
            followersCount.innerHTML = parseInt(followersCount.innerHTML) + 1
            break;
        case 200:
            followButton.innerHTML = FOLLOWING.false
            followersCount.innerHTML = parseInt(followersCount.innerHTML) - 1
            break;
        default:
            break;
    }
}

async function setFollowersCount() {
    const response = await Follow.getFollowers(pageProfile.userId);

    if (response.status == 200) {
        const {count} = response.data;
        followersCount.innerHTML = count
    }


}



function htmlToElem(html) {
    let temp = document.createElement('template');
    html = html.trim();
    temp.innerHTML = html;
    return temp.content.firstChild;
}

followButton.addEventListener('click', onClickFollowButton);
