import {getToken} from "./utils/storage";
import {GET_POST_BY_ID_URL} from "./settings/api";

const paramString = window.location.search;
const searchParam = new URLSearchParams(paramString);
const postId = searchParam.get("post_id");
const accessToken = getToken();
const postDetails = document.querySelector("#post-details");
console.log(postDetails);
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
    const title = data.title;
    const body = data.body;
    const id = data.id;
    console.log(title);
    console.log(body);
    postDetails.innerHTML = `
    <ul>
            <li>title : ${title}</li>
            <li>desc : ${body}</li>
            <li>id : ${id}</li>
        </ul>
    `
}

getPostById();

