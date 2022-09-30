import moment from "moment";
import {GET_LOGGED_IN_USER_POSTS_URL} from "./settings/api";
import {getToken} from "./utils/storage";
import {getUserEmail} from "./utils/storage";

const postsContainer = document.querySelector("#posts-container");
const accessToken = getToken();
// console.log("accessToken: ", accessToken);
// console.log("GET_POSTS_URL", GET_POSTS_URL);
let now = moment(new Date()); //today's date


(async function getAllPosts() {
    const response = await fetch(GET_LOGGED_IN_USER_POSTS_URL, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        }
    })
    // console.log("get all posts response: ", response)
    if (response.ok) {
        const posts = await response.json();
        console.log("GET POSTS SUCCEEDED!!  🥳 🤗🤗");
        const loggedInUserEmail = getUserEmail();
        console.log("loggedInUserEmail 🥳: ", loggedInUserEmail)
        const filteredPostsByLoggedInUserEmail = posts.filter((post) => {
            if (post.author.email === loggedInUserEmail) {
                return true;
            } else {
                return false;
            }
        });
        console.log("filteredPostsByLoggedInUserEmail: ", filteredPostsByLoggedInUserEmail);

        for (let i = 0; i < filteredPostsByLoggedInUserEmail.length; i++) {
            const createdDate = filteredPostsByLoggedInUserEmail[i].created;
            const daysSinceCreated = now.diff(createdDate, 'days');
            postsContainer.innerHTML += `<li class="relative px-4 py-5 bg-white focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 hover:bg-gray-50">
                <div class="flex justify-between space-x-3">
                    <div class="flex-1 min-w-0">
                        <a href="#" class="block focus:outline-none">
                            <span class="absolute inset-0" aria-hidden="true"></span>
                            <p class="text-sm font-medium text-gray-900 truncate">Gloria Roberston</p>
                            <p class="text-sm text-gray-500 truncate">${filteredPostsByLoggedInUserEmail[i].title}</p>
                        </a>
                    </div>
                    <time datetime="2021-01-27T16:35" class="flex-shrink-0 text-sm text-gray-500 whitespace-nowrap">${daysSinceCreated} d
                        ago
                    </time>
                </div>
                <div class="mt-1">
                    <p class="text-sm text-gray-600 line-clamp-2">${filteredPostsByLoggedInUserEmail[i].body}</p>
                </div>
            </li>
`
        }
    } else {
        const err = await response.json();
        const message = `Sorry some error ${err}`;
        throw new Error(message)
    }
})().catch(err => {
    console.log("GET POSTS FAILED!!  😥😥😥");
    // console.log(err);
});