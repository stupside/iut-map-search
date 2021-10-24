const cache = {
  get_search() {
    return localStorage.getItem(CACHE_VARIABLES.SEARCH);
  },
  set_search(value) {
    localStorage.setItem(CACHE_VARIABLES.SEARCH, value);
  },
};
