import moment from 'moment';
import { GET_USER_POSTS_URL, DELETE_USER_POST_BY_ID } from './settings/api';
import { getToken } from './utils/storage';

console.log('GET_USER_POSTS_URL: ', GET_USER_POSTS_URL);
let now = moment(new Date()); // today's date

const postsContainer = document.querySelector('#posts-container');
const postsNotification = document.querySelector('.posts__notification');
const accessToken = getToken();

console.log(postsContainer);
console.log(accessToken);

(async function getUserPosts() {
  const response = await fetch(GET_USER_POSTS_URL, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  console.log('response: ', response);
  if (response.ok) {
    const jsonResponse = await response.json();
    console.log('GET MY POSTS SUCCEEDED!!  🥳 🤗🤗');
    console.log('jsonResponse: ', jsonResponse);
    console.log('jsonResponse posts: ', jsonResponse.posts);
    const { posts } = jsonResponse;
    console.log(posts);
    const numberOfPosts = posts.length;
    if (!posts.length) {
      postsNotification.innerHTML = "Sorry you don't have posts";
    }
    for (let i = 0; i < numberOfPosts; i++) {
      console.log(posts[i].body);
      const { created } = posts[i];
      const secondsSinceCreated = now.diff(created, 'seconds');
      console.log('secondsSinceCreated: ', secondsSinceCreated);
      postsContainer.innerHTML += `
            <li class="bg-zinc-200 rounded-2xl relative px-4 py-5 bg-white focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 hover:bg-gray-50">
                <div class="flex justify-between space-x-3">
                    <div class="flex-1 min-w-0">
                        <a href="#" class="block focus:outline-none">
                            <span class="inset-0" aria-hidden="true"></span>
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
                <button
                        data-id="${posts[i].id}"
                        type="button"
                        class="delete-post-btn mt-4 inline-flex items-center rounded-md border border-transparent bg-red-100 px-3 py-2 text-sm font-medium leading-4 text-red-700 hover:bg-red-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">Delete</button>
            </li>
            `;
    }
  } else {
    const err = await response.json();
    console.log(err);
    console.log('GET MY POSTS FAILED!!  😥😥😥');
  }
})()
  .then(() => {
    const deleteBtns = document.getElementsByClassName('delete-post-btn');
    const totalNumberOfDelteBtns = deleteBtns.length;

    for (let i = 0; i < totalNumberOfDelteBtns; i++) {
      deleteBtns[i].addEventListener('click', function () {
        console.log(`${i} you clicked me`);
        console.log('this.dataset.postId: ', this.dataset);
        console.log('this.dataset.postId: ', this.dataset.id);
        console.log(this.getAttribute('data-id'));
        handlingDeletePostById(this.dataset.id);
      });
    }
  })
  .catch((err) => {});

function handlingDeletePostById(postId) {
  console.log('Post Id', postId);
  const deleteUserById = async () => {
    try {
      let response = await fetch(`${DELETE_USER_POST_BY_ID}/${postId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.status === 200) {
        console.log('Delete post success!');

        location.reload();
      } else {
        const err = await resonse.json();
        const errMessage = `something wrong happened ${err}`;
        throw Error(errMessage);
      }
    } catch (error) {
      console.log(error);
    }
  };
  deleteUserById();
}
