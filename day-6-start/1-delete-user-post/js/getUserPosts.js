import moment from "moment";
import {GET_USER_POSTS_URL, DELETE_USER_POST_BY_ID} from "./settings/api"
import {getToken} from "./utils/storage";

console.log("GET_USER_POSTS_URL: ", GET_USER_POSTS_URL);
let now = moment(new Date()); // today's date

const postsContainer = document.querySelector("#posts-container");
const postsNotifications = document.querySelector(".posts__notification");
console.log(postsNotifications);
const accessToken = getToken();

console.log(postsContainer);
console.log(accessToken);

(async function getUserPosts() {
    const response = await fetch(GET_USER_POSTS_URL, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    })
    console.log("response: ", response);
    if (response.ok) {
        const jsonResponse = await response.json();
        console.log("GET MY POSTS SUCCEEDED!!  🥳 🤗🤗");
        console.log("jsonResponse: ", jsonResponse);
        console.log("jsonResponse posts: ", jsonResponse.posts);
        const {posts} = jsonResponse;
        console.log(posts);
        if (!posts.length) {
            postsNotifications.innerHTML = "sorry you don't have posts"
        } else {
            const numberOfPosts = posts.length;
            for (let i = 0; i < numberOfPosts; i++) {
                console.log(posts[i].body);
                const {created} = posts[i];
                const secondsSinceCreated = now.diff(created, "seconds");
                console.log("secondsSinceCreated: ", secondsSinceCreated);
                postsContainer.innerHTML += `
            <li class="bg-white flex flex-col focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-inset gap-y-4 hover:bg-gray-50 px-4 py-5 relative">
                <div class="flex justify-between space-x-3">
                    <div class="flex-1 min-w-0">
                        <a href="#" class="block focus:outline-none">
                            <p class="text-sm font-medium text-gray-900 truncate">Gloria Roberston</p>
                            <p class="text-sm text-gray-500 truncate">${posts[i].title}</p>
                        </a>
                    </div>
                    <time datetime="2021-01-27T16:35" class="flex-shrink-0 text-sm text-gray-500 whitespace-nowrap">${secondsSinceCreated} s
                        ago
                    </time>
                </div>
                <div class="mt-1">
                    <p class="text-sm text-gray-600 line-clamp-2">${posts[i].body}</p>
                </div>
                <span>
                    ${posts[i].id}
                </span>
                <div class="flex">
                    <button
                        data-id="${posts[i].id}"
                        type="button"
                        class="delete-post-btn inline-flex items-center rounded-md border border-transparent bg-red-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">Delete</button>
                </div>
            </li>
            `
            }
        }
    } else {
        const err = await response.json();
        console.log(err);
        console.log("GET MY POSTS FAILED!!  😥😥😥");
    }
})()
    .then(() => {
        const deleteBtns = document.getElementsByClassName("delete-post-btn");
        console.log(deleteBtns);
        const totalNumberOfDeleteBtns = deleteBtns.length
        for (let i = 0; i < totalNumberOfDeleteBtns; i++) {
            console.log(i);
            deleteBtns[i].addEventListener("click", function () {
                console.log(`${i} you clicked me`);
                console.log(this.dataset);
                console.log(this.dataset.id);
                console.log(this.getAttribute("data-id"));
                handleDeletePostById(this.dataset.id);
            })
        }
    })
    .catch((err) => {
    });

function handleDeletePostById(postId) {
    console.log("postId", postId);
    const deleteUserById = async () => {
        try {
            let response = await fetch(`${DELETE_USER_POST_BY_ID}/${postId}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            });
            if (response.status === 200) {
                console.log("delete post success ⭕ ⭕ ⭕ !! ");
                location.reload();
            } else {
                const err = await response.json();
                const errMessage = `something wrong happened :( ${err}`;
                throw Error(errMessage);
            }
        } catch (error) {
            console.log(error);
        }
    }
    deleteUserById().then(() => {

    });
}