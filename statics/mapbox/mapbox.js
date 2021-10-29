const mapbox = {
  async search(search) {
    if (!search) {
      return Promise.reject("mapbox.search - Empty search parameter");
    }

    if (search.length >= 256) {
      return Promise.reject("mapbox.search - Search parameter too long");
    }

    const url = search_endpoint(search);

    return fetch(url)
      .then((response) => {
        return response.json();
      })
      .catch((reason) => {
        console.error("mapbox.search.catch", reason);
      });
  },
  async search_from_cache() {
    return mapbox.search(cache.search.get());
  },
};

const search_endpoint = (query) => {
  return encodeURI(
    `${MAPBOX_VARIABLES.ENDPOINT}/${query}.json?access_token=${MAPBOX_VARIABLES.TOKEN}`
  );
};
