import moment from "moment";
import {getToken} from "./utils/storage";
import {GET_POSTS_URL} from './settings/api';

const now = moment(new Date());
const postsContainer = document.querySelector("#posts-container");
const accessToken = getToken();

(async function getAllPosts() {
    const response = await fetch(GET_POSTS_URL, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    })

    if (response.ok) {
        const posts = await response.json();
        const listOfHtmlPosts = posts.map((post) => {
            const postTitle = post.title;
            const postBody = post.body;
            const createdDate = post.created;
            const minutesSinceCreated = now.diff(createdDate, "minutes");
            return (`
            <li class="relative px-4 py-5 bg-white focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 hover:bg-gray-50">
                <div class="flex justify-between space-x-3">
                    <div class="flex-1 min-w-0">
                        <a href="#" class="block focus:outline-none">
                            <span class="absolute inset-0" aria-hidden="true"></span>
                            <p class="text-sm font-medium text-gray-900 truncate">${postTitle}</p>
                            <p class="text-sm text-gray-500 truncate">${postBody}</p>
                        </a>
                    </div>
                    <time datetime="2021-01-27T16:35" class="flex-shrink-0 text-sm text-gray-500 whitespace-nowrap">
                    ${minutesSinceCreated} mins ago
                    </time>
                </div>
                <div class="mt-1">
                    <p class="text-sm text-gray-600 line-clamp-2">Doloremque dolorem maiores assumenda dolorem facilis.
                        Velit vel in a rerum natus facere. Enim rerum eaque qui facilis. Numquam laudantium sed id
                        dolores
                        omnis in. Eos reiciendis deserunt maiores et accusamus quod dolor.</p>
                </div>
            </li>
                `)
        }).join('');
        postsContainer.insertAdjacentHTML("beforeend", listOfHtmlPosts);
    } else {
        const err = await response.json();
        throw new Error(err);
    }
})().catch(err => {
    console.log(err);
    console.log("GET POSTS FAILED!!  😥😥😥");
});