(() => {
  const shareIcon = document.querySelectorAll('.share');
  // TODO: add share functionality to share icons
  const likeIcon = document.querySelectorAll('.like');
  const bookmarkIcon = document.querySelectorAll('.bookmark');

  likeIcon.forEach((icon) => {
    icon.addEventListener('click', () => {
      icon.getAttribute('src') === 'images/icons/like.svg'
        ? icon.setAttribute('src', 'images/icons/liked.svg')
        : icon.setAttribute('src', 'images/icons/like.svg');
    });
  });

  bookmarkIcon.forEach((icon) => {
    icon.addEventListener('click', () => {
      icon.getAttribute('src') === 'images/icons/bookmark.svg'
        ? icon.setAttribute('src', 'images/icons/bookmarked.svg')
        : icon.setAttribute('src', 'images/icons/bookmark.svg');
    });
  });
})();
