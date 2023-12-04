import createPostDOM from "./components/post-component.js";

const divPosts = document.getElementById('div-posts');

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