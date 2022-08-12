import { createBlogPost } from './createBlogPost.js';
// Getting elements
const container = document.getElementById('blog-posts-wrapper');
const loading = document.querySelector('.loading');
const buttonSortDateAscending = document.getElementById(
  'button-sort-date-ascending'
);
const buttonSortDateDescending = document.getElementById(
  'button-sort-date-descending'
);
const buttonSortTitleAscending = document.getElementById(
  'button-sort-title-ascending'
);
const buttonSortTitleDescending = document.getElementById(
  'button-sort-title-descending'
);

// Variable holding library for the session
let library = [];

// Function that will create library list from data in localStorage
createLibraryList(getDataFromLocalStorage(), createBlogPost);

// Adding events listeners to filter buttons
buttonSortDateAscending.addEventListener('click', () =>
  sortAscending(
    library,
    'date',
    buttonSortDateAscending,
    buttonSortDateDescending,
    container
  )
);
buttonSortDateDescending.addEventListener('click', () =>
  sortDescending(
    library,
    'date',
    buttonSortDateDescending,
    buttonSortDateAscending,
    container
  )
);
buttonSortTitleAscending.addEventListener('click', () =>
  sortAscending(
    library,
    'title',
    buttonSortTitleAscending,
    buttonSortTitleDescending,
    container
  )
);
buttonSortTitleDescending.addEventListener('click', () =>
  sortDescending(
    library,
    'title',
    buttonSortTitleDescending,
    buttonSortTitleAscending,
    container
  )
);

// Getting saved posts from local storage
function getDataFromLocalStorage() {
  let data = localStorage.getItem('library');
  library = JSON.parse(data);
  return library;
}

// Function creating library list from data and createBlogPost function
function createLibraryList(data, createBlogPost) {
  data.map((item) => {
    createBlogPost(item, container, loading, true);
  });
}

// Function that will sort library ASCENDING by its type "toSort" (date||title), switches buttons for corret ones and refreshes the list
function sortAscending(library, toSort, buttonToHide, buttonToShow, container) {
  switch (toSort) {
    case 'date':
      library = library.sort(
        (a, b) => 
        Date.parse(a.publishedAt.slice(0, -1)) - 
        Date.parse(b.publishedAt.slice(0, -1))
      );
      console.log('ASCETING');
      break;
    case 'title':
      library = library.sort((a, b) => {
        let titleA = a.title.toLowerCase();
        let titleB = b.title.toLowerCase();
        if (titleA < titleB) return -1;
        if (titleA > titleB) return 1;
        return 0;
      });
      break;
    default:
      null;
      break;
  }

  // Replacing buttons after click from "Ascending" to "Descending"
  buttonToHide.classList.replace('show-button', 'hide-button');
  buttonToShow.classList.replace('hide-button', 'show-button');

  // Removing children from the list
  let child = container.lastElementChild;
  console.log('CHILD', child);
  while (child) {
    container.removeChild(child);
    child = container.lastElementChild;
  }

  // Creating new list with sorted data
  createLibraryList(library, createBlogPost);
}

// Function that will sort library DESCENDING by its type "toSort" (date||title), switches buttons for corret ones and refreshes the list
function sortDescending(
  library,
  toSort,
  buttonToHide,
  buttonToShow,
  container
) {
  switch (toSort) {
    case 'date':
      library = library.sort(
        (a, b) => 
        Date.parse(b.publishedAt.slice(0, -1)) - 
        Date.parse(a.publishedAt.slice(0, -1))
      );
      console.log('DESCENTING');
      break;
    case 'title':
      library = library.sort((a, b) => {
        let titleA = a.title.toLowerCase();
        let titleB = b.title.toLowerCase();
        if (titleA > titleB) return -1;
        if (titleA < titleB) return 1;
        return 0;
      });
      break;
    default:
      null;
      break;
  }

  // Replacing buttons after click from "Descending" to "Ascending"
  buttonToHide.classList.replace('show-button', 'hide-button');
  buttonToShow.classList.replace('hide-button', 'show-button');

  // Removing children form the list
  let child = container.lastElementChild;
  console.log('CHILD', child);
  while (child) {
    container.removeChild(child);
    child = container.lastElementChild;
  }

  // Creating new list with sorted data
  createLibraryList(library, createBlogPost);
}
