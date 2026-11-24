const bigPicture = document.querySelector('.big-picture');
const closeButton = bigPicture.querySelector('.big-picture__cancel');
const commentsList = bigPicture.querySelector('.social__comments');
const commentCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');

const COMMENTS_PER_STEP = 5;

let currentComments = [];
let shownComments = 0;

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeBigPicture();
  }
}

const renderComments = () => {
  const nextComments = currentComments.slice(
    shownComments,
    shownComments + COMMENTS_PER_STEP
  );

  nextComments.forEach((comment) => {
    const item = document.createElement('li');
    item.classList.add('social__comment');

    const avatar = document.createElement('img');
    avatar.classList.add('social__picture');
    avatar.src = comment.avatar;
    avatar.alt = comment.name;
    avatar.width = 35;
    avatar.height = 35;

    const text = document.createElement('p');
    text.classList.add('social__text');
    text.textContent = comment.message;

    item.appendChild(avatar);
    item.appendChild(text);
    commentsList.appendChild(item);
  });

  shownComments += nextComments.length;

  commentCount.classList.remove('hidden');
  commentCount.innerHTML = `${shownComments} из <span class="comments-count">${currentComments.length}</span> комментариев`;

  commentsLoader.classList.toggle(
    'hidden',
    shownComments >= currentComments.length
  );
};

const openBigPicture = (photo) => {
  const image = bigPicture.querySelector('.big-picture__img img');
  image.src = photo.url;
  image.alt = photo.description;

  bigPicture.querySelector('.likes-count').textContent = photo.likes;
  bigPicture.querySelector('.social__caption').textContent = photo.description;

  commentsList.innerHTML = '';
  currentComments = photo.comments;
  shownComments = 0;
  renderComments();

  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

closeButton.addEventListener('click', closeBigPicture);
commentsLoader.addEventListener('click', renderComments);

export { openBigPicture };
