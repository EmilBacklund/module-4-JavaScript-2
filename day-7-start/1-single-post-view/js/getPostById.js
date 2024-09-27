import {getToken} from "./utils/storage";
import {GET_POST_BY_ID_URL} from "./settings/api";

const paramString = window.location.search;
const searchParam = new URLSearchParams(paramString);
const postId = searchParam.get("post_id");
const accessToken = getToken();
console.log("accessToken", accessToken)
console.log("GET_POST_BY_ID_URL", GET_POST_BY_ID_URL)

console.log("postId", postId);


async function getPostById() {
    const response = await fetch(`${GET_POST_BY_ID_URL}/${postId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        }
    })
    console.log("response: ",response);
    const data = await response.json();
    console.log("data: ",data);
}

getPostById();

