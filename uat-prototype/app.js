const state = {
  destination: "Kiyomizu-dera",
  area: "Kyoto",
  placeType: "Temple",
  nextPlace: "Gojozaka bus stop",
  scenario: "bus",
  screen: "start"
};

const screens = {
  "start": {
    status: "UAT-01",
    title: "Set destination",
    summary: "Check the destination in Google Maps first. Many places in Japan have the same name.",
    fields: true,
    checklist: [
      "Destination name is required",
      "Add area / city / prefecture to avoid same-name mistakes",
      "Add place type if it helps, like temple, hotel, station, or park",
      "Use the place shown in Google Maps"
    ],
    actions: [
      ["Choose transport", "transport", "primary"],
      ["Show Japanese", "show-place", "secondary"],
      ["Open Google Maps", "maps-opened", "secondary"]
    ]
  },
  "transport": {
    status: "UAT-02",
    title: "Choose next transport",
    summary: "Pick the transport you will use now.",
    checklist: [
      "Choose before you start moving",
      "Use Google Maps for route and location",
      "Use this tool for local confirmation"
    ],
    actions: [
      ["Local bus / tram", "bus-prep", "primary"],
      ["Train / subway", "train-prep", "secondary"],
      ["Taxi", "taxi-prep", "secondary"]
    ]
  },
  "maps-return": {
    status: "UAT-02",
    title: "Back from Google Maps",
    summary: "Now confirm the next action.",
    checklist: [
      "Check the next place",
      "Confirm the stop, station, or entrance",
      "Ask someone if you are unsure"
    ],
    actions: [
      ["I arrived here", "arrival-check", "primary"],
      ["Ask staff", "show-place", "secondary"],
      ["Switch to taxi", "taxi-prep", "secondary"]
    ],
    monetized: {
      title: "Need internet for Google Maps?",
      body: "Prepare eSIM or pocket Wi-Fi before travel."
    }
  },
  "maps-opened": {
    status: "UAT-02",
    title: "Google Maps opened",
    summary: "Prototype screen. In the real product, Google Maps opens here.",
    warning: "Confirm this is the exact place you want. Same-name places can point to the wrong location.",
    checklist: [
      "Check the place name",
      "Check the area or address",
      "Check the place type",
      "Check the pin or entrance",
      "If it is wrong, edit the destination"
    ],
    actions: [
      ["This is correct", "maps-return", "primary"],
      ["Edit destination", "start", "secondary"],
      ["Back", "transport", "secondary"]
    ]
  },
  "show-place": {
    status: "UAT-03",
    title: "Show Japanese",
    show: {
      ja: "この場所へ行きたいです。",
      en: "I want to go to this place."
    },
    actions: [
      ["Back", "start", "secondary"],
      ["Open Google Maps", "maps-opened", "secondary"],
      ["Switch to taxi", "taxi-prep", "secondary"]
    ]
  },
  "bus-prep": {
    status: "UAT-04",
    title: "Local bus preparation",
    summary: "Prepare before going to the bus stop.",
    warning: "Prepare cash and coins first.",
    checklist: [
      "Prepare cash and coins",
      "Check the bus route number or destination",
      "Check the stop to get off",
      "Save the Google Maps route screen",
      "Confirm the direction of this bus stop"
    ],
    note: "Note: Some bus companies may accept transit IC cards.",
    actions: [
      ["Check bus stop direction", "bus-direction", "primary"],
      ["Open Google Maps", "maps-opened", "secondary"],
      ["Switch to taxi", "taxi-prep", "secondary"]
    ]
  },
  "bus-direction": {
    status: "UAT-05",
    title: "Check bus stop direction",
    summary: "The stop name can be correct, but the direction can be wrong.",
    show: {
      ja: "このバス停から清水寺方面へ行きたいです。",
      en: "I want to go toward Kiyomizu-dera from this bus stop."
    },
    actions: [
      ["This is correct", "bus-before-boarding", "primary"],
      ["Open Google Maps", "maps-opened", "secondary"],
      ["Switch to taxi", "taxi-prep", "secondary"]
    ]
  },
  "bus-before-boarding": {
    status: "UAT-04",
    title: "Before boarding",
    summary: "Show this quickly to the driver.",
    show: {
      ja: "清水寺方面へ行きたいです。",
      en: "I want to go toward Kiyomizu-dera."
    },
    actions: [
      ["I can board", "arrival-check", "primary"],
      ["Bus is full", "bus-full", "secondary"],
      ["Switch to taxi", "taxi-prep", "secondary"]
    ]
  },
  "bus-full": {
    status: "UAT-06",
    title: "Bus is full",
    summary: "If the destination is not far, taxi is recommended.",
    warning: "The next bus may also be crowded. Waiting can take time.",
    checklist: [
      "Wait for the next same route or destination",
      "Switch to taxi if the place is not far",
      "Check the last bus if it is late"
    ],
    actions: [
      ["Wait for next bus", "bus-before-boarding", "primary"],
      ["Switch to taxi", "taxi-prep", "secondary"],
      ["Open Google Maps", "maps-opened", "secondary"]
    ]
  },
  "night-warning": {
    status: "UAT-07",
    title: "Low service warning",
    summary: "Check before you keep waiting.",
    warning: "In rural areas, missing one bus or train can mean waiting for hours or losing the last option today.",
    checklist: [
      "Check the next service",
      "Check the last service",
      "Switch to taxi if uncertain"
    ],
    actions: [
      ["Open Google Maps", "maps-opened", "primary"],
      ["Switch to taxi", "taxi-prep", "secondary"],
      ["Ask staff", "show-place", "secondary"]
    ]
  },
  "taxi-prep": {
    status: "UAT-09",
    title: "Taxi preparation",
    summary: "Choose where this taxi should go.",
    checklist: [
      "Choose the final destination if taking taxi all the way",
      "Choose the next station or bus stop if using taxi only for this section",
      "Tell staff if you have large luggage or need airport transfer"
    ],
    actions: [
      ["Go to final destination", "taxi-driver", "primary"],
      ["Go to next place only", "taxi-driver", "secondary"],
      ["Ask hotel staff", "taxi-staff", "secondary"]
    ],
    monetized: {
      title: "Taxi options",
      body: "Uber / GO / DiDi / S.RIDE / Airport Taxi can be shown by situation."
    }
  },
  "taxi-staff": {
    status: "UAT-10",
    title: "Show hotel staff",
    show: {
      ja: "タクシーでこの場所まで行きたいです。",
      en: "I want to go to this place by taxi."
    },
    actions: [
      ["Show driver text", "taxi-driver", "primary"],
      ["Back", "taxi-prep", "secondary"],
      ["Open Google Maps", "maps-opened", "secondary"]
    ]
  },
  "taxi-driver": {
    status: "UAT-10",
    title: "Show taxi driver",
    show: {
      ja: "清水寺まで行きたいです。",
      en: "Please take me to Kiyomizu-dera."
    },
    actions: [
      ["I arrived", "arrival-check", "primary"],
      ["Back", "taxi-prep", "secondary"],
      ["Open Google Maps", "maps-opened", "secondary"]
    ]
  },
  "train-prep": {
    status: "UAT-11",
    title: "Train preparation",
    summary: "Confirm before entering the platform.",
    checklist: [
      "Prepare ticket or IC card",
      "Check the station and ticket gate",
      "Confirm platform and direction",
      "Confirm the train stops at your station"
    ],
    actions: [
      ["Show Japanese", "train-show", "primary"],
      ["Open Google Maps", "maps-opened", "secondary"],
      ["Switch to taxi", "taxi-prep", "secondary"]
    ]
  },
  "train-show": {
    status: "UAT-11",
    title: "Ask station staff",
    show: {
      ja: "目的地の駅へ行きたいです。",
      en: "I want to go to my destination station."
    },
    actions: [
      ["I checked", "arrival-check", "primary"],
      ["Back", "train-prep", "secondary"],
      ["Open Google Maps", "maps-opened", "secondary"]
    ]
  },
  "limited-prep": {
    status: "UAT-12 / UAT-13",
    title: "Shinkansen / limited express",
    summary: "Confirm ticket type and seat before boarding.",
    checklist: [
      "Prepare the basic fare ticket",
      "Prepare the limited express ticket",
      "Confirm reserved or non-reserved seat",
      "Confirm train name, car number, and seat",
      "Check luggage space if needed"
    ],
    actions: [
      ["Reserved seat", "limited-show", "primary"],
      ["Non-reserved seat", "limited-show", "secondary"],
      ["Ask staff", "limited-show", "secondary"]
    ]
  },
  "limited-show": {
    status: "UAT-12 / UAT-13",
    title: "Show station staff",
    show: {
      ja: "この切符でこの列車に乗りたいです。",
      en: "I want to take this train with this ticket."
    },
    actions: [
      ["I checked", "arrival-check", "primary"],
      ["Back", "limited-prep", "secondary"],
      ["Open Google Maps", "maps-opened", "secondary"]
    ]
  },
  "coach-prep": {
    status: "UAT-14",
    title: "Highway / airport / night bus",
    summary: "Confirm booking and boarding place.",
    checklist: [
      "Prepare ticket, QR, email, or booking number",
      "Confirm bus company and service name",
      "Confirm boarding place and meeting time",
      "Check departure time and destination",
      "Check luggage drop-off if needed"
    ],
    actions: [
      ["Show staff", "coach-show", "primary"],
      ["Open Google Maps", "maps-opened", "secondary"],
      ["Switch to taxi", "taxi-prep", "secondary"]
    ]
  },
  "coach-show": {
    status: "UAT-14",
    title: "Show bus staff",
    show: {
      ja: "この予約でこのバスに乗りたいです。",
      en: "I want to take this bus with this booking."
    },
    actions: [
      ["I checked", "arrival-check", "primary"],
      ["Back", "coach-prep", "secondary"],
      ["Open Google Maps", "maps-opened", "secondary"]
    ]
  },
  "other-prep": {
    status: "UAT-16",
    title: "Other transport",
    summary: "Rules differ by company and location.",
    checklist: [
      "Open Google Maps in the real product",
      "Check official information",
      "Ask the counter or staff"
    ],
    actions: [
      ["Open Google Maps", "maps-opened", "primary"],
      ["Ask staff", "show-place", "secondary"],
      ["Back", "transport", "secondary"]
    ],
    monetized: {
      title: "Official tickets or activity booking",
      body: "Show only as a support option, not inside urgent screens."
    }
  },
  "arrival-check": {
    status: "UAT-18",
    title: "Final walking section",
    summary: "Confirm the entrance, reception, or meeting place.",
    checklist: [
      "Find the entrance",
      "Find the reception",
      "Find the meeting place",
      "Use a nearby landmark if the entrance is unclear"
    ],
    actions: [
      ["I arrived", "done", "primary"],
      ["Show Japanese", "show-place", "secondary"],
      ["Open Google Maps", "maps-opened", "secondary"]
    ]
  },
  "done": {
    status: "Complete",
    title: "Arrived",
    summary: "The guidance loop is complete.",
    actions: [
      ["Start again", "start", "primary"]
    ]
  }
};

const scenarioStart = {
  bus: "bus-prep",
  train: "train-prep",
  taxi: "taxi-prep",
  limited: "limited-prep",
  coach: "coach-prep",
  other: "other-prep"
};

function render() {
  const data = screens[state.screen] || screens.start;
  const screen = document.querySelector("#screen");
  const fields = data.fields ? `
    <div class="field-grid">
      <label>Destination name <span class="required">Required</span>
        <input value="${state.destination}" data-field="destination" required>
      </label>
      <label>Add area / city / prefecture <span class="optional">Recommended</span>
        <input value="${state.area}" data-field="area">
      </label>
      <label>Add place type
        <input value="${state.placeType}" data-field="placeType">
      </label>
      <label>Set next place to go now
        <input value="${state.nextPlace}" data-field="nextPlace">
      </label>
    </div>
  ` : "";
  const warning = data.warning ? `<div class="warning">${data.warning}</div>` : "";
  const checklist = data.checklist ? `
    <ul class="checklist">
      ${data.checklist.map((item) => `<li>${item}</li>`).join("")}
    </ul>
  ` : "";
  const show = data.show ? `
    <div class="show-card" data-no-monetized="true">
      <p class="ja">${data.show.ja}</p>
      <p class="en">${data.show.en}</p>
    </div>
  ` : "";
  const monetized = data.monetized ? `
    <aside class="monetized" data-monetized="true">
      <strong>${data.monetized.title}</strong>
      <span>${data.monetized.body}</span>
    </aside>
  ` : "";
  const actions = data.actions ? `
    <div class="actions">
      ${data.actions.map(([label, target, kind]) => `<button type="button" class="${kind || "secondary"}" data-target="${target}">${label}</button>`).join("")}
    </div>
  ` : "";

  screen.innerHTML = `
    <div class="status">${data.status}</div>
    <h2>${data.title}</h2>
    ${data.summary ? `<p class="summary">${data.summary}</p>` : ""}
    ${fields}
    ${warning}
    ${show}
    ${checklist}
    ${actions}
    ${monetized}
    ${data.note ? `<p class="note">${data.note}</p>` : ""}
    <p class="note">Prototype for PC and smartphone UAT. Not production UI.</p>
  `;
}

document.addEventListener("click", (event) => {
  const action = event.target.closest("[data-action]");
  if (action?.dataset.action === "reset") {
    state.screen = "start";
    render();
    return;
  }

  const scenario = event.target.closest("[data-scenario]");
  if (scenario) {
    state.scenario = scenario.dataset.scenario;
    state.screen = scenarioStart[state.scenario] || "start";
    render();
    return;
  }

  const target = event.target.closest("[data-target]");
  if (target) {
    state.screen = target.dataset.target;
    render();
  }
});

document.addEventListener("input", (event) => {
  const field = event.target.closest("[data-field]");
  if (field) {
    state[field.dataset.field] = field.value;
  }
});

render();


