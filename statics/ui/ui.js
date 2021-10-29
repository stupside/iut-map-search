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

    ui_refresh_empty_div(feature);
    ui_refresh_empty_div(features_list);

    if (features && features.length > 0) {
      feature.appendChild(ui_feature(features[0]));
      for (const feature of features.slice(1))
        features_list.appendChild(ui_feature(feature));

      mapbox_gl.add_markers(features, false);
    }
  },
  refresh_favorites() {
    const favorites = Object.values(cache.favorites.get());
    const favorites_list = document.getElementById(UI_VARIABLES.FAVORITES_ID);

    ui_refresh_empty_div(favorites_list);

    for (const favorite of favorites)
      favorites_list.appendChild(ui_feature(favorite));

    mapbox_gl.add_markers(favorites, true);
  },
  refresh_query(query) {
    const location_query = document.getElementById(UI_VARIABLES.QUERY_ID);

    ui_refresh_empty_div(location_query);

    for (const query_item of query)
      location_query.appendChild(ui_query_label(query_item));
  },
};

function on_search_response(json) {
  const { refresh_query, refresh_features } = ui;

  refresh_query(json.query);

  if (json.features && json.features.length > 0) {
    refresh_features(json.features);

    mapbox_gl.fly_to(json.features[0]);
  }
}

function on_search_change(search) {
  cache.search.set(search.currentTarget.value);
}

function on_search_button_click() {
  const search = document.getElementById(UI_VARIABLES.SEARCH_ID);

  ui.toggle_search(false);
  mapbox
    .search(search.value)
    .then(on_search_response)
    .then(ui.toggle_search(true));
}

document.addEventListener("DOMContentLoaded", () => {
  const search = document.getElementById(UI_VARIABLES.SEARCH_ID);
  const search_button = document.getElementById(UI_VARIABLES.SEARCH_BUTTON_ID);

  search.addEventListener("change", on_search_change);
  search_button.addEventListener("click", on_search_button_click);

  search.value = cache.search.get();

  mapbox_gl.once_loaded(() => {
    mapbox
      .search_from_cache()
      .then(on_search_response)
      .catch(console.info)
      .then(ui.refresh_favorites);
  });
});
