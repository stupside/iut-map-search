const MARKERS_SOURCE = "markers";
const MARKERS_FAVORITES_SOURCE = "markers_favorites";

mapboxgl.accessToken = MAPBOX_VARIABLES.TOKEN;

const map = new mapboxgl.Map({
  container: MAPBOX_GL_VARIABLES.MAP_ID,
  style: MAPBOX_GL_VARIABLES.STYLE,
  center: MAPBOX_GL_VARIABLES.CENTER,
  zoom: MAPBOX_GL_VARIABLES.ZOOM,
});

map.on("load", () => {
  for (const id of [MARKERS_SOURCE, MARKERS_FAVORITES_SOURCE]) {
    map.on("click", id, (event) => {
      mapbox_gl.fly_to(event.features[0]);
    });
    map.on("mouseenter", id, () => {
      map.getCanvas().style.cursor = "pointer";
    });
    map.on("mouseleave", id, () => {
      map.getCanvas().style.cursor = "";
    });
  }
});

const mapbox_gl = {
  once_loaded(f) {
    map.on("load", f);
  },
  add_markers(features, favorites = false) {
    const source = favorites ? MARKERS_FAVORITES_SOURCE : MARKERS_SOURCE;

    const data = {
      type: "FeatureCollection",
      features: features,
    };

    if (map.getSource(source)) {
      map.getSource(source).setData(data);
    } else {
      map.addSource(source, {
        type: "geojson",
        data,
      });
    }

    if (map.getLayer(source)) return;

    map.addLayer({
      id: source,
      source: source,
      type: "circle",
      paint: {
        "circle-color": favorites ? "#fb4242" : "#4264fb",
        "circle-radius": 8,
        "circle-stroke-width": 5,
        "circle-stroke-color": "#ffffff",
      },
    });
  },
  fly_to(feature) {
    map.flyTo({
      zoom: MAPBOX_GL_VARIABLES.ZOOM_FLY,
      center: feature.center ?? feature.geometry?.coordinates,
      essential: true,
    });
  },
};
