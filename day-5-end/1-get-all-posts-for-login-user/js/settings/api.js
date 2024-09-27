const API_BASE_URL = "https://nf-api.onrender.com/"
// AUTH
const USER_LOGIN_URL = API_BASE_URL + "api/v1/social/auth/login"
const USER_SIGNUP_URL = API_BASE_URL + "api/v1/social/auth/register"

//POSTS
const CREATE_POST_URL = API_BASE_URL + "api/v1/social/posts"
const GET_POSTS_URL = API_BASE_URL + "api/v1/social/posts"
const GET_LOGGED_IN_USER_POSTS_URL = API_BASE_URL + "api/v1/social/posts/?_author=true"

export {API_BASE_URL, USER_LOGIN_URL, USER_SIGNUP_URL, CREATE_POST_URL, GET_POSTS_URL, GET_LOGGED_IN_USER_POSTS_URL};
