import * as Like from '../services/like-service.js';
import * as Comment from '../services/comment-service.js';

function htmlToElem(html) {
    let temp = document.createElement('template');
    html = html.trim();
    temp.innerHTML = html;
    return temp.content.firstChild;
}

let postModalBody;

function openPost(post,selector) {
    postModalBody = selector;

    const profilePicture = post.user.profile.picture ? 
    window.baseURL + 'profile-picture/' + post.user.profile.picture : '../imgs/blank-profile-picture.png';

    const fullName = post.user.profile.name + " " + post.user.profile.surname;

    const postImage = window.baseURL + 'post-image/' + post.image;

    const heartIcon = post.userLiked ? 'bi bi-heart-fill me-1' : 'bi bi-heart me-1'

    const postString = `
    <div class="modal-body">
        <div class="row">
            <div  style="height:500px"  class="col-6">
                <img style="width: 100%;height: 100%" src="${postImage}" alt="" srcset="">
            </div>
            <div  style="height:500px" class="col-6">
                <div style="height:50px" class="row border-bottom pb-2">
                    <div class="d-flex align-items-center col-12">
                        <img class="profile-img-40" src="${profilePicture}" alt="" srcset="">
                        <div class="fw-bold ms-2">John Doe</div>
                    </div>
                </div>
                <div style="height:357px;overflow-y: auto;overflow-x: hidden;" id="comments" class="d-flex flex-column justify-content-between ">
                    <div class="row mt-3">
                        <div style="width: 100%;" class="d-flex align-items-center col-12">
                            <img class="profile-img-40" src="${profilePicture}" alt="" srcset="">
                            <div class="fw-bold ms-2">${fullName}</div>
                            <div class="ms-2">
                                ${post.description}
                            </div>
                        </div>
                        <div id="comments-section">
                            ${getComments(post.comments)}          
                        </div>
                    </div>
                    <div class="row mt-3">

                    </div>
                </div>
                <div class="modal-footer">
                    <div class="col-12 d-flex flex-column">
                    <input id="create-comment" data-postid="${post.id}" type="text" placeholder="Deixe um comentário..." class="form form-control">
                    <div class="mt-3 d-flex">
                        <div id="like-button-modal" data-postId = ${post.id} class="d-flex me-2 c-pointer">
                            <i id="heart-icon-modal" data-postId = ${post.id} class="${heartIcon}"></i>
                        </div>
                        <div>
                            <i class="bi bi-bookmark"></i>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `

    const postHTML = htmlToElem(postString);

    postModalBody.innerHTML = '';
    postModalBody.appendChild(postHTML);

    const likeButton = document.getElementById('like-button-modal');
    likeButton.addEventListener('click', onCLickLikePost)

    const commentButton = document.getElementById('create-comment');
    commentButton.addEventListener('keydown', onEnterComment)
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

    updateLike(liked);   
}

async function onEnterComment(event) {
    const text = event.target.value;
    if (text === '') return;

    if (event.key == 'Enter') {     
        const postId = parseInt(event.target.dataset.postid);
        const response = await Comment.createComment({text,postId})

        event.target.value = '';
        
        let comments = await Comment.getPostComments(postId);
        comments = comments.data
        
        const commentsDiv = document.querySelector('#comments-section');
        
        commentsDiv.innerHTML = '';
        commentsDiv.innerHTML = getComments(comments);
    }
}


async function updateLike(liked) {
    const heartIcon = postModalBody.querySelector('#heart-icon-modal');
    heartIcon.className = liked ? 'bi bi-heart-fill me-1' : 'bi bi-heart me-1';   
}


function getComments(comments) {
    let commentsString = ''

    comments.forEach(c => {
        const fullName = c.user.profile.name + " " + c.user.profile.surname;
        const profilePicture = c.user.profile.picture ? 
        window.baseURL + 'profile-picture/' + c.user.profile.picture : '../imgs/blank-profile-picture.png';

        commentsString += `
        <div style="width: 100%;" class="d-flex align-items-center mt-2 col-12">
            <img class="profile-img-40" src="${profilePicture}" alt="" srcset="">
            <div class="fw-bold ms-2">${fullName}</div>
            <div class="ms-2">
                ${c.text}
            </div>
        </div>   
        `
    })

    return commentsString;
}

export default openPost;