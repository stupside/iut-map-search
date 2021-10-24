const feature_get_zoom_id = (feature) => `zoom_${feature.id}`;
const feature_get_favorite_id = (feature) => `favorite_${feature.id}`;

const ui_query_label = (value) => {
  const div = document.createElement("div");
  div.className = "flex bg-blue-300 rounded-2xl py-0.5 px-2 ml-2 text-white";
  div.innerText = value;
  return div;
};

const ui_feature = (feature) => {
  const feature_div = document.createElement("div");
  feature_div.className = "flex flex-col hover:bg-gray-100 rounded-xl p-3";

  // HEADER
  const feature_div_header = document.createElement("div");
  feature_div_header.className = "flex space-between";
  feature_div_header.innerHTML = `       
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
  `;
  feature_div.appendChild(feature_div_header);
  // HEADER

  // BODY
  const feature_div_body = document.createElement("div");
  feature_div_body.className =
    "bg-white shadow-1xl rounded-3xl my-2 p-4 break-words cursor-pointer";
  feature_div_body.id = feature_get_zoom_id(feature);

  ["country", "region", "postcode", "place"].forEach((context) => {
    const span = document.createElement("span");
    span.className = "font-bold";
    span.innerHTML = context;

    const value = feature.context
      ? Object.entries(feature.context).find(([_, value]) => {
          return value.id.includes(context);
        })
      : undefined;

    feature_div_body.appendChild(span);
    span.insertAdjacentHTML("afterEnd", `: <span>${value?.text}<span/><br />`);
  });

  feature_div_body.insertAdjacentHTML(
    "beforeEnd",
    `<span class="text-xs mr-5">${feature.properties.category}</span>`
  );

  feature_div_body.addEventListener("click", () =>
    mapbox_gl.fly_to(feature.center)
  );

  feature_div.appendChild(feature_div_body);
  // BODY

  // FOOTER
  const feature_div_footer = document.createElement("div");
  feature_div_footer.innerHTML = `<div><span class="text-md">${feature.place_name}</span></div>`;
  feature_div.appendChild(feature_div_footer);
  // FOOTER

  return feature_div;
};

function ui_refresh_empty_div(div) {
  while (div.firstChild) {
    div.removeChild(div.firstChild);
  }
}
