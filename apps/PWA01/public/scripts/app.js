'use strict';

const pwa01 = {
  selectedUsers: {},
  addDialogContainer: document.getElementById('addDialogContainer'),
};

/**
 * Get's the cached forecast data from the caches object.
 *
 * @param {string} coords Location object to.
 * @return {Object} The weather forecast, if the request fails, return null.
 */
function getUserFromCache(user) {
  if (!('caches' in window)) {
    return null;
  }
  const url = `${window.location.origin}/user/${user}`;
  return caches.match(url)
      .then((response) => {
        if (response) {
          return response.json();
        }
        return null;
      })
      .catch((err) => {
        console.error('Error getting data from cache', err);
        return null;
      });
}

function getForecastCard(user) {
  
}

/**
 * Gets the latest weather forecast data and updates each card with the
 * new data.
 */
function updateData() {
  Object.keys(pwa01.selectedUsers).forEach((key) => {
    const user = pwa01.selectedUsers[key];
    const card = getForecastCard(user);
    // CODELAB: Add code to call getForecastFromCache
    getUserFromCache(user.Name)
    .then((user) => {
      renderUser(card, user);
    });
    // Get the forecast data from the network.
    // getForecastFromNetwork(user.Name)
    //     .then((user) => {
    //       renderUser(card, user);
    //     });
  });
}

function renderUser(user) {
  if (!user) {
    // There's no data, skip the update.
    return;
  }
}

/**
 * Saves the list of locations.
 *
 * @param {Object} users The list of locations to save.
 */
function saveUserList(users) {
  const data = JSON.stringify(users);
  localStorage.setItem('userList', data);
}

/**
 * Loads the list of saved location.
 *
 * @return {Array}
 */
function loadUserList() {
  let users = localStorage.getItem('userList');
  if (users) {
    try {
      users = JSON.parse(users);
    } catch (ex) {
      users = {};
    }
  }
  if (!users || Object.keys(users).length === 0) {
    users = {};
    users["Paul"] = {favColour: 'Cyan'};
  }
  return users;
}

/**
 * Initialize the app, gets the list of locations from local storage, then
 * renders the initial data.
 */
function init() {
  // Get the location list, and update the UI.
  pwa01.selectedUsers = loadUserList();
  updateData();

  // Set up the event handlers for all of the buttons.
  document.getElementById('butRefresh').addEventListener('click', updateData);
  // document.getElementById('butAdd').addEventListener('click', toggleAddDialog);
  // document.getElementById('butDialogCancel')
  //     .addEventListener('click', toggleAddDialog);
  // document.getElementById('butDialogAdd')
  //     .addEventListener('click', addUser);
}

init();
