const markers = [];

const MARKERS_SOURCE = "markers";

mapboxgl.accessToken = MAPBOX_VARIABLES.TOKEN;

const map = new mapboxgl.Map({
  container: MAPBOX_GL_VARIABLES.MAP_ID,
  style: MAPBOX_GL_VARIABLES.STYLE,
  center: MAPBOX_GL_VARIABLES.CENTER,
  zoom: MAPBOX_GL_VARIABLES.ZOOM,
});

map.on("load", () => {
  map.on("click", MARKERS_SOURCE, (event) => {
    mapbox_gl.fly_to(event.features[0].geometry.coordinates);
  });

  map.on("mouseenter", MARKERS_SOURCE, () => {
    map.getCanvas().style.cursor = "pointer";
  });

  map.on("mouseleave", MARKERS_SOURCE, () => {
    map.getCanvas().style.cursor = "";
  });
});

const mapbox_gl = {
  add_marker(feature) {
    const marker = new mapboxgl.Marker().setLngLat(feature.center);
    markers.push(marker);
    marker.addTo(map);
  },
  add_markers(features) {
    map.addSource(MARKERS_SOURCE, {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: features,
      },
    });
    map.addLayer({
      id: MARKERS_SOURCE,
      source: MARKERS_SOURCE,
      type: "circle",
      paint: {
        "circle-color": "#4264fb",
        "circle-radius": 8,
        "circle-stroke-width": 3,
        "circle-stroke-color": "#ffffff",
      },
    });
  },
  clear_markers() {
    markers.forEach((marker) => {
      marker.remove();
      markers.pop();
    });

    if (map.getSource(MARKERS_SOURCE)) {
      map.removeSource(MARKERS_SOURCE);
      map.removeLayer(MARKERS_SOURCE);
    }
  },
  fly_to(coordinates) {
    map.flyTo({
      zoom: MAPBOX_GL_VARIABLES.ZOOM_FLY,
      center: coordinates,
      essential: true,
    });
  },
};
