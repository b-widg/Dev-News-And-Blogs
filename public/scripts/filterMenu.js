(() => {
  // Show/Hide Filter Menu //////////////////////
  const hamburgerMenu = document.querySelector('.hamburger-menu');
  const closeMenuX = document.querySelector('.menu-close');
  menuList = document.querySelector('.menu-list');

  const hideFilterList = () => {
    menuList.classList.add('hidden-menu');
    menuList.classList.remove('visible-menu');
  };

  const showFilterList = () => {
    menuList.classList.add('visible-menu');
    menuList.classList.remove('hidden-menu');
  };

  // toggle visibility when hamburger menu clicked
  hamburgerMenu.addEventListener('click', () => {
    menuList.classList.contains('visible-menu')
      ? hideFilterList()
      : showFilterList();
  });

  // close when X clicked
  closeMenuX.addEventListener('click', () => {
    hideFilterList();
  });

  // hide menu when user clicks away
  window.addEventListener('click', (event) => {
    const ancestor = event.target.closest('.menu-container');
    if (!ancestor && event.target !== hamburgerMenu) hideFilterList();
  });

  // Filter Cards /////////////////////////////
  const cards = document.querySelectorAll('article.card');

  const clearFilters = () => {
    cards.forEach((card) => {
      card.classList.remove('display-none');
    });
  };

  const filterByTag = (textFromTagFilter) => {
    clearFilters();
    cards.forEach((card) => {
      const tagList = card.querySelectorAll('.tag-link');
      // If card doesn't have any tags hide it.
      if (tagList.length === 0) {
        card.classList.add('display-none');
      } else {
        // If card's tagList doesn't match hide it. If any match is found
        // make sure card is visible and stop checking remaining tags
        for (const tag of tagList) {
          if (tag.textContent !== textFromTagFilter) {
            card.classList.add('display-none');
          } else {
            card.classList.remove('display-none');
            break;
          }
        }
      }
    });
  };

  // add event listenert to every tag filter element
  // in menu and hide cards that don't match
  const tagFilters = document.querySelectorAll('.tag-filter');
  tagFilters.forEach((tagFilter) => {
    tagFilter.addEventListener('click', () => {
      const textFromTagFilter = tagFilter.textContent;
      filterByTag(textFromTagFilter);
    });
  });

  // compare text of the source filter clicked to the card
  // the alt attribute on the source logo on each card
  const filterBySource = (textFromFilter) => {
    clearFilters();
    cards.forEach((card) => {
      const textFromCard = card
        .querySelector('img.source-logo')
        .getAttribute('alt');
      textFromFilter !== textFromCard
        ? card.classList.add('display-none')
        : card.classList.remove('display-none');
    });
  };

  // add event listenert to every source filter element
  // in menu and hide cards that don't match
  const sourceFilters = document.querySelectorAll('.source-filter');
  sourceFilters.forEach((sourceFilter) => {
    sourceFilter.addEventListener('click', () => {
      const textFromFilter = sourceFilter.textContent;
      filterBySource(textFromFilter);
    });
  });

  // clear all filters when clear filter clicked
  const clearFilter = document.querySelector('.clear-filter');
  clearFilter.addEventListener('click', () => {
    clearFilters();
  });
})();
