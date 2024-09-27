import {getToken} from "./utils/storage";

const paramString = window.location.search;
console.log(paramString)
const searchParam = new URLSearchParams(paramString);
const postId = searchParam.get("post_id");
const accessToken = getToken();
// #postTitle
const postTitle = document.querySelector("#postTitle");
// #postDescription
const postDescription = document.querySelector("#postDescription");

const editPostForm = document.querySelector("#edit-post-form");


console.log("postId: ", postId);

async function getPostById() {
    const response = await fetch(`https://nf-api.onrender.com/api/v1/social/posts/${postId}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    });
    console.log(response);
    const data = await response.json();
    console.log(data);
    postTitle.value = data.title;
    postDescription.value = data.body;
}

getPostById();

editPostForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const postData = {
        "title": postTitle.value,
        "body": postDescription.value
    }
    console.log("postData: ", postData);

    async function editPost() {
        const response = await fetch(`https://nf-api.onrender.com/api/v1/social/posts/${postId}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`
                },
                body: JSON.stringify(postData)
            })
        if (response.ok) {
            location.href = `single-post.html?post_id=${postId}`
        }
    }

    editPost();
})