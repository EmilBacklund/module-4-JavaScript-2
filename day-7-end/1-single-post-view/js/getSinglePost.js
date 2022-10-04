import { getToken } from './utils/storage';
import { GET_POST_BY_ID } from './settings/api';

const paramString = window.location.search;
const params = new URLSearchParams(paramString);

const id = params.get('post_id');
const accessToken = getToken();

const url = GET_POST_BY_ID + id;

async function fetchPostById() {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const data = await response.json();
  console.log(data);
}

fetchPostById();
