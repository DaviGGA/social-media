import * as Like from '../services/like-service.js';

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
            <div class="col-6">
                <img style="width: 100%;height: 80vh;" src="${postImage}" alt="" srcset="">
            </div>
            <div class="col-6">
                <div class="row border-bottom pb-2">
                    <div class="d-flex align-items-center col-12">
                        <img class="profile-img-40" src="${profilePicture}" alt="" srcset="">
                        <div class="fw-bold ms-2">John Doe</div>
                    </div>
                </div>
                <div style="height: 91%;" class="d-flex flex-column justify-content-between">
                    <div class="row mt-3">
                        <div style="width: 100%;" class="d-flex align-items-center col-12">
                            <img class="profile-img-40" src="${profilePicture}" alt="" srcset="">
                            <div class="fw-bold ms-2">${fullName}</div>
                            <div class="ms-2">
                                ${post.description}
                            </div>
                        </div>
                    </div>
                    <div class="row mt-3">
                        <div class="col-12 d-flex flex-column">
                            <input type="text" placeholder="Deixe um comentário..." class="form form-control">
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
    </div>
    `

    const postHTML = htmlToElem(postString);

    postModalBody.innerHTML = '';
    postModalBody.appendChild(postHTML);

    const likeButton = document.getElementById('like-button-modal');
    likeButton.addEventListener('click', onCLickLikePost)
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


async function updateLike(liked) {
    const heartIcon = postModalBody.querySelector('#heart-icon-modal');
    heartIcon.className = liked ? 'bi bi-heart-fill me-1' : 'bi bi-heart me-1';   
}

export default openPost;