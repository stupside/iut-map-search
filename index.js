// Constants
const TOKEN =
  "pk.eyJ1Ijoia2xuaHBydCIsImEiOiJja3BpeGEzYXYwcXE4MzFvbHd5bjZjamp0In0.aO2SMDc2vM2tefakixLUzw";
const SEARCH = "search";
const FAVORITES = "favorites";
const ENDPOINT = `https://api.mapbox.com/geocoding/v5/mapbox.places`;
////////////////

// Class and Ids
const ID_LOCATION_SEARCH = "location_search";
const ID_LOCATION_QUERY = "location_query";
const ID_LOCATION_LIST = "location_list";
////////////////

// HTMLElements
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

  ui_refresh_query(json.query);
  ui_refresh_locations(json.features);
}

function ui_refresh_locations(features) {
  const location_list = document.getElementById(ID_LOCATION_LIST);

  ui_refresh_empty_div(location_list);

  for (const feature of features) {
    location_list.innerHTML += `
      <div
        class="flex flex-col bg-white shadow-1xl rounded-3xl my-6 p-6"
      >
        ${feature.place_name}
      </div>
    `;
  }

  location_list.append();
}

function ui_refresh_query(query) {
  const location_query = document.getElementById(ID_LOCATION_QUERY);

  ui_refresh_empty_div(location_query);

  for (const query_item of query) {
    location_query.innerHTML += `
    <div class="flex bg-blue-300 rounded-2xl py-0.5 px-2 ml-2 text-white">
      ${query_item}
    </div>
    `;
  }
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

function ui_refresh_empty_div(div) {
  while (div.firstChild) {
    div.removeChild(div.firstChild);
  }
}
