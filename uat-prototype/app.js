const state = {
  currentPlace: "",
  destination: "Kiyomizu-dera",
  area: "Kyoto",
  placeType: "Temple",
  nextPlace: "Gojozaka bus stop",
  scenario: "bus",
  screen: "start",
  guideByScreen: {},
  helpByScreen: {},
  noteByScreen: {}
};

const screens = {
  "start": {
    status: "UAT-01",
    title: "Set destination",
    summary: "Set the exact final destination first. Take time, ask someone, or prepare it before travel if needed.",
    fields: true,
    checklist: [
      "Check the exact final destination in Google Maps first",
      "Ask staff or prepare the destination before travel if unsure",
      "Type the exact place name shown in Google Maps",
      "Add area / city / prefecture and place type",
      "Confirm the pin, address, and same-name places before choosing transport"
    ],
    guidance: [
      { text: "If Google Maps shows multiple results, do not guess. Ask someone to check the area or address.", helpIndex: 1 },
      { text: "If you are at a hotel, station, or shop, ask staff to help identify the exact place.", helpIndex: 1 },
      { text: "If you are planning tomorrow's trip, set and check the destination before leaving.", helpIndex: 3 },
      { text: "If the place looks wrong, check it is not a same-name place before choosing transport.", helpIndex: 3 }
    ],
    jpHelp: [
      ["この場所へ行きたいです。Google Mapsではこの名前で表示されています。", "I want to go to this place. Google Maps shows this name."],
      ["この場所で合っていますか。地域や住所も見てもらえますか。", "Is this the correct place? Can you also check the area or address?"],
      ["これは寺・ホテル・駅など、どの種類の場所ですか。", "What type of place is this, such as temple, hotel, or station?"],
      ["Google Mapsのこの場所へ行きたいです。同じ名前の別の場所ではないか見てもらえますか。", "I want to go to this place shown on Google Maps. Can you check it is not a different place with the same name?"]
    ],
    actions: [
      ["Select transportation", "transport", "primary"],
      ["Show Final Destination in JP", "show-place", "secondary"],
      ["Open Google Maps", "maps-opened", "secondary"]
    ],
    note: "The final destination is the base for every Google Maps handoff. Spend extra time here if needed. Use live Google Maps for routes, transport times, and the next bus or train. A screenshot is only a backup for the destination name/place."
  },
  "transport": {
    status: "UAT-02",
    title: "Public transportation",
    transportChoices: [
      ["Taxi", "taxi-prep"],
      ["Train", "train-prep"],
      ["Shinkansen", "limited-prep"],
      ["Highway Bus", "coach-prep"],
      ["Local Bus", "bus-prep"],
      ["Other", "other-prep"]
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
      ["Show Final Destination in JP", "show-place", "secondary"],
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
    title: "Show Final Destination in JP",
    summary: "Show this screen to staff or someone nearby when you need help.",
    guidance: [
      { text: "Use this when you cannot explain the destination in Japanese.", helpIndex: 0 },
      { text: "Show Google Maps to make sure you are on the route.", helpIndex: 1 }
    ],
    jpHelp: [
      ["私はこの場所に向かっています。", "I am heading to this place."],
      ["Googleマップのガイドは正しいですか。", "Show Google Maps to make sure you are on the route."]
    ],
    show: {
      ja: "私はこの場所に向かっています。",
      en: "I am heading to this place."
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
    warning: "Local buses are difficult for first-time travelers. Use this only if you can carefully check the route, direction, cash, and stop. If unsure, choose taxi or train.",
    checklist: [
      { timing: "Before going to the bus stop", text: "Prepare cash and coins", helpIndex: 0 },
      { timing: "Before going to the bus stop", text: "Keep the Google Maps bus route ready to show", helpIndex: 3 },
      { timing: "At the bus stop, before the bus arrives", text: "Confirm the direction of this bus stop", helpIndex: 4 },
      { timing: "At the bus stop, before the bus arrives", text: "Check the bus route number or destination", helpIndex: 1 },
      { timing: "At the bus stop, before the bus arrives", text: "Check the stop to get off", helpIndex: 2 }
    ],
    guidance: [
      { text: "If the bus stop direction is unclear, ask before the bus arrives.", helpIndex: 4 },
      { text: "If the route number or destination is unclear, show the Google Maps bus screen.", helpIndex: 1 },
      { text: "If no one can help, reopen the Google Maps bus route or switch to taxi.", helpIndex: 3 }
    ],
    jpHelp: [
      ["現金と小銭を用意したいです。近くにコンビニやお店はありますか。", "I want to prepare cash and coins. Is there a convenience store or any shop nearby?"],
      ["このバスの番号か行き先を知りたいです。Google Mapsではこのバスです。", "I want to know this bus route number or destination. Google Maps shows this bus."],
      ["このバス停で降りたいです。近づいたら教えてもらえますか。", "I want to get off at this bus stop. Can you tell me when it is close?"],
      ["Google Mapsのこのバスに乗りたいです。このバス停と方向で合っていますか。", "I want to take this bus shown on Google Maps. Is this the correct bus stop and direction?"],
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
      ["Show Final Destination in JP", "show-place", "secondary"]
    ]
  },
  "taxi-prep": {
    status: "UAT-09",
    title: "Taxi preparation",
    summary: "Choose where this taxi should go.",
    checklist: [
      { timing: "Before getting in taxi", text: "Tell staff if you have large luggage and need to call a taxi", helpIndex: 2 },
      { timing: "Before getting in taxi", text: "Raise one arm straight up toward an available taxi", helpIndex: 3 },
      { timing: "After taxi stops, ask driver before it starts", text: "Show the final destination if taking taxi all the way", helpIndex: 0 },
      { timing: "After taxi stops, ask driver before it starts", text: "Show the next station or bus stop if using taxi only for this section", helpIndex: 1 }
    ],
    guidance: [
      { text: "If the taxi is only for part of the trip, show only the taxi destination to the driver.", helpIndex: 1 },
      { text: "If you have large luggage or do not know where to board, ask staff before getting in.", helpIndex: 2 },
      { text: "If taking taxi all the way, show the final destination after the taxi stops.", helpIndex: 0 }
    ],
    jpHelp: [
      ["タクシーでこの場所まで行きたいです。", "I want to go to this place by taxi."],
      ["タクシーでは次の駅・バス停まで行きたいです。最終目的地ではありません。", "I want to go only to the next station or bus stop by taxi. It is not my final destination."],
      ["大きな荷物があります。タクシーを呼びたいです。乗る場所も知りたいです。", "I have large luggage. I want to call a taxi and know where to board."],
      ["タクシーを拾いたいです。タクシーに向かって片手をまっすぐ上に挙げます。", "I want to hail a taxi. I will raise one arm straight up toward the taxi."]
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
    summary: "Use this after you reach the station area. Check the gate before entering.",
    checklist: [
      { timing: "Before entering ticket gate", text: "Find the ticket gate for the train shown in Google Maps" },
      { timing: "Before entering ticket gate", text: "Buy a ticket or charge an IC card before entering" },
      { timing: "After entering ticket gate", text: "Confirm platform and direction" },
      { timing: "After entering ticket gate", text: "Confirm the train stops at your station" }
    ],
    guidance: [
      { text: "Ask station staff or gate staff before entering the wrong railway gate or platform.", helpIndex: 0 },
      { text: "If you are unsure about platform or direction, show the platform request in JP.", helpIndex: 2 },
      { text: "If you are unsure about rapid or express trains, show the train stop request in JP.", helpIndex: 3 }
    ],
    jpHelp: [
      ["Google Mapsのこの電車に乗りたいです。改札はどこですか？", "I want to take this train shown in Google Maps. Where is the ticket gate?"],
      ["切符の購入、またはICカードをチャージしたいです。どこでできますか。", "I want to buy a ticket or charge my IC card. Where can I do this?"],
      ["目的の駅へ向かいたいです。どのホームで待てばよいですか。", "I want to go toward my destination station. Which platform should I wait at?"],
      ["この電車は目的地の駅に止まりますか。急行・快速でも大丈夫ですか。", "Does this train stop at my destination station? Is a rapid or express train okay?"]
    ],
    actions: [
      ["Show Final Destination in JP", "show-place", "primary"],
      ["Open Google Maps", "maps-opened", "secondary"]
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
      { timing: "Before entering ticket gate", text: "Prepare the basic fare ticket" },
      { timing: "Before entering ticket gate", text: "Prepare the limited express ticket" },
      { timing: "After entering ticket gate", text: "Confirm reserved or non-reserved seat" },
      { timing: "After entering ticket gate", text: "Confirm train name, car number, and seat" },
      { timing: "After on Board", text: "Check luggage space if needed" }
    ],
    guidance: [
      { text: "If you are unsure which ticket to put through the gate, show the ticket request in JP.", helpIndex: 0 },
      { text: "If you are unsure whether this is reserved or non-reserved, show the seat request in JP.", helpIndex: 2 },
      { text: "If the train name or number is unclear, show the display board request in JP.", helpIndex: 3 },
      { text: "If you have large luggage, show the luggage request after boarding.", helpIndex: 4 }
    ],
    noteHelp: {
      note: "Note: Some Shinkansen luggage spaces may require advance reservation.",
      ja: "車掌さんへ: 予約が必要な荷物スペースは空いていますか？料金はいくらですか？",
      en: "For the conductor: Is there any available luggage space that requires reservation? How much is the fee?"
    },
    jpHelp: [
      ["この切符でこの列車に乗りたいです。改札に通す切符はどれですか。", "I want to take this train with this ticket. Which ticket should I put through the gate?"],
      ["この特急券で乗りたいです。乗車券も必要ですか。", "I want to ride with this limited express ticket. Do I also need a basic fare ticket?"],
      ["この切符は指定席ですか、自由席ですか。座る場所を知りたいです。", "Is this ticket for a reserved seat or non-reserved seat? I want to know where to sit."],
      ["この列車名・号数の列車に乗りたいです。案内表示(LED掲示)板に表示されていますか。", "I want to take the train with this name and number. Is it shown on the information display / LED board?"],
      ["大きな荷物があります。置き場所はありますか？", "I have large luggage. Is there a place to put it?"]
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
      { timing: "Before going to the boarding place", text: "Prepare ticket, QR, email, or booking number", helpIndex: 0 },
      { timing: "Before going to the boarding place", text: "Confirm boarding place and meeting time", helpIndex: 2 },
      { timing: "At the boarding place", text: "Confirm bus company and service name", helpIndex: 1 },
      { timing: "At the boarding place", text: "Check departure time and destination", helpIndex: 3 },
      { timing: "At the boarding place", text: "Check luggage drop-off if needed", helpIndex: 4 }
    ],
    guidance: [
      { text: "If the boarding place is unclear, ask for the building, floor, or number.", helpIndex: 2 },
      { text: "If the bus company or service name is unclear, show the company and service request.", helpIndex: 1 },
      { text: "If the booking screen may not be enough, show the booking request.", helpIndex: 0 },
      { text: "If you have large luggage, ask where and when to drop it off.", helpIndex: 4 }
    ],
    jpHelp: [
      ["この予約でこのバスに乗りたいです。予約画面だけで乗れますか。", "I want to take this bus with this booking. Can I board with only this booking screen?"],
      ["このバス会社と便名で合っていますか。", "Is this the correct bus company and service name?"],
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
      ["Show Final Destination in JP", "show-place", "secondary"],
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
      ["Show Final Destination in JP", "show-place", "secondary"],
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

function buildDestinationQuery() {
  return [state.destination, state.area, state.placeType]
    .map((part) => part.trim())
    .filter(Boolean)
    .join(" ");
}

function buildGoogleMapsUrl() {
  const destination = buildDestinationQuery() || state.destination;
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}`;
}

function maybeOpenGoogleMaps() {
  const url = buildGoogleMapsUrl();
  if (typeof window !== "undefined" && typeof window.open === "function") {
    window.open(url, "_blank", "noopener");
  }
}

function render() {
  const data = screens[state.screen] || screens.start;
  const screen = document.querySelector("#screen");
  const isTransportChoice = state.screen === "transport";
  const usesCommonBottomActions = !data.fields && state.screen !== "transport" && state.screen !== "done";
  const context = (data.fields || isTransportChoice) ? "" : `
    <section class="context-bar transit-flow" aria-label="Current trip context">
      <div class="origin-box context-origin">
        <div class="where-display">Where you are</div>
      </div>
      <button type="button" class="transport-arrow" data-target="transport" aria-label="Choose public transportation">
        <span>public<br>transportation</span>
      </button>
      <div class="transit-row">
        <div class="readonly-field">
          <span>Final Destination</span>
          <strong>${state.destination}</strong>
        </div>
        <div class="readonly-field">
          <span>Area of the place</span>
          <strong>${state.area || "Area not set"}</strong>
        </div>
      </div>
    </section>
  `;
  const fields = data.fields ? `
    <section class="destination-flow" aria-label="Set destination flow">
      <div class="origin-box">
        <div class="where-display">Where you are</div>
      </div>
      <button type="button" class="transport-arrow" data-target="transport" aria-label="Choose public transportation">
        <span>public<br>transportation</span>
      </button>
      <div class="destination-row">
        <label class="destination-name">Final Destination <span class="required">Required</span>
          <input value="${state.destination}" data-field="destination" required placeholder="Enter place name">
        </label>
        <label>Area of the place <span class="optional">Recommended</span>
          <input value="${state.area}" data-field="area" placeholder="city / town / pref.">
        </label>
        <label>Type of the place
          <input value="${state.placeType}" data-field="placeType" placeholder="temple, shrine, castle, park, beach, etc.">
        </label>
      </div>
    </section>
  ` : "";
  const warning = data.warning ? `<div class="warning">${data.warning}</div>` : "";
  const selectedGuide = state.guideByScreen[state.screen] || 0;
  const checklist = data.checklist ? `
    <section class="section-block">
      <h3>What you should do now</h3>
      <div class="action-checklist">
        ${data.checklist.map((item, index, list) => {
          const text = typeof item === "string" ? item : item.text;
          const timing = typeof item === "string" ? "" : item.timing;
          const previousTiming = index > 0 && typeof list[index - 1] !== "string" ? list[index - 1].timing : "";
          return `
            ${timing && timing !== previousTiming ? `<p class="action-timing">${timing}</p>` : ""}
            <button type="button" class="${index === selectedGuide ? "selected" : ""}" data-guide="${index}">
              ${text}
            </button>
          `;
        }).join("")}
      </div>
    </section>
  ` : "";
  const guidance = (data.guidance && !isTransportChoice) ? `
    <section class="guidance" aria-label="What to do if unsure">
      <h3>If unsure</h3>
      <ul>
        ${data.guidance.map((item) => {
          const text = typeof item === "string" ? item : item.text;
          return typeof item === "object" && Number.isInteger(item.helpIndex)
            ? `<li><button type="button" class="guidance-button" data-help-index="${item.helpIndex}">${text}</button></li>`
            : `<li>${text}</li>`;
        }).join("")}
      </ul>
    </section>
  ` : "";
  const transportChoices = data.transportChoices ? `
    <section class="transport-choice-page" aria-label="Public transportation choices">
      <div class="transport-choice-grid">
        ${data.transportChoices.map(([label, target]) => `
          <button type="button" class="secondary" data-target="${target}">${label}</button>
        `).join("")}
      </div>
    </section>
  ` : "";
  const selectedChecklistItem = data.checklist?.[selectedGuide];
  const selectedHelpIndex = typeof selectedChecklistItem === "object" && Number.isInteger(selectedChecklistItem.helpIndex)
    ? selectedChecklistItem.helpIndex
    : selectedGuide;
  const explicitHelpIndex = state.helpByScreen[state.screen];
  const activeHelpIndex = Number.isInteger(explicitHelpIndex) ? explicitHelpIndex : selectedHelpIndex;
  const selectedPhrase = data.jpHelp?.[activeHelpIndex] || data.jpHelp?.[0];
  const showInlineNoteHelp = Boolean(data.noteHelp && state.screen === "limited-prep" && activeHelpIndex === 4);
  const inlineNoteHelp = showInlineNoteHelp ? `
    <div class="phrase-card note-help-card">
      <p class="phrase-ja">${data.noteHelp.ja}</p>
      <p class="phrase-en">${data.noteHelp.en}</p>
      <p class="note">${data.noteHelp.note}</p>
    </div>
  ` : "";
  const jpHelp = selectedPhrase ? `
    <section class="jp-help" aria-label="Japanese phrases to show if stuck">
      <h3>Show this in JP</h3>
      <div class="phrase-list">
        ${[selectedPhrase].map(([ja, en]) => `
          <div class="phrase-card">
            <p class="phrase-ja">${ja}</p>
            <p class="phrase-en">${en}</p>
          </div>
        `).join("")}
        ${inlineNoteHelp}
      </div>
    </section>
  ` : "";
  const noteHelp = data.noteHelp && !showInlineNoteHelp ? `
    <section class="note-help" aria-label="Additional note">
      <button type="button" class="note-help-button" data-note-help>
        ${data.noteHelp.note}
      </button>
      ${state.noteByScreen[state.screen] ? `
        <div class="phrase-card note-help-card">
          <p class="phrase-ja">${data.noteHelp.ja}</p>
          <p class="phrase-en">${data.noteHelp.en}</p>
        </div>
      ` : ""}
    </section>
  ` : "";
  const show = data.show ? `
    <div class="show-card" data-no-monetized="true">
      ${state.screen === "show-place" ? `
        <div class="show-destination-block">
          <span>Final Destination</span>
          <strong>${state.destination}</strong>
          ${state.area ? `<em>${state.area}</em>` : ""}
        </div>
      ` : ""}
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
  const commonBottomActions = usesCommonBottomActions ? `
    <nav class="journey-footer" aria-label="Journey navigation">
      <button type="button" class="primary" data-target="transport">Select transportation</button>
      <button type="button" class="secondary" data-target="show-place">Show Final Destination in JP</button>
      <button type="button" class="secondary" data-target="maps-opened" data-open-maps="true">Open Google Maps</button>
    </nav>
  ` : "";
  const actions = (!usesCommonBottomActions && data.actions) ? `
    <div class="actions">
      ${data.actions.map(([label, target, kind]) => {
        const mapsAttr = target === "maps-opened" ? ' data-open-maps="true"' : "";
        return `<button type="button" class="${kind || "secondary"}" data-target="${target}"${mapsAttr}>${label}</button>`;
      }).join("")}
    </div>
  ` : "";

  screen.innerHTML = `
    ${isTransportChoice ? "" : `<div class="status">${data.status}</div>`}
    ${isTransportChoice ? "" : `<h2>${data.title}</h2>`}
    ${(!isTransportChoice && data.summary) ? `<p class="summary">${data.summary}</p>` : ""}
    ${context}
    ${fields}
    ${warning}
    ${show}
    ${transportChoices}
    ${checklist}
    ${jpHelp}
    ${guidance}
    ${actions}
    ${commonBottomActions}
    ${monetized}
    ${noteHelp}
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
  const noteHelp = event.target.closest("[data-note-help]");
  if (noteHelp) {
    state.noteByScreen[state.screen] = !state.noteByScreen[state.screen];
    render();
    return;
  }

  const helpIndex = event.target.closest("[data-help-index]");
  if (helpIndex) {
    state.helpByScreen[state.screen] = Number(helpIndex.dataset.helpIndex);
    render();
    return;
  }

  const target = event.target.closest("[data-target]");
  if (target) {
    if (target.dataset.openMaps === "true") {
      maybeOpenGoogleMaps();
    }
    state.screen = target.dataset.target;
    render();
    return;
  }

  const guide = event.target.closest("[data-guide]");
  if (guide) {
    state.guideByScreen[state.screen] = Number(guide.dataset.guide);
    delete state.helpByScreen[state.screen];
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


