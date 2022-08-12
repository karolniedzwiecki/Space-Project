export function createBlogPost(
  data,
  containerElement,
  loadingElement,
  library = false
) {
  // Creating post wrapper
  const postBlogWrapper = document.createElement('div');
  postBlogWrapper.classList.add('blog-post');
  postBlogWrapper.setAttribute('id', data.id);

  // Creating post header
  const postHeader = document.createElement('div');
  postHeader.classList.add('post-header');

  const postHeaderImg = document.createElement('img');
  postHeaderImg.src = data.imageUrl;

  const postHeaderInfo = document.createElement('div');
  postHeaderInfo.classList.add('post-header-info');

  // Creating post header title
  const postHeaderInfoTitle = document.createElement('h2');
  postHeaderInfoTitle.classList.add('title');
  postHeaderInfoTitle.innerHTML = data.title;

  // Creating post header news site name
  const postHeaderInfoText = document.createElement('p');
  postHeaderInfoText.classList.add('title');
  postHeaderInfoText.innerHTML = data.newsSite;

  // Adding post header info children to parent wrapper
  postHeaderInfo.appendChild(postHeaderInfoTitle);
  postHeaderInfo.appendChild(postHeaderInfoText);

  // Adding post header children to parent wrapper
  postHeader.appendChild(postHeaderImg);
  postHeader.appendChild(postHeaderInfo);

  // Creating post body
  const postBody = document.createElement('div');
  postBody.classList.add('post-body');

  const postBodyText = document.createElement('p');
  postBodyText.classList.add('text');
  postBodyText.innerHTML = truncateString(data.summary, 200);

  // Adding text to post body
  postBody.appendChild(postBodyText);

  const postBodyButtons = document.createElement('div');
  postBodyButtons.classList.add('post-body-buttons');

  // Creating more button
  const postBodyButtonMore = document.createElement('a');
  postBodyButtonMore.classList.add('button');
  postBodyButtonMore.href = data.url;
  postBodyButtonMore.innerHTML = 'Read more';

  // Creating add button
  const postBodyButtonAdd = createAddButton();

  // Creating remove button
  const postBodyButtonRemove = createRemoveButton();

  // Adding child elements to buttons wrapper
  postBodyButtons.appendChild(postBodyButtonMore);
  checkLibraryForPost(
    data.id,
    postBodyButtons,
    postBodyButtonAdd,
    postBodyButtonRemove
  );
  // postBodyButtons.appendChild(postBodyButtonAdd);

  // Adding child elements to body wrapper
  postBody.appendChild(postBodyButtons);

  // Creating post footer
  const postFooter = document.createElement('div');
  postFooter.classList.add('post-footer');

  const postDate = document.createElement('span');
  postDate.classList.add('post-date');
  postDate.innerHTML = new Date(data.publishedAt).toLocaleDateString('en-us');

  // Adding child date to post footer
  postFooter.appendChild(postDate);

  // Adding post elements to parent wrapper
  postBlogWrapper.appendChild(postHeader);
  postBlogWrapper.appendChild(postBody);
  postBlogWrapper.appendChild(postFooter);

  // Adding postBlogWrapper to the DOM container
  containerElement.appendChild(postBlogWrapper);

  // Adding event listener for function that will add post to library
  postBodyButtonAdd.addEventListener('click', () =>
    addToLibrary(data, postBodyButtonAdd, postBodyButtonRemove)
  );

  // Adding event listener for function that will remove post from library
  postBodyButtonRemove.addEventListener('click', () =>
    removeFromLibrary(data.id, postBodyButtonRemove, postBodyButtonAdd, library)
  );

  // Setting state for loading indicator
  loadingElement.classList.remove('show');
}

// Function adding post to library
function addToLibrary(data, elementToReplace, newElement) {
  // Getting date from libary by parsing JSON from localStorage
  let existingLibrary = JSON.parse(localStorage.getItem('library') || '[]');
  // Adding new data to array
  existingLibrary.push(data);
  // Setting library with new data in localStorage by stringifying object to JSON
  localStorage.setItem('library', JSON.stringify(existingLibrary));
  // Changing button from "Add" to "Remove"
  elementToReplace.parentNode.replaceChild(newElement, elementToReplace);
}

// Function removing post from library
function removeFromLibrary(id, elementToReplace, newElement, library = false) {
  // Getting date from libary by parsing JSON from localStorage
  let existingLibrary = JSON.parse(localStorage.getItem('library') || '[]');
  // Filtering data by post ID that we get while creating post card
  let updatedLibrary = existingLibrary.filter((post) => post.id !== id);
  // Saving filtered array (array without post with chosen id)
  localStorage.setItem('library', JSON.stringify(updatedLibrary));
  // Changing button from "Remove" to "Add"
  elementToReplace.parentNode.replaceChild(newElement, elementToReplace);

  // If it is page "Library" finding post in "" container and removing it
  if (library) {
    const blogPostToRemove = document.getElementById(id);
    blogPostToRemove.parentNode.removeChild(blogPostToRemove);
  }
}

// Function checking if post already is saved in "library" localStorage
function checkLibraryForPost(id, parentElement, addButton, removeButton) {
  // Geting data from localStorage
  let existingLibrary = JSON.parse(localStorage.getItem('library') || '[]');
  // If exists dinamically creates remove button
  if (existingLibrary.some((post) => post.id === id)) {
    return parentElement.appendChild(removeButton);
  }
  // if not creates add button
  return parentElement.appendChild(addButton);
}

// Creating add button
function createAddButton() {
  const postBodyButtonAdd = document.createElement('button');
  postBodyButtonAdd.classList.add('button', 'add');
  postBodyButtonAdd.setAttribute('id', 'button-add-to-library');
  postBodyButtonAdd.innerHTML = 'Add to library';
  return postBodyButtonAdd;
}

// Creating remove button
function createRemoveButton() {
  const postBodyButtonRemove = document.createElement('button');
  postBodyButtonRemove.classList.add('button', 'remove');
  postBodyButtonRemove.setAttribute('id', 'button-remove-from-library');
  postBodyButtonRemove.innerHTML = 'Remove from library';
  return postBodyButtonRemove;
}

// Function for shortening description
function truncateString(str, n) {
  return str.length > n ? str.substr(0, n - 1) + '&hellip;' : str;
}
