(() => {
  /////////////////////////////////////////////
  ///  Hide/Show Filter And Settings Menus  ///
  /////////////////////////////////////////////

  // Left Filter Menu
  const hamburgerMenu = document.querySelector('.hamburger-menu');
  const closeMenuX = document.querySelector('.menu-close');
  const menuList = document.querySelector('.menu-list');

  // Right Settings Menu
  const settingsGear = document.querySelector('.settings-gear');
  const closeSettingsX = document.querySelector('.settings-close');
  const settingsList = document.querySelector('.settings-list');

  const hideFilterList = () => {
    menuList.classList.add('hidden-menu');
    menuList.classList.remove('visible-menu');
  };

  const hideSettingsList = () => {
    settingsList.classList.add('hidden-settings');
    settingsList.classList.remove('visible-settings');
  };

  // Show filter and hide settings.
  const showFilterList = () => {
    menuList.classList.add('visible-menu');
    menuList.classList.remove('hidden-menu');
    hideSettingsList();
  };

  // Show setings and Hide filter.
  const showSettingsList = () => {
    settingsList.classList.add('visible-settings');
    settingsList.classList.remove('hidden-settings');
    hideFilterList();
  };

  // toggle visibility when hamburger menu clicked
  hamburgerMenu.addEventListener('click', () => {
    menuList.classList.contains('visible-menu')
      ? hideFilterList()
      : showFilterList();
  });

  // toggle visibility when settings icon clicked
  settingsGear.addEventListener('click', () => {
    settingsList.classList.contains('visible-settings')
      ? hideSettingsList()
      : showSettingsList();
  });

  // close when filter menu X clicked
  closeMenuX.addEventListener('click', () => {
    hideFilterList();
  });

  // close when settings X clicked
  closeSettingsX.addEventListener('click', () => {
    hideSettingsList();
  });

  // hide filter menu when user clicks away
  document.addEventListener('click', (event) => {
    const ancestor = event.target.closest('.menu-container');
    if (!ancestor && event.target !== hamburgerMenu) hideFilterList();
  });

  // hide settings menu when user clicks away
  document.addEventListener('click', (event) => {
    const ancestor = event.target.closest('.settings-container');
    if (!ancestor && event.target !== settingsGear) hideSettingsList();
  });

  /////////////////////////////////////////////
  //////////////  Filter Cards  ///////////////
  /////////////////////////////////////////////
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
