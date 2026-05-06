const state = {
  currentPlace: "",
  destination: "Kiyomizu-dera",
  area: "Kyoto",
  placeType: "Temple",
  scenario: "bus",
  screen: "start",
  guideByScreen: {},
  helpByScreen: {}
};

const screens = {
  "start": {
    status: "UAT-01",
    title: "Set destination",
    summary: "Set the exact final destination. Check with your travel companion or hotel staff ahead of your travel to make sure <strong>Google Maps points to the correct place.</strong>",
    fields: true,
    warning: "This app depends on the correct Final Destination. Set it carefully before travel, or when you have enough time and help. Do not rush this step while moving.",
    checklist: [
      { timing: "CHECK Before Travel", text: "Check the exact final destination in Google Maps first", helpIndex: 0 },
      { text: "Open Google Maps, and ask staff if the destination and route are correct", helpIndex: 1 },
      { text: "If Google Maps points to the wrong place, explain or show your destination clearly.", helpIndex: 2 },
      { text: "What is the type of the place?", helpIndex: 3 },
      { timing: "Show When you are lost", text: "Open Google Maps, and ask if you think you are lost.", helpIndex: 1 }
    ],
    jpHelp: [
      ["私の目的地は{finalDestinationLabel}です。Google Maps上、正しく表示されていますか。", "My destination is {finalDestinationLabel}. Is it shown correctly on Google Maps?"],
      ["私の目的地は{finalDestinationLabel}です。ルート・交通手段はこれで正しいですか。", "My destination is {finalDestinationLabel}. Is this route and transportation correct?"],
      ["私が向かうべき場所を入力してもらえますか。あるいはGoogle Maps上で教えてもらえますか。", "Could you type the place I should go to, or show it to me on Google Maps?"],
      ["これは寺・ホテル・駅など、どの種類の場所ですか。", "What type of place is this, such as temple, hotel, or station?"],
      ["Google Mapsのこの場所へ行きたいです。同じ名前の別の場所ではないか見てもらえますか。", "I want to go to this place shown on Google Maps. Can you check it is not a different place with the same name?"]
    ],
    actions: [
      ["Select transportation", "transport", "primary"],
      ["Show Final Destination in JP", "show-place", "secondary"],
      ["Open Google Maps", "maps-opened", "secondary"]
    ],
    note: "The final destination is the base for every Google Maps handoff. Spend extra time here if needed. Use live Google Maps for routes, transport times, and the next bus or train. A screenshot is only a backup for the destination name/place.",
    resourceLink: ["Before travel: confirm destination", "/pre-trip-guide.html"]
  },
  "transport": {
    status: "UAT-02",
    title: "Public transportation",
    summary: "Choose the transport shown in Google Maps. This app helps you prepare and ask people in Japanese.",
    transportChoices: [
      ["Taxi", "taxi-prep"],
      ["Train", "train-prep"],
      ["Shinkansen / LTD Express", "limited-prep"],
      ["Highway Bus", "coach-prep"],
      ["Local Bus", "bus-start"],
      ["Other", "other-prep"]
    ]
  },
  "maps-return": {
    status: "UAT-02",
    title: "Back from Google Maps",
    summary: "Use the latest Google Maps result. Then choose transport.",
    checklist: [
      { text: "Check your current location in Google Maps", helpIndex: 0 },
      { text: "Check the latest route and transportation", helpIndex: 1 }
    ],
    jpHelp: [
      ["Google Maps上の私の現在地はここで合っていますか。", "Is my current location here on Google Maps?"],
      ["私の目的地は{finalDestinationLabel}です。ルート・交通手段はこれで正しいですか。", "My destination is {finalDestinationLabel}. Is this route and transportation correct?"]
    ],
    actions: [
      ["Open Google Maps", "maps-opened", "primary"],
      ["Select transportation", "transport", "secondary"],
      ["Show Final Destination in JP", "show-place", "secondary"]
    ]
  },
  "maps-opened": {
    status: "UAT-02",
    title: "Google Maps opened",
    summary: "Check Google Maps. Then choose transport.",
    warning: "Google Maps routes and transportation can change by time and location. It may differ from what you saw before.",
    checklist: [
      { text: "Check your current location in Google Maps", helpIndex: 0 },
      { text: "Check the route and transportation to the final destination", helpIndex: 1 }
    ],
    jpHelp: [
      ["Google Maps上の私の現在地はここで合っていますか。", "Is my current location here on Google Maps?"],
      ["私の目的地は{finalDestinationLabel}です。ルート・交通手段はこれで正しいですか。", "My destination is {finalDestinationLabel}. Is this route and transportation correct?"]
    ]
  },
  "show-place": {
    status: "UAT-03",
    title: "Show Final Destination in JP",
    summary: "Show this screen to staff or someone nearby when you need help.",
    jpHelp: [
      ["私は{finalDestinationLabel}に向かっています。", "I am heading to {finalDestinationLabel}."],
      ["私の目的地は{finalDestinationLabel}です。ルート・交通手段はこれで正しいですか。", "My destination is {finalDestinationLabel}. Is this route and transportation correct?"]
    ],
    show: {
      ja: "私は{finalDestinationLabel}に向かっています。",
      en: "I am heading to {finalDestinationLabel}."
    },
    actions: [
      ["Back", "start", "secondary"],
      ["Open Google Maps", "maps-opened", "secondary"],
      ["Switch to taxi", "taxi-prep", "secondary"]
    ]
  },
  "bus-start": {
    status: "UAT-04",
    title: "Local bus preparation",
    summary: "Follow the bus checks in order. Some tasks are before the bus stop, and some are at the bus stop.",
    warning: "Local buses are difficult for first-time travelers. If you cannot check the route, direction, cash, and stop, choose taxi or train.",
    checklist: [
      { timing: "Before bus stop", text: "Prepare cash and coins", helpIndex: 0 },
      { timing: "Before bus stop", text: "Check the latest route and departure time in Google Maps" },
      { timing: "At bus stop", text: "Confirm the direction of this bus stop", helpIndex: 1 },
      { timing: "At bus stop", text: "Check the bus route number or destination", helpIndex: 2 },
      { timing: "Before boarding", text: "Check the stop to get off", helpIndex: 4 },
      { timing: "After boarding", text: "Show Google Maps and ask the driver if this is the correct bus", helpIndex: 3 },
      { timing: "After boarding", text: "Ask the driver if this bus stops at the bus stop shown in Google Maps", helpIndex: 4 },
      { timing: "After boarding / Ask passenger if allowed", text: "Ask a passenger only if you need help getting off", helpIndex: 5 }
    ],
    jpHelp: [
      ["現金と小銭を用意したいです。近くのコンビニやお店を教えてください。", "I want to prepare cash and coins. Please tell me where a nearby convenience store or shop is."],
      ["このバス停から{finalDestinationLabel}方面へ行きたいです。道路のこちら側で合っていますか。", "I want to go toward {finalDestinationLabel} from this bus stop. Is this the correct side of the road?"],
      ["このバスの番号か行き先を知りたいです。Google Mapsではこのバスです。", "I want to know this bus route number or destination. Google Maps shows this bus."],
      ["このバスで合っていますか。", "Is this the correct bus?"],
      ["このバスはGoogle Mapsで表示している停留所に停まりますか。", "Will this bus stop at the bus stop shown in Google Maps?"],
      ["Google Mapsで表示している停留所で降りたいです。その停留所に着く少し前に教えてもらえますか。", "I want to get off at the stop shown in Google Maps. Could you tell me shortly before we arrive at that stop?"]
    ],
    note: "Note: Some bus companies may accept transit IC cards."
  },
  "bus-before-stop": {
    status: "UAT-04-A",
    title: "Before going to the bus stop",
    summary: "Prepare money and confirm the bus destination before you walk to the stop.",
    warning: "In rural areas, missing one bus can mean a long wait. Use live Google Maps for the latest route and time.",
    checklist: [
      { timing: "Before bus stop", text: "Prepare cash and coins", helpIndex: 0 },
      { timing: "Before bus stop", text: "Show the bus destination in Google Maps", helpIndex: 1 },
      { timing: "Before bus stop", text: "Check the latest route and departure time in Google Maps" }
    ],
    jpHelp: [
      ["現金と小銭を用意したいです。近くのコンビニやお店を教えてください。", "I want to prepare cash and coins. Please tell me where a nearby convenience store or shop is."],
      ["Google Mapsで表示している停留所で降りたいです。このバスで合っていますか。", "I want to get off at the stop shown in Google Maps. Is this the correct bus?"]
    ],
    note: "A screenshot can help you remember the place name, but use live Google Maps for current routes and times."
  },
  "bus-prep": {
    status: "UAT-04",
    title: "Local bus preparation",
    summary: "Use this at the bus stop, before the bus arrives.",
    warning: "Local buses are difficult for first-time travelers. Use this only if you can carefully check the route, direction, cash, and stop. Choose taxi or train when you cannot check them.",
    checklist: [
      { timing: "At the bus stop, before the bus arrives", text: "Confirm the direction of this bus stop", helpIndex: 0 },
      { timing: "At the bus stop, before the bus arrives", text: "Check the bus route number or destination", helpIndex: 1 },
      { timing: "At the bus stop, before the bus arrives", text: "Show the bus destination in Google Maps", helpIndex: 2 },
      { timing: "At the bus stop, before the bus arrives", text: "Check the stop to get off", helpIndex: 3 }
    ],
    jpHelp: [
      ["このバス停から{finalDestinationLabel}方面へ行きたいです。道路のこちら側で合っていますか。", "I want to go toward {finalDestinationLabel} from this bus stop. Is this the correct side of the road?"],
      ["このバスの番号か行き先を知りたいです。Google Mapsではこのバスです。", "I want to know this bus route number or destination. Google Maps shows this bus."],
      ["Google Mapsで表示している停留所で降りたいです。このバスで合っていますか。", "I want to get off at the stop shown in Google Maps. Is this the correct bus?"],
      ["このバス停で降りたいです。近づいたら教えてもらえますか。", "I want to get off at this bus stop. Can you tell me when it is close?"],
      ["現金と小銭を用意したいです。近くのコンビニやお店を教えてください。", "I want to prepare cash and coins. Please tell me where a nearby convenience store or shop is."]
    ],
    note: "Note: Some bus companies may accept transit IC cards."
  },
  "bus-direction": {
    status: "UAT-05",
    title: "Check bus stop direction",
    summary: "The stop name can be correct, but the direction can be wrong.",
    show: {
      ja: "このバス停から{finalDestinationLabel}方面へ行きたいです。",
      en: "I want to go toward {finalDestinationLabel} from this bus stop."
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
      ja: "{finalDestinationLabel}方面へ行きたいです。",
      en: "I want to go toward {finalDestinationLabel}."
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
      { text: "Wait for the next same route or destination", helpIndex: 0 },
      { text: "Switch to taxi if the place is not far", helpIndex: 1 },
      { text: "Check the last bus if it is late", helpIndex: 2 }
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
      { text: "Check the next service", helpIndex: 0 },
      { text: "Check the last service", helpIndex: 1 },
      { text: "Switch to taxi if uncertain", helpIndex: 2 }
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
      { timing: "Before getting in taxi", text: "Tell staff if you have large luggage and need to call a taxi", helpIndex: 0 },
      { timing: "Before getting in taxi", text: "Raise your hand and wait until the taxi stops at the roadside" },
      { timing: "After taxi stops, ask driver before it starts", text: "Show the final destination if taking taxi all the way", helpIndex: 1 },
      { timing: "After taxi stops, ask driver before it starts", text: "Show the taxi destination in Google Maps.", helpIndex: 2 }
    ],
    jpHelp: [
      ["大きな荷物があります。タクシーを呼びたいです。乗る場所も知りたいです。", "I have large luggage. I want to call a taxi and know where to board."],
      ["タクシーで{finalDestinationLabel}まで行きたいです。", "I want to go to {finalDestinationLabel} by taxi."],
      ["Google Mapsで表示している場所までタクシーで行きたいです。最終目的地ではありません。", "I want to go only to the place shown in Google Maps by taxi. It is not my final destination."]
    ],
    actions: [
      ["Go to final destination", "taxi-driver", "primary"],
      ["Go to Maps place only", "taxi-driver-section", "secondary"],
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
      ja: "タクシーで{finalDestinationLabel}まで行きたいです。",
      en: "I want to go to {finalDestinationLabel} by taxi."
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
    show: {
      ja: "タクシーで{finalDestinationLabel}まで行きたいです。",
      en: "I want to go to {finalDestinationLabel} by taxi."
    },
    actions: [
      ["I arrived", "arrival-check", "primary"],
      ["Back", "taxi-prep", "secondary"],
      ["Open Google Maps", "maps-opened", "secondary"]
    ]
  },
  "taxi-driver-section": {
    status: "UAT-10",
    title: "Show taxi driver",
    show: {
      ja: "Google Mapsで表示している場所までタクシーで行きたいです。最終目的地ではありません。",
      en: "I want to go only to the place shown in Google Maps by taxi. It is not my final destination."
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
      { timing: "Before entering ticket gate", text: "Buy a ticket for the train shown in Google Maps or charge an IC card before entering", helpIndex: 1 },
      { timing: "Before entering ticket gate", text: "Find the ticket gate for the train shown in Google Maps", helpIndex: 0 },
      { timing: "After entering ticket gate", text: "Ask which platform to wait at for the train shown in Google Maps", helpIndex: 2 },
      { timing: "After entering ticket gate", text: "Confirm the train stops at your station", helpIndex: 3 }
    ],
    jpHelp: [
      ["Google Mapsのこの電車に乗りたいです。改札はどこですか？", "I want to take this train shown in Google Maps. Where is the ticket gate?"],
      ["Google Maps上の電車の切符の購入、またはICカードをチャージしたいです。どこでできますか。", "I want to buy a ticket for the train shown in Google Maps or charge my IC card. Where can I do this?"],
      ["Googleマップのこの電車で目的地の駅へ向かいたいです。どのホームで待てばよいですか。", "I want to go toward my destination station using the train shown in Google Maps. Which platform should I wait at?"],
      ["この電車は目的地の駅に止まりますか。急行・快速でも大丈夫ですか。", "Does this train stop at my destination station? Is a rapid or express train okay?"]
    ]
  },
  "train-show": {
    status: "UAT-11",
    title: "Ask station staff",
    show: {
      ja: "Googleマップのこの電車で目的地の駅へ向かいたいです。どのホームで待てばよいですか。",
      en: "I want to go toward my destination station using the train shown in Google Maps. Which platform should I wait at?"
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
      { timing: "Before entering ticket gate", text: "Show Google Maps and ask where to buy the fare and limited express tickets for this train", helpIndex: 1 },
      { timing: "Before entering ticket gate", text: "Find the ticket gate for the Shinkansen or limited express shown in Google Maps", helpIndex: 0 },
      { timing: "After entering ticket gate", text: "Show ticket and check the train name and number on the departure board", helpIndex: 4 },
      { timing: "After entering ticket gate", text: "Show ticket to conductor to check the platform for the train", helpIndex: 3 },
      { timing: "After entering ticket gate", text: "Ask staff if the train is delayed", helpIndex: 5 },
      { timing: "After on Board", text: "Confirm reserved or non-reserved seat", helpIndex: 2 },
      { timing: "After on Board", text: "Check luggage space if needed", helpIndex: 6 },
      { timing: "After on Board", text: "Ask the conductor about paid or reserved luggage space if needed", helpIndex: 7 }
    ],
    jpHelp: [
      ["Google Mapsのこの列車に乗りたいです。新幹線・特急の改札はどこですか。", "I want to take this train shown in Google Maps. Where is the Shinkansen / limited express ticket gate?"],
      ["Google Maps上の新幹線・特急の乗車券と特急券はどこで買えますか。", "Where can I buy the fare ticket and limited express ticket for the Shinkansen / limited express shown in Google Maps?"],
      ["この切符は指定席ですか、自由席ですか。座る場所を知りたいです。", "Is this ticket for a reserved seat or non-reserved seat? I want to know where to sit."],
      ["この特急・新幹線のこの号車に乗るにはどこのホームのどの辺りで待てばいいですか。", "Which platform and area should I wait at for this car of this limited express or Shinkansen?"],
      ["この列車名・号数の列車に乗りたいです。案内表示板に表示されていますか。", "I want to take the train with this name and number. Is it shown on the departure board?"],
      ["この列車は遅れていますか。どの列車に乗ればいいですか。", "Is this train delayed? Which train should I take?"],
      ["大きな荷物があります。置き場所はありますか？", "I have large luggage. Is there a place to put it?"],
      ["車掌さんへ: 予約が必要な荷物スペースは空いていますか？料金はいくらですか？", "For the conductor: Is there any available luggage space that requires reservation? How much is the fee?"]
    ],
    actions: [
      ["Reserved seat", "limited-reserved", "primary"],
      ["Non-reserved seat", "limited-nonreserved", "secondary"],
      ["Show ticket in JP", "limited-show", "secondary"]
    ]
  },
  "limited-reserved": {
    status: "UAT-13-A",
    title: "Reserved seat",
    show: {
      ja: "指定席です。この号車・座席へ行きたいです。",
      en: "I have a reserved seat. I want to find this car and seat."
    },
    actions: [
      ["I checked", "arrival-check", "primary"],
      ["Back", "limited-prep", "secondary"],
      ["Open Google Maps", "maps-opened", "secondary"]
    ]
  },
  "limited-nonreserved": {
    status: "UAT-13-B",
    title: "Non-reserved seat",
    show: {
      ja: "自由席に座りたいです。自由席の車両はどこですか。",
      en: "I want to sit in a non-reserved seat. Which cars are non-reserved?"
    },
    actions: [
      ["I checked", "arrival-check", "primary"],
      ["Back", "limited-prep", "secondary"],
      ["Open Google Maps", "maps-opened", "secondary"]
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
      { timing: "At the ticket counter", text: "Show Google Maps and ask if there is any bus available to the destination", helpIndex: 0 },
      { timing: "Before going to the boarding place", text: "Prepare ticket, QR, email, or booking number", helpIndex: 1 },
      { timing: "Before going to the boarding place", text: "Show the boarding place in Google Maps", helpIndex: 2 },
      { timing: "Before going to the boarding place", text: "Check departure time and destination", helpIndex: 3 },
      { timing: "At the boarding place", text: "Show ticket and confirm if you should wait at this boarding place", helpIndex: 4 },
      { timing: "At the boarding place", text: "Check luggage drop-off if needed", helpIndex: 5 },
      { timing: "Just before boarding", text: "Show ticket and confirm this is the correct bus", helpIndex: 6 }
    ],
    jpHelp: [
      ["目的の場所まで行くバスで空席はありますか？", "Is there any available bus seat to my destination?"],
      ["この予約でこのバスに乗りたいです。予約画面だけで乗れますか。", "I want to take this bus with this booking. Can I board with only this booking screen?"],
      ["Google Maps上のバスの乗り場はどこですか？", "I want to go to the boarding area for the bus shown in Google Maps."],
      ["出発時刻と行き先を知りたいです。集合時刻も教えてください。", "I want to know the departure time and destination. Please also tell me the meeting time."],
      ["このバスに乗るにはここで待てばいいですか。", "Should I wait here to take this bus?"],
      ["大きな荷物を預けたいです。いつどこに預けられますか。", "I want to check in large luggage. When and where can I leave it?"],
      ["このバスで正しいですか。", "Is this the correct bus?"]
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
      { text: "Show the place in Google Maps", helpIndex: 0 },
      { text: "Check official information", helpIndex: 1 },
      { text: "Ask the counter or staff", helpIndex: 2 }
    ],
    jpHelp: [
      ["Googleマップのこの乗り場・入口へ行きたいです。公式の乗り場や入口はどこですか。", "I want to go to this boarding area or entrance shown in Google Maps. Where is the official boarding area or entrance?"],
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
    title: "After this transport",
    summary: "Open Google Maps again from your current location. Then choose the next transport, or finish only at the final destination.",
    checklist: [
      { text: "Open Google Maps and check where you are now" },
      { text: "Check the latest route to the final destination" },
      { text: "Select the next transport after checking Google Maps" },
      { text: "Finish only after you reach the entrance, reception, or meeting place" }
    ],
    inlineActions: true,
    inlineActionStyle: "stage",
    actions: [
      ["Open Google Maps", "maps-opened", "primary"],
      ["Select transportation", "transport", "secondary"],
      ["Arrived at final destination", "done", "secondary"]
    ]
  },
  "done": {
    status: "Complete",
    title: "Arrived",
    summary: "The support flow is complete.",
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
  return `https://www.google.com/maps/dir/?api=1&hl=en&travelmode=transit&destination=${encodeURIComponent(destination)}`;
}

function buildFinalDestinationLabel() {
  return [state.destination, state.area]
    .map((part) => part.trim())
    .filter(Boolean)
    .join(" / ");
}

function fillTemplate(text) {
  return text
    .replaceAll("{finalDestinationLabel}", buildFinalDestinationLabel() || state.destination);
}

function transportChoiceJp(label) {
  const labels = {
    Taxi: "タクシー",
    Train: "電車",
    "Shinkansen / LTD Express": "新幹線・特急",
    "Highway Bus": "高速・空港・夜行バス",
    "Local Bus": "路線バス",
    Other: "その他"
  };
  return labels[label] || "";
}

function resolveChecklistHelpIndex(screenData, guideIndex) {
  const item = screenData.checklist?.[guideIndex];
  if (!screenData.jpHelp?.length) return null;
  if (typeof item !== "object" || !Number.isInteger(item.helpIndex)) return null;
  return item.helpIndex >= 0 && item.helpIndex < screenData.jpHelp.length ? item.helpIndex : null;
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
        <div class="where-display"><span>Where you are</span><small>今自分はここ</small></div>
      </div>
      <button type="button" class="transport-arrow" data-target="transport" aria-label="Choose public transportation">
        <span>public<br>transportation</span>
      </button>
      <div class="transit-row">
        <div class="readonly-field">
          <span>Final Destination <small>目的地</small></span>
          <strong>${state.destination}</strong>
        </div>
        <div class="readonly-field">
          <span>Area of the place <small>地域</small></span>
          <strong>${state.area || "Area not set"}</strong>
        </div>
      </div>
    </section>
  `;
  const fields = data.fields ? `
    <section class="destination-flow" aria-label="Set destination flow">
      <div class="origin-box">
        <div class="where-display"><span>Where you are</span><small>今自分はここ</small></div>
      </div>
      <button type="button" class="transport-arrow" data-target="transport" aria-label="Choose public transportation">
        <span>public<br>transportation</span><em>公共交通</em>
      </button>
      <div class="destination-row">
        <label class="destination-name">
          <span class="label-line">Final Destination <small>目的地</small></span>
          <span class="required">Required / 必須</span>
          <input value="${state.destination}" data-field="destination" required placeholder="Enter place name">
        </label>
        <label>
          <span class="label-line">Area of the place <small>地域</small></span>
          <span class="optional">Recommended / 推奨</span>
          <input value="${state.area}" data-field="area" placeholder="city / town / pref.">
        </label>
        <label>
          <span class="label-line">Type of the place <small>場所の種類</small></span>
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
      <p class="section-hint">Use this section for your own actions.</p>
      <div class="action-checklist">
        ${data.checklist.map((item, index, list) => {
          const text = typeof item === "string" ? item : item.text;
          const timing = typeof item === "string" ? "" : item.timing;
          const previousTiming = index > 0 && typeof list[index - 1] !== "string" ? list[index - 1].timing : "";
          const timingClass = timing === "Show When you are lost" ? " action-timing-soft" : "";
          return `
            ${timing && timing !== previousTiming ? `<p class="action-timing${timingClass}">${timing}</p>` : ""}
            <button type="button" class="${index === selectedGuide ? "selected" : ""}" data-guide="${index}">
              ${text}
            </button>
          `;
        }).join("")}
      </div>
    </section>
  ` : "";
  const transportChoices = data.transportChoices ? `
    <section class="transport-choice-page" aria-label="Public transportation choices">
      <div class="transport-choice-grid">
        ${data.transportChoices.map(([label, target]) => `
          <button type="button" class="secondary" data-target="${target}"><span>${label}</span>${transportChoiceJp(label) ? `<small>${transportChoiceJp(label)}</small>` : ""}</button>
        `).join("")}
      </div>
    </section>
  ` : "";
  const explicitHelpIndex = state.helpByScreen[state.screen];
  const activeHelpIndex = Number.isInteger(explicitHelpIndex) && explicitHelpIndex >= 0 && explicitHelpIndex < (data.jpHelp?.length || 0)
    ? explicitHelpIndex
    : null;
  const selectedPhrase = Number.isInteger(activeHelpIndex) ? data.jpHelp?.[activeHelpIndex] : null;
  const helpOrderFromChecklist = Array.isArray(data.checklist)
    ? data.checklist
      .map((item) => typeof item === "string" ? null : item.helpIndex)
      .filter((index) => Number.isInteger(index) && index >= 0 && index < (data.jpHelp?.length || 0))
    : [];
  const orderedHelpIndices = data.jpHelp
    ? [...new Set(helpOrderFromChecklist)]
      .concat(data.jpHelp.map((_, index) => index).filter((index) => !helpOrderFromChecklist.includes(index)))
    : [];
  const jpHelp = selectedPhrase ? `
    <section class="jp-help" aria-label="Japanese phrases to show if stuck">
      <h3>Show this in JP</h3>
      <p class="section-hint">Use this section only when you need to show Japanese to someone.</p>
      <div class="phrase-choice-list">
        ${orderedHelpIndices.map((index) => {
          const [ja, en] = data.jpHelp[index];
          const isSelected = index === activeHelpIndex;
          return `
          <div class="phrase-choice-row">
            <button type="button" class="phrase-choice ${isSelected ? "selected" : ""}" data-help-index="${index}">
              ${fillTemplate(en)}
            </button>
            ${isSelected ? `
              <div class="phrase-card">
                <p class="phrase-ja">${fillTemplate(ja)}</p>
              </div>
            ` : ""}
          </div>
        `;
        }).join("")}
      </div>
    </section>
  ` : "";
  const show = data.show ? `
    <div class="show-card" data-no-monetized="true">
      ${state.screen === "show-place" ? `
        <div class="show-destination-block">
          <span>Final Destination <small>目的地</small></span>
          <strong>${state.destination}</strong>
          ${state.area ? `<em>${state.area}</em>` : ""}
        </div>
      ` : ""}
      <p class="ja">${fillTemplate(data.show.ja)}</p>
      <p class="en">${fillTemplate(data.show.en)}</p>
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
      <p class="journey-footer-hint">After each transport, open Google Maps again from where you are now.</p>
      <button type="button" class="primary" data-target="transport">Select transportation</button>
      <button type="button" class="secondary" data-target="show-place">Show Final Destination in JP</button>
      <button type="button" class="secondary" data-target="maps-opened" data-open-maps="true">Open Google Maps</button>
    </nav>
  ` : "";
  const actions = ((data.inlineActions || !usesCommonBottomActions) && data.actions) ? `
    <div class="actions${data.inlineActionStyle === "stage" ? " stage-actions" : ""}">
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
    ${actions}
    ${commonBottomActions}
    ${monetized}
    ${data.note ? `<p class="note">${data.note}</p>` : ""}
    ${data.resourceLink ? `<p class="resource-link"><a href="${data.resourceLink[1]}" target="_blank" rel="noopener">${data.resourceLink[0]}</a></p>` : ""}
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
    const guideIndex = Number(guide.dataset.guide);
    const data = screens[state.screen] || screens.start;
    state.guideByScreen[state.screen] = guideIndex;
    const resolvedHelpIndex = resolveChecklistHelpIndex(data, guideIndex);
    if (Number.isInteger(resolvedHelpIndex)) {
      state.helpByScreen[state.screen] = resolvedHelpIndex;
    } else {
      delete state.helpByScreen[state.screen];
    }
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


