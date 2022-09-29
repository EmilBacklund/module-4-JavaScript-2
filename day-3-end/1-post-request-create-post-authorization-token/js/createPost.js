import {CREATE_POST_URL} from "./settings/api";
import {getToken} from "./utils/storage";

const createPostForm = document.querySelector("#create-post-form");

const postTitle = document.querySelector("#postTitle");
const postTitleError = document.querySelector("#postTitleError");

const postDescription = document.querySelector("#postDescription");
const postDescriptionError = document.querySelector("#postDescriptionError");


console.log(createPostForm)
console.log(postTitle)
console.log(postTitleError)
console.log(postDescription)
console.log(postDescriptionError)


if (createPostForm) {
    createPostForm.addEventListener("submit", function (event) {
        event.preventDefault();

        let isPostTitle = false;
        if (postTitle.value.trim().length > 0) {
            postTitleError.classList.add("hidden");
            isPostTitle = true;
        } else {
            postTitleError.classList.remove("hidden");
        }

        let isPostDescription = false;
        if (postDescription.value.trim().length > 0) {
            postDescriptionError.classList.add("hidden");
            isPostDescription = true;
        } else {
            postDescriptionError.classList.remove("hidden");
        }

        let isFormValid = isPostTitle && isPostDescription;

        console.log("isFormValid create post", isFormValid)

        if (isFormValid) {
            console.log("Validation SUCCEEDED!!  🥳");
            const postData = {
                "title": postTitle.value,
                "body": postDescription.value
            }

            const accessToken = getToken();
            (async function createPost() {
                const response = await fetch(CREATE_POST_URL, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${accessToken}`
                    },
                    body: JSON.stringify(postData)
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log(data);
                    console.log("CREATE POST SUCCEEDED!!  🥳 🤗🤗");
                    location.href = "/thank-you.html"
                } else {
                    const err = await response.json();
                    const message = `An error occurred: ${err.message}`;
                    createPostForm.reset(); // empty the form fields
                    console.log("CREATE POST Failed!!  💩");
                    throw new Error(message);
                }
            })().catch(err => {
                generalErrorMessage.innerHTML = `Sorry !! ${err.message}`
            });
        } else {
            console.log("Validation FAILED!! 💩");
        }
    });
}
