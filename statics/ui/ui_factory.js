const ui_query_label = (value) => {
  const div = document.createElement("div");
  div.className =
    "flex bg-blue-500 rounded-2xl py-0.5 px-2 ml-2 text-white font-medium";
  div.innerText = value;
  return div;
};

const ui_feature = (feature) => {
  const container = () => {
    const div = document.createElement("div");
    div.className = "flex flex-col hover:bg-gray-100 rounded-xl p-3 ";

    return div;
  };

  const header = () => {
    const div = document.createElement("div");
    div.className = "flex space-between";
    div.innerHTML = `  
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
          bg-red-500
          rounded-full
          font-medium
        "
        >
          ${feature.relevance}
        </span>
      </div>
      <span class="mx-4 mr-auto font-bold">${feature.text}</span>
    `;

    const { add, has, remove } = cache.favorites;

    const span = document.createElement("span");
    span.className = feature.id;

    const button = () => {
      if (has(feature)) {
        return `<button class="px-2 py-1 text-red-500 font-medium">Remove</button>`;
      } else {
        return `<button class="px-2 py-1 text-blue-500 font-medium">Add</button>`;
      }
    };

    span.innerHTML = button();
    span.addEventListener("click", () => {
      if (has(feature)) {
        remove(feature);
      } else {
        add(feature);
      }

      for (const element of document.getElementsByClassName(feature.id))
        element.innerHTML = button();

      ui.refresh_favorites();
    });

    div.appendChild(span);

    return div;
  };

  const footer = () => {
    const div = document.createElement("div");
    div.innerHTML = `<div><span class="text-md">${feature.place_name}</span></div>`;

    return div;
  };

  const body = () => {
    const div = document.createElement("div");
    div.className =
      "bg-white shadow-1xl rounded-3xl my-2 p-4 break-words cursor-pointer";

    const contexts = Object.values(feature.context ?? {}).reduce(
      (accumulator, value) => {
        const id = value.id.split(".")[0];

        if (!Object.keys(accumulator).includes(id)) return accumulator;

        return {
          ...accumulator,
          [id]: value.text,
        };
      },
      {
        country: undefined,
        region: undefined,
        postcode: undefined,
        place: undefined,
      }
    );

    Object.entries(contexts).forEach(([key, value]) => {
      const section = document.createElement("section");
      section.className = "flex items-center mb-0.5";

      section.insertAdjacentHTML(
        "beforeend",
        `<span class="font-bold mr-3">${key} :</span>`
      );

      section.insertAdjacentHTML(
        "beforeend",
        ui_skeleton(value, `<span>${value}<span/>`)
      );

      div.appendChild(section);
    });

    div.insertAdjacentHTML(
      "beforeEnd",
      ui_skeleton(
        feature.properties.category,
        `<span class="text-xs mr-5">${feature.properties.category}</span>`
      )
    );

    div.addEventListener("click", () => {
      mapbox_gl.fly_to(feature.center);
    });

    return div;
  };

  const _container = container();

  const _body = body();
  const _header = header();
  const _footer = footer();

  _container.appendChild(_header);
  _container.appendChild(_body);
  _container.appendChild(_footer);

  return _container;
};

const ui_skeleton = (value, html) => {
  return value ? html : `<div class="h-4 bg-gray-100 rounded w-1/4"></div>`;
};

function ui_refresh_empty_div(div) {
  while (div.firstChild) {
    div.removeChild(div.firstChild);
  }
}
