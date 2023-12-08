const baseURL = window.baseURL;

function htmlToElem(html) {
    let temp = document.createElement('template');
    html = html.trim();
    temp.innerHTML = html;
    return temp.content.firstChild;
  }

function createPostDOM(divPosts, posts) {

    for (let post of posts) {
        const userFullName = post.profile.name + " " + post.profile.surname;
        const profilePicture = baseURL + 'profile-picture/' + post.profile.picture;
        const postImage = baseURL + 'post-image/' + post.image;

        const postString = `
            <div class="card mt-3">
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
                            <div class="d-flex align-items-center">
                                <i class="bi bi-heart me-1"></i>
                            </div>
                        </div>
                        <div class="col-3 d-flex justify-content-end align-self-center">
                            <i class="bi bi-bookmark"></i>
                        </div>
                    </div>
                    <div class="row mt-2">
                        <div style="font-size: 14px;" class="col-12 d-flex">
                            Liked by <div class="ms-1 fw-bold">0 people.</div> 
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
}

export default createPostDOM;