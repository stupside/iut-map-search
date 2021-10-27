const favorites = {
  get() {
    const cached = localStorage.getItem(FAVORITES_VARIABLES.FAVORITES) ?? "{}";
    return JSON.parse(cached);
  },
  add(feature) {
    localStorage.setItem(
      FAVORITES_VARIABLES.FAVORITES,
      JSON.stringify({ ...favorites.get(), [feature.id]: feature })
    );
  },
  remove(feature) {
    const _favorites = favorites.get();

    delete _favorites[feature.id];

    localStorage.setItem(
      FAVORITES_VARIABLES.FAVORITES,
      JSON.stringify({ ..._favorites })
    );
  },
  has(feature) {
    return Object.keys(favorites.get()).some((value) => value === feature.id);
  },
};
