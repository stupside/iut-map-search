const mapbox = {
  async search(search) {
    if (!search) {
      console.info("mapbox.search", "Empty search parameter");
      return;
    }

    const url = get_search_endpoint(search);

    return fetch(url)
      .then((response) => {
        return response.json();
      })
      .catch((reason) => {
        console.error("mapbox.search.catch", reason);
      });
  },
  async search_from_cache() {
    return mapbox.search(cache.get_search());
  },
};

const get_search_endpoint = (query) => {
  return encodeURI(
    `${MAPBOX_VARIABLES.ENDPOINT}/${query}.json?access_token=${MAPBOX_VARIABLES.TOKEN}`
  );
};
