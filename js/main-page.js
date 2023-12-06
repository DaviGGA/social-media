import createNavBarDOM from "./components/nav-bar.js";
import createPostDOM from "./components/post-component.js";
import * as User from './services/user-service.js'

const divPosts = document.getElementById('div-posts');
let user;

start();

async function start() {
    await setUser();
    console.log(user)
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

const posts = [
    {
        name: "John Doe",
        likes: 12,
        description: "Hey!! I miss Windows XP"
    },
    {
        name: "Mary Poppins",
        likes: 356,
        description: "I hate Windows XP."
    }
]

createPostDOM(divPosts,posts);