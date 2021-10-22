const mapbox = {
  get_search_endpoint() {
    const { get_search } = cache;

    return encodeURI(
      `${MAPBOX_VARIABLES.ENDPOINT}/${get_search()}.json?access_token=${
        MAPBOX_VARIABLES.TOKEN
      }`
    );
  },
  search() {
    const url = mapbox.get_search_endpoint();
    fetch(url)
      .then((response) => {
        on_search_response(response);
      })
      .catch(() => {});
  },
};

async function on_search_response(response) {
  const json = await response.json();

  console.log(json);

  const { add_markers } = mapbox_gl;
  const { refresh_query, refresh_locations } = ui;

  refresh_query(json.query);
  refresh_locations(json.features);
  add_markers(json.features);
}

mapbox.search();
