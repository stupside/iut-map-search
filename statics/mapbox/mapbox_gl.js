const markers = [];

mapboxgl.accessToken = MAPBOX_VARIABLES.TOKEN;

const map = new mapboxgl.Map({
  container: MAPBOX_GL_VARIABLES.MAP_ID,
  style: MAPBOX_GL_VARIABLES.STYLE,
  center: MAPBOX_GL_VARIABLES.CENTER,
  zoom: MAPBOX_GL_VARIABLES.ZOOM,
});

const mapbox_gl = {
  add_marker(feature) {
    const marker = new mapboxgl.Marker().setLngLat(feature.center);
    markers.push(marker);
    marker.addTo(map);
  },
  add_markers(features) {
    for (const feature of features) mapbox_gl.add_marker(feature);
  },
  clear_markers() {
    markers.forEach((marker) => marker.remove());
  },
  fly_to(coordinates) {
    map.flyTo({
      zoom: MAPBOX_GL_VARIABLES.ZOOM_FLY,
      center: coordinates,
      essential: true,
    });
  },
};
