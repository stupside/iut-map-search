const ui = {
  toggle_search(enable) {
    const search = document.getElementById(UI_VARIABLES.SEARCH_ID);
    const search_button = document.getElementById(
      UI_VARIABLES.SEARCH_BUTTON_ID
    );
    search.disabled = !enable;
    search_button.disabled = !enable;
  },
  refresh_features(features) {
    const feature = document.getElementById(UI_VARIABLES.FEATURE_ID);
    const features_list = document.getElementById(UI_VARIABLES.FEATURES_ID);

    ui_refresh_empty_div(features_list);
    ui_refresh_empty_div(feature);

    const div = ui_feature(features[0]);
    feature.appendChild(div);

    for (const feature of features.slice(1)) {
      features_list.appendChild(ui_feature(feature));
    }
  },
  refresh_query(query) {
    const location_query = document.getElementById(UI_VARIABLES.QUERY_ID);
    ui_refresh_empty_div(location_query);

    for (const query_item of query) {
      location_query.appendChild(ui_query_label(query_item));
    }
  },
  refresh_favorites() {
    const section = document.getElementById(UI_VARIABLES.FAVORITES_ID);

    ui_refresh_empty_div(section);

    const favorites = Object.entries(cache.favorites.get());
    for (const [_, value] of favorites) {
      section.appendChild(ui_feature(value));
    }
  },
};

function on_search_response(json) {
  const { add_markers } = mapbox_gl;
  const { refresh_query, refresh_features } = ui;

  refresh_query(json.query);
  refresh_features(json.features);
  add_markers(json.features);
}

function on_search_change(search) {
  cache.search.set(search.currentTarget.value);
}

function on_search_button_click() {
  const search = document.getElementById(UI_VARIABLES.SEARCH_ID);

  ui.toggle_search(false);
  mapbox.search(search.value).then((json) => {
    on_search_response(json);
    ui.toggle_search(true);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const search = document.getElementById(UI_VARIABLES.SEARCH_ID);
  const search_button = document.getElementById(UI_VARIABLES.SEARCH_BUTTON_ID);

  search.addEventListener("change", on_search_change);
  search_button.addEventListener("click", on_search_button_click);

  search.value = cache.search.get();

  mapbox.search_from_cache().then(on_search_response);
  ui.refresh_favorites();
});
