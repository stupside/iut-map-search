const ui = {
  refresh_locations(features) {
    const location_list = document.getElementById(
      UI_VARIABLES.LOCATION_LIST_ID
    );

    ui_refresh_empty_div(location_list);

    for (const feature of features) {
      feature.context = feature.context.reduce((value, context_item) => {
        return {
          ...value,
          [context_item.id.split(".")[0]]: {
            ...context_item,
            text: context_item.text ?? "",
          },
        };
      }, {});

      location_list.appendChild(ui_location_list_item(feature));
      ui_location_list_item_zoom_listener(feature);
    }
  },
  refresh_query(query) {
    const location_query = document.getElementById(
      UI_VARIABLES.LOCATION_QUERY_ID
    );

    ui_refresh_empty_div(location_query);

    for (const query_item of query) {
      location_query.innerHTML += `
        <div class="flex bg-blue-300 rounded-2xl py-0.5 px-2 ml-2 text-white">
          ${query_item}
        </div>
        `;
    }
  },
};
