const search = {
  get() {
    return localStorage.getItem(CACHE_VARIABLES.SEARCH);
  },
  set(value) {
    localStorage.setItem(CACHE_VARIABLES.SEARCH, value);
  },
};

const favorites = {
  get() {
    const cached = localStorage.getItem(CACHE_VARIABLES.FAVORITES) ?? "{}";
    return JSON.parse(cached);
  },
  add(feature) {
    localStorage.setItem(
      CACHE_VARIABLES.FAVORITES,
      JSON.stringify({ ...favorites.get(), [feature.id]: feature })
    );
  },
  remove(feature) {
    const _favorites = favorites.get();

    delete _favorites[feature.id];

    localStorage.setItem(
      CACHE_VARIABLES.FAVORITES,
      JSON.stringify({ ..._favorites })
    );
  },
  has(feature) {
    return Object.keys(favorites.get()).some((value) => value === feature.id);
  },
};

const cache = {
  search,
  favorites,
};
