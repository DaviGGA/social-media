import createNavBarDOM from "./components/nav-bar.js";
import createPostDOM from "./components/post-component.js";
import * as User from './services/user-service.js';
import * as Post from './services/post-service.js';

export const divPosts = document.getElementById('div-posts');
const publishPost = document.getElementById('publish-post');

let user;

start();

// FUNCTIONS

async function start() {
    await setUser();
    await setFeed();
    
    createNavBarDOM(user);
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

async function onClickPublishButton(event) {
    event.preventDefault();

    const description = document.getElementById('input-description').value;
    const postImage = document.getElementById('input-image').files[0];

    const data = new FormData();
    data.append('description', description);
    data.append('postImage', postImage);

    try {
        const response = await Post.createPost(data);
        
    } catch (error) {
        const errorMessage = error.response.data.message;
        toastr.error(errorMessage);      
        console.log(error);
        
        return
    }

    await setFeed();
}

async function setFeed() {
    let posts;

    try {
        const response = await Post.feed();
        posts = response.data;

    } catch (error) {
        const statusCode = error.response.status;
        const errorMessage = error.response.data.message;
        // toastr.error(errorMessage);      
        console.log(error);
    }

    console.log(posts);

    divPosts.innerHTML = '';
    createPostDOM(posts);
}

// EVENTS

publishPost.addEventListener("click", onClickPublishButton)