const state = {
  destination: "Kiyomizu-dera",
  area: "Kyoto",
  placeType: "Temple",
  nextPlace: "Gojozaka bus stop",
  scenario: "bus",
  screen: "start",
  guideByScreen: {}
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
      "Type in the place shown in Google Maps"
    ],
    guidance: [
      "If Google Maps shows multiple results, add the city or prefecture before continuing.",
      "If the place looks wrong, edit the destination before choosing transport."
    ],
    jpHelp: [
      ["この場所へ行きたいです。Google Mapsではこの名前で表示されています。", "I want to go to this place. Google Maps shows this name."],
      ["この場所で合っていますか。地域や住所も見てもらえますか。", "Is this the correct place? Can you also check the area or address?"],
      ["これは寺・ホテル・駅など、どの種類の場所ですか。", "What type of place is this, such as temple, hotel, or station?"],
      ["Google Mapsのこの場所へ行きたいです。同じ名前の別の場所ではないか見てもらえますか。", "I want to go to this place shown on Google Maps. Can you check it is not a different place with the same name?"]
    ],
    actions: [
      ["Choose transport", "transport", "primary"],
      ["Show destination in JP", "show-place", "secondary"],
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
    guidance: [
      "Choose the transport for the next leg shown in Google Maps, not the whole trip.",
      "If the next leg feels too complicated or short, choose taxi."
    ],
    jpHelp: [
      ["次に行く場所へ行きたいです。どの移動手段がよいですか。", "I want to go to the next place. Which transport should I use?"],
      ["Google Mapsでこの場所へ行きたいです。ここからの行き方を見たいです。", "I want to go to this place with Google Maps. I want to see how to get there from here."],
      ["タクシーで行きたいです。近くで乗れる場所はありますか。", "I want to go by taxi. Is there a nearby place to take one?"]
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
    guidance: [
      "If you reached a station, bus stop, or entrance, continue with arrival confirmation.",
      "If you are still unsure where you are, open Google Maps or show the destination in JP."
    ],
    jpHelp: [
      ["この場所へ行きたいです。ここから次にどこへ向かえばよいですか。", "I want to go to this place. Where should I go next from here?"],
      ["この駅・バス停・入口で合っていますか。Google Mapsではここです。", "Is this the correct station, bus stop, or entrance? Google Maps shows this place."],
      ["入口へ行きたいです。近くまで来ています。", "I want to go to the entrance. I am nearby."]
    ],
    actions: [
      ["I arrived here", "arrival-check", "primary"],
      ["Show destination in JP", "show-place", "secondary"],
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
    guidance: [
      "Do not continue if the pin points to a same-name place in another area.",
      "If the entrance is unclear, keep Google Maps open and confirm again near the place."
    ],
    jpHelp: [
      ["Google Mapsのこの場所へ行きたいです。同じ名前の別の場所ではないですか。", "I want to go to this place shown on Google Maps. Is it not a different place with the same name?"],
      ["この住所の場所へ行きたいです。地域は合っていますか。", "I want to go to the place at this address. Is the area correct?"],
      ["これは寺・ホテル・駅など、どの種類の場所ですか。", "What type of place is this, such as temple, hotel, or station?"],
      ["入口へ行きたいです。ピンではなく入口を知りたいです。", "I want to go to the entrance. I need the entrance, not only the map pin."],
      ["この場所で合っていますか。違う場合は教えてください。", "Is this the correct place? Please tell me if it is wrong."]
    ],
    actions: [
      ["This is correct", "maps-return", "primary"],
      ["Edit destination", "start", "secondary"],
      ["Back", "transport", "secondary"]
    ]
  },
  "show-place": {
    status: "UAT-03",
    title: "Show destination in JP",
    summary: "Show this screen to staff or someone nearby when you need help.",
    guidance: [
      "Show the full screen. The large Japanese line is for the other person.",
      "Use this when you cannot explain the destination in Japanese."
    ],
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
    guidance: [
      "Confirm the bus stop direction before the bus arrives. Asking the driver after the bus arrives may be too late.",
      "Ask a waiting passenger or nearby staff. If no one can help, open Google Maps again or switch to taxi."
    ],
    jpHelp: [
      ["現金と小銭を用意したいです。近くにコンビニやお店はありますか。", "I want to prepare cash and coins. Is there a convenience store or any shop nearby?"],
      ["このバスの番号か行き先を知りたいです。Google Mapsではこのバスです。", "I want to know this bus route number or destination. Google Maps shows this bus."],
      ["このバス停で降りたいです。近づいたら教えてもらえますか。", "I want to get off at this bus stop. Can you tell me when it is close?"],
      ["Google Mapsのこのバスに乗りたいです。この画面で合っていますか。", "I want to take this bus shown on Google Maps. Is this screen correct?"],
      ["このバス停から清水寺方面へ行きたいです。道路のこちら側で合っていますか。", "I want to go toward Kiyomizu-dera from this bus stop. Is this the correct side of the road?"]
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
    guidance: [
      "Show this to someone already waiting at the stop. They can usually tell if this side of the road is correct.",
      "If they say no or look unsure, do not keep waiting here. Recheck Google Maps or move to the opposite stop."
    ],
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
    guidance: [
      "Keep this short. The driver has little time at the door.",
      "If the driver or passengers indicate this is wrong, do not board. Open Google Maps again or switch to taxi."
    ],
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
    guidance: [
      "Waiting is possible, but the next bus may also be full or crowded.",
      "If the destination is not far, taxi is usually safer than waiting."
    ],
    jpHelp: [
      ["次の同じ行き先のバスに乗りたいです。ここで待てばよいですか。", "I want to take the next bus with the same destination. Should I wait here?"],
      ["目的地が遠くないです。タクシーで行きたいです。近くで乗れますか。", "My destination is not far. I want to take a taxi. Can I take one nearby?"],
      ["最終バスはまだありますか。待っても大丈夫ですか。", "Is there still a last bus? Is it okay to wait?"]
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
    guidance: [
      "Do not wait without checking. In rural areas, one missed service can mean hours of waiting.",
      "If there may be no later service today, switch to taxi or ask staff immediately."
    ],
    jpHelp: [
      ["次の便はまだありますか。長く待つ必要がありますか。", "Is there another service? Will I need to wait a long time?"],
      ["最終便は終わりましたか。今日中に移動できますか。", "Has the last service already left? Can I still travel today?"],
      ["タクシーで行きたいです。ここから呼べますか。", "I want to go by taxi. Can I call one from here?"]
    ],
    actions: [
      ["Open Google Maps", "maps-opened", "primary"],
      ["Switch to taxi", "taxi-prep", "secondary"],
      ["Show destination in JP", "show-place", "secondary"]
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
    guidance: [
      "If the taxi is only for part of the trip, show only the taxi destination to the driver.",
      "Ask hotel staff if you do not know where the taxi should drop you."
    ],
    jpHelp: [
      ["タクシーでこの場所まで行きたいです。ここを目的地として伝えてください。", "I want to go to this place by taxi. Please use this as the taxi destination."],
      ["タクシーでは次の駅・バス停まで行きたいです。最終目的地ではありません。", "I want to go only to the next station or bus stop by taxi. It is not my final destination."],
      ["大きな荷物があります。タクシーを呼びたいです。乗る場所も知りたいです。", "I have large luggage. I want to call a taxi and know where to board."]
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
    guidance: [
      "Use this when asking hotel staff to call a taxi or choose the best drop-off point.",
      "Hotel staff can understand both the final destination and the taxi destination."
    ],
    show: {
      ja: "タクシーでこの場所まで行きたいです。",
      en: "I want to go to this place by taxi."
    },
    actions: [
      ["Show taxi destination in JP", "taxi-driver", "primary"],
      ["Back", "taxi-prep", "secondary"],
      ["Open Google Maps", "maps-opened", "secondary"]
    ]
  },
  "taxi-driver": {
    status: "UAT-10",
    title: "Show taxi driver",
    guidance: [
      "Show only where the taxi should go now.",
      "If the taxi is only to a station or bus stop, do not show the final tourist destination as the taxi destination."
    ],
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
      "Buy a ticket or charge an IC card",
      "Check the station and ticket gate",
      "Confirm platform and direction",
      "Confirm the train stops at your station"
    ],
    guidance: [
      "Ask station staff before entering the wrong gate or platform.",
      "If you are unsure about rapid or express trains, show the station request in JP."
    ],
    jpHelp: [
      ["切符の購入、またはICカードをチャージしたいです。この駅から目的地まで乗れますか。", "I want to buy a ticket or charge an IC card. Can I go from this station to my destination?"],
      ["この駅の改札へ行きたいです。どの改札ですか。", "I want to go to the ticket gate at this station. Which gate should I use?"],
      ["目的地の駅へ行きたいです。どのホームですか。", "I want to go to my destination station. Which platform should I use?"],
      ["この電車は目的地の駅に止まりますか。急行・快速でも大丈夫ですか。", "Does this train stop at my destination station? Is a rapid or express train okay?"]
    ],
    actions: [
      ["Show station request in JP", "train-show", "primary"],
      ["Open Google Maps", "maps-opened", "secondary"],
      ["Switch to taxi", "taxi-prep", "secondary"]
    ]
  },
  "train-show": {
    status: "UAT-11",
    title: "Ask station staff",
    guidance: [
      "Show this to station staff or someone on the platform.",
      "Use it before boarding if you are unsure about platform, direction, or train type."
    ],
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
    guidance: [
      "Confirm ticket and train details before going through the gate or boarding.",
      "For reserved seats, train name, time, car number, and seat must match."
    ],
    jpHelp: [
      ["この切符でこの列車に乗りたいです。改札に通す切符はどれですか。", "I want to take this train with this ticket. Which ticket should I put through the gate?"],
      ["この特急券で乗りたいです。乗車券も必要ですか。", "I want to ride with this limited express ticket. Do I also need a basic fare ticket?"],
      ["指定席ですか、自由席ですか。座る場所を知りたいです。", "Is this reserved or non-reserved? I want to know where to sit."],
      ["この列車名・号数の列車に乗りたいです。電光掲示板のどれですか。", "I want to take the train with this name and number. Which one is it on the departure board?"],
      ["大きな荷物があります。置き場所や予約が必要ですか。", "I have large luggage. Do I need a luggage space or reservation?"]
    ],
    actions: [
      ["Reserved seat", "limited-show", "primary"],
      ["Non-reserved seat", "limited-show", "secondary"],
      ["Show ticket in JP", "limited-show", "secondary"]
    ]
  },
  "limited-show": {
    status: "UAT-12 / UAT-13",
    title: "Show station staff",
    guidance: [
      "Show this with your ticket or booking screen.",
      "If staff says the ticket is not enough, ask where to buy or change the missing ticket."
    ],
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
    guidance: [
      "Confirm at the counter or with boarding staff before the bus arrives.",
      "If the counter is closed, show the booking to the driver or boarding staff quickly."
    ],
    jpHelp: [
      ["この予約でこのバスに乗りたいです。予約画面だけで乗れますか。", "I want to take this bus with this booking. Can I board with only this booking screen?"],
      ["このバス会社と便名で合っていますか。乗るバスを間違えたくありません。", "Is this the correct bus company and service name? I do not want to take the wrong bus."],
      ["乗り場へ行きたいです。建物・階・番号を教えてください。", "I want to go to the boarding area. Please tell me the building, floor, or number."],
      ["出発時刻と行き先を知りたいです。集合時刻も教えてください。", "I want to know the departure time and destination. Please also tell me the meeting time."],
      ["大きな荷物を預けたいです。どこで、いつ預けますか。", "I want to check in large luggage. Where and when should I leave it?"]
    ],
    actions: [
      ["Show booking in JP", "coach-show", "primary"],
      ["Open Google Maps", "maps-opened", "secondary"],
      ["Switch to taxi", "taxi-prep", "secondary"]
    ]
  },
  "coach-show": {
    status: "UAT-14",
    title: "Show bus staff",
    guidance: [
      "Show this with the QR code, email, ticket, or booking number.",
      "Use it to confirm the exact bus, boarding place, and whether this screen is enough to board."
    ],
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
    guidance: [
      "Rules differ by company and place. Do not guess from bus or train rules.",
      "Use official information, the service app, counter staff, or local staff."
    ],
    jpHelp: [
      ["この場所へ行きたいです。公式の乗り場や入口はどこですか。", "I want to go to this place. Where is the official boarding area or entrance?"],
      ["公式情報を見たいです。運休や最終便はありますか。", "I want to see official information. Is there any suspension or last service?"],
      ["窓口か係員に聞きたいです。どこへ行けばよいですか。", "I want to ask the counter or staff. Where should I go?"]
    ],
    actions: [
      ["Open Google Maps", "maps-opened", "primary"],
      ["Show destination in JP", "show-place", "secondary"],
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
    guidance: [
      "Do not finish only because Google Maps says you arrived.",
      "If the entrance or meeting point is unclear, show the destination in JP or open Google Maps again."
    ],
    jpHelp: [
      ["入口へ行きたいです。Google Mapsのピンではなく入口を知りたいです。", "I want to go to the entrance. I need the entrance, not only the Google Maps pin."],
      ["受付へ行きたいです。この建物で合っていますか。", "I want to go to the reception. Is this the correct building?"],
      ["集合場所へ行きたいです。ここで合っていますか。", "I want to go to the meeting place. Is this the correct place?"],
      ["近くの目印から入口へ行きたいです。道を教えてください。", "I want to go to the entrance from a nearby landmark. Please tell me the way."]
    ],
    actions: [
      ["I arrived", "done", "primary"],
      ["Show destination in JP", "show-place", "secondary"],
      ["Open Google Maps", "maps-opened", "secondary"]
    ]
  },
  "done": {
    status: "Complete",
    title: "Arrived",
    summary: "The guidance loop is complete.",
    guidance: [
      "Start a new destination only after you have found the entrance, reception, or meeting place.",
      "If you are only near the area, go back and confirm the final walking section."
    ],
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
  const context = `
    <section class="context-bar" aria-label="Current trip context">
      <div>
        <span>Destination</span>
        <strong>${state.destination}</strong>
      </div>
      <div>
        <span>Area</span>
        <strong>${state.area}</strong>
      </div>
      <div>
        <span>Next place now</span>
        <strong>${state.nextPlace}</strong>
      </div>
    </section>
  `;
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
  const selectedGuide = state.guideByScreen[state.screen] || 0;
  const checklist = data.checklist ? `
    <section class="section-block">
      <h3>What you should do now</h3>
      <div class="action-checklist">
        ${data.checklist.map((item, index) => `
          <button type="button" class="${index === selectedGuide ? "selected" : ""}" data-guide="${index}">
            ${item}
          </button>
        `).join("")}
      </div>
    </section>
  ` : "";
  const guidance = data.guidance ? `
    <section class="guidance" aria-label="What to do if unsure">
      <h3>If unsure</h3>
      <ul>
        ${data.guidance.map((item) => `<li>${item}</li>`).join("")}
      </ul>
    </section>
  ` : "";
  const jpHelp = data.jpHelp ? `
    <section class="jp-help" aria-label="Japanese phrases to show if stuck">
      <h3>Show this in JP</h3>
      <div class="phrase-list">
        ${[
          data.jpHelp[selectedGuide] || data.jpHelp[0]
        ].map(([ja, en]) => `
          <div class="phrase-card">
            <p class="phrase-ja">${ja}</p>
            <p class="phrase-en">${en}</p>
          </div>
        `).join("")}
      </div>
    </section>
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
    ${context}
    ${fields}
    ${warning}
    ${show}
    ${checklist}
    ${jpHelp}
    ${guidance}
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
    return;
  }

  const guide = event.target.closest("[data-guide]");
  if (guide) {
    state.guideByScreen[state.screen] = Number(guide.dataset.guide);
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


