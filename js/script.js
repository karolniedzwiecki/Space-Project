import { createBlogPost } from './createBlogPost.js';

// Getting elements
const container = document.getElementById('blog-posts-wrapper');
const loading = document.querySelector('.loading');
const valueFromInput = document.getElementById('input-posts-count');
const postsFetchedElement = document.getElementById('posts-fetched');

//Init and assign on first fetch
const buttonPostsCount = document.getElementById('button-posts-count');

// Array to keep fetched posts
let fetchedPosts = [];
// Number of posts to fetch
let postsToFetch = 10;

// Local storage library
if (JSON.stringify(localStorage.getItem('library')) == null) {
  let library = '[]';
  localStorage.setItem('library', library);
}

// Fetching posts
getPosts();
// Fetching posts count
getPostsCount();

// Event listener for changing fetch limit
buttonPostsCount.addEventListener('click', setFetchLimit);

// Setting loading status while scrolling to the bottom
window.addEventListener('scroll', () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (clientHeight + scrollTop >= scrollHeight) {
    // show the loading animation
    showLoading();
  }
});

// function showing loading indicator
function showLoading() {
  loading.classList.add('show');

  // load more data
  setTimeout(getPosts, 1000);
}

// Function setting limit for fetch
function setFetchLimit() {
  const value = valueFromInput.value;
  postsToFetch = value;
  alert(`Changed fetch limit to: ${postsToFetch}`);
  console.log('Changed fetch limit', postsToFetch);
}

// Function fetching posts by fetchLimit (postsToFetch)
async function getPosts() {
  const postResponse = await fetch(
    `https://api.spaceflightnewsapi.net/v3/articles?_limit=${postsToFetch}&_start=${fetchedPosts.length}`
  );
  const postData = await postResponse.json();

  console.log('Fetched new posts', postData);

  // Adding new posts to posts array
  fetchedPosts = [...fetchedPosts, ...postData];

  // Set number of posts fetched
  postsFetchedElement.innerHTML = `${fetchedPosts.length}`;

  // addDataToDOM(data);
  postData.map((item) => createBlogPost(item, container, loading));
}

// Function fetching posts count
async function getPostsCount() {
  const response = await fetch(
    'https://api.spaceflightnewsapi.net/v3/articles/count'
  );
  const data = await response.json();
  const postCountElement = document.getElementById('posts-count');
  postCountElement.innerHTML = `${data}`;
}
