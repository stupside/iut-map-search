// Constants
const TOKEN = "";
const SEARCH = "search";
const FAVORITES = "favorites";
const ENDPOINT = `https://api.mapbox.com/geocoding/v5/mapbox.places`;
////////////////

// Class and Ids
const ID_LOCATION_SEARCH = "location_search";

const ID_LOCATION_SEARCH = "location_query";
const ID_LOCATION_LIST = "location_list";
////////////////

// HTMLElements
var location_search = document.getElementById(ID_LOCATION_SEARCH);
var location_list = document.getElementById(ID_LOCATION_LIST);
////////////////

function search() {
  const url = get_search_endpoint();
  fetch(url)
    .then((response) => {
      on_search_response(response);
    })
    .catch(() => {});
}

async function on_search_response(response) {
  const json = await response.json();
  console.log(json);

  location_list.append(`
      <div>${JSON.stringify(json)}</div>
    `);
}

function get_search() {
  return localStorage.getItem(SEARCH);
}

function set_search(value) {
  console.log("set_search", value);
  localStorage.setItem(SEARCH, value);
}

function get_search_endpoint() {
  return encodeURI(`${ENDPOINT}/${get_search()}.json?access_token=${TOKEN}`);
}

function get_favorites() {
  return localStorage.getItem(FAVORITES);
}

function add_to_favorites(location) {
  localStorage.setItem(
    FAVORITES,
    JSON.stringify({ ...get_favorites(), location })
  );
}

function remove_from_favorites(location) {
  const favorites = get_favorites();

  delete favorites["something"];

  localStorage.setItem(FAVORITES, JSON.stringify({ ...favorites, location }));
}
