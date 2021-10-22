const feature_get_zoom_id = (feature) => `zoom_${feature.id}`;
const feature_get_favorite_id = (feature) => `favorite_${feature.id}`;

const ui_location_list_item = (feature) => {
  const div = document.createElement("div");

  div.className = "flex flex-col hover:bg-gray-100 rounded-xl p-3";

  div.innerHTML = `
        <div class="flex space-between">
          <div class="
            hidden
            md:inline-flex
            items-center
            justify-center
          ">
            <span
            class="
              px-2
              py-1
              text-xs
              font-bold
              leading-none
              text-red-100
              bg-red-600
              rounded-full
            "
            >
              ${feature.relevance}
            </span>
          </div>
          <span class="mx-4 mr-auto font-bold">${feature.text}</span>
        </div>
        <div
          id="${feature_get_zoom_id(feature)}"
          class="bg-white shadow-1xl rounded-3xl my-2 p-4 break-words cursor-pointer"
        >
          <span class="font-bold">country : </span>${
            feature.context.country?.text
          }
          <br />
          <span class="font-bold">region : </span> ${
            feature.context.region?.text
          }      
          <br />
          <span class="font-bold">postcode :</span> ${
            feature.context.postcode?.text
          }
          <br />
          <span class="font-bold">place : </span> ${feature.context.place?.text}
          <br />
          <span class="font-bold">address : </span> ${
            feature.properties.address
          }
          <br />
          <span class="text-xs mr-5">${feature.properties.category}</span>
        </div>
        <div>
          <span class="text-md">${feature.place_name}</span>
        </div>
      </div>
    `;

  return div;
};

function ui_location_list_item_zoom_listener(feature) {
  document
    .getElementById(feature_get_zoom_id(feature))
    .addEventListener("click", () => {
      mapbox_gl.fly_to(feature.center);
    });
}

function ui_refresh_empty_div(div) {
  while (div.firstChild) {
    div.removeChild(div.firstChild);
  }
}
