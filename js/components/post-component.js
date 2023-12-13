const baseURL = window.baseURL;
import * as Like from '../services/like-service.js';
import { divPosts } from '../main-page.js';

function htmlToElem(html) {
    let temp = document.createElement('template');
    html = html.trim();
    temp.innerHTML = html;
    return temp.content.firstChild;
}

function createPostDOM(posts) {

    for (let post of posts) {
        const userFullName = post.profile.name + " " + post.profile.surname;
        
        const profilePicture = post.profile.picture ? 
        baseURL + 'profile-picture/' + post.profile.picture : '../imgs/blank-profile-picture.png'
        
        const postImage = baseURL + 'post-image/' + post.image;

        const heartIcon = post.userLiked ? 'bi bi-heart-fill me-1' : 'bi bi-heart me-1'

        const postString = `
            <div id="post-${post.id}" class="card mt-3">
                <div class="card-body">
                    <div class="row border-bottom pb-2 justify-content-between">
                        <div class="col-6 d-flex align-items-center">
                            <img class="profile-img me-2" src="${profilePicture}" alt="">
                            <div class="fw-bold">${userFullName}</div>
                        </div>
                        <div class="col-3 d-flex justify-content-end align-self-center">
                            <i class="bi bi-three-dots"></i>
                        </div>
                    </div>
                    <div class="row mt-2">
                        <div class="col-12">
                            <img class="post-img" src="${postImage}" alt="">
                        </div>
                    </div>
                    <div class="row mt-2 justify-content-between">
                        <div class="col-3">
                            <div id="like-button" data-postId = ${post.id} class="d-flex c-pointer align-items-center">
                                <i id="heart-icon" data-postId = ${post.id} class="${heartIcon}"></i>
                            </div>
                        </div>
                        <div class="col-3 d-flex justify-content-end align-self-center">
                            <i class="bi bi-bookmark"></i>
                        </div>
                    </div>
                    <div class="row mt-2">
                        <div style="font-size: 14px;" class="col-12 d-flex">
                            Curtido por <div id="like-count" class="mx-1 fw-bold">${post.likes.length}</div> pessoas. 
                        </div>
                    </div>
                    <div class="row mt-2">
                        <div style="font-size: 14px;" class="col-12 d-flex">
                            <div class="fw-bold me-2">${userFullName}</div> ${post.description}
                        </div>
                    </div>
                </div>
            </div>
        `

        const postHTML = htmlToElem(postString);
        
        

        divPosts.appendChild(postHTML);      
    }

    
    const likeButtons = divPosts.querySelectorAll('#like-button');

    for (let button of likeButtons) {
        button.addEventListener("click", onCLickLikePost);
    }
}

async function onCLickLikePost(event) {
    const postId = parseInt(event.target.dataset.postid);

    let liked;
    try {
        const response = await Like.likePost(postId);
        liked = response.data.liked;
    } catch (error) {
        const errorMessage = error.response.data.message;
        // toastr.error(errorMessage);      
        console.log(error);
    }

    updateLikes(liked,postId);
    
}

async function updateLikes(liked, postId) {
    let divPostId = 'post-' + postId;

    const posts = divPosts.childNodes;

    for (let post of posts) {
        if (post.id == divPostId) {
            const likeCount = post.querySelector('#like-count');
            likeCount.innerHTML = liked ? parseInt(likeCount.innerHTML) + 1 : parseInt(likeCount.innerHTML) - 1;

            const heartIcon = post.querySelector('#heart-icon');
           heartIcon.className = liked ? 'bi bi-heart-fill me-1' : 'bi bi-heart me-1';
        }
    }
    
    
}


export default createPostDOM;