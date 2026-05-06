import { readFile } from "node:fs/promises";

const html = await readFile(new URL("./index.html", import.meta.url), "utf8");
const siteEntryHtml = await readFile(new URL("./site-entry.html", import.meta.url), "utf8");
const preTripHtml = await readFile(new URL("./pre-trip-guide.html", import.meta.url), "utf8");
const css = await readFile(new URL("./styles.css", import.meta.url), "utf8");
const js = await readFile(new URL("./app.js", import.meta.url), "utf8");

const results = [];

function record(id, priority, name, pass, note = "") {
  results.push({ id, priority, name, status: pass ? "PASS" : "FAIL", note });
}

function countActions(screenName) {
  const block = getScreenBlock(screenName);
  if (block === null) return null;
  const actionsStart = block.indexOf("actions:");
  if (actionsStart === -1) return 0;
  const actionsEnd = block.indexOf("\n    ]", actionsStart);
  const actionsBlock = block.slice(actionsStart, actionsEnd === -1 ? block.length : actionsEnd);
  const actions = actionsBlock.match(/\["[^"]+",\s*"[^"]+"/g) || [];
  return actions.length;
}

function getScreenBlock(screenName) {
  const screenStart = js.indexOf(`${JSON.stringify(screenName)}:`);
  if (screenStart === -1) return null;
  const nextScreen = js.indexOf("\n  \"", screenStart + 10);
  return js.slice(screenStart, nextScreen === -1 ? js.length : nextScreen);
}

function appearsInOrder(block, snippets) {
  let position = -1;
  return snippets.every((snippet) => {
    const next = block.indexOf(snippet, position + 1);
    if (next === -1) return false;
    position = next;
    return true;
  });
}

const requiredScreens = [
  ["UAT-01", "Critical", "start"],
  ["UAT-01-A", "Critical", "start"],
  ["UAT-02", "Critical", "maps-return"],
  ["UAT-02-A", "Critical", "maps-opened"],
  ["UAT-03", "Critical", "show-place"],
  ["UAT-04-A", "Critical", "bus-start"],
  ["UAT-04-B", "Critical", "bus-before-stop"],
  ["UAT-04", "Critical", "bus-prep"],
  ["UAT-05", "Critical", "bus-direction"],
  ["UAT-06", "Critical", "bus-full"],
  ["UAT-07", "Critical", "night-warning"],
  ["UAT-08", "High", "start"],
  ["UAT-09", "High", "taxi-prep"],
  ["UAT-10", "High", "taxi-driver"],
  ["UAT-10-A", "High", "taxi-driver-section"],
  ["UAT-11", "High", "train-prep"],
  ["UAT-12", "High", "limited-prep"],
  ["UAT-13", "High", "limited-show"],
  ["UAT-13-A", "High", "limited-reserved"],
  ["UAT-13-B", "High", "limited-nonreserved"],
  ["UAT-14", "High", "coach-prep"],
  ["UAT-15", "Medium", "bus-prep"],
  ["UAT-16", "Medium", "other-prep"],
  ["UAT-17", "Medium", "taxi-prep"],
  ["UAT-18", "Medium", "arrival-check"],
  ["UAT-19", "Medium", "show-place"],
  ["UAT-20", "Medium", "maps-return"]
];

for (const [id, priority, screen] of requiredScreens) {
  const exists = js.includes(`${JSON.stringify(screen)}:`) || js.includes(`${screen}: {`);
  const actions = countActions(screen);
  const actionPass = actions === null || actions <= 3;
  record(id, priority, screen, exists && actionPass, exists ? `actions=${actions ?? "n/a"}` : "screen missing");
}

record("LAYOUT-PC", "Critical", "desktop viewport support", css.includes("width: min(100%, 960px)") && js.includes('class="transport-arrow" data-target="transport"'), "max width and transport arrow menu button");
record("LAYOUT-SP", "Critical", "smartphone viewport support", css.includes("@media (max-width: 640px)") && css.includes("grid-template-columns: 1fr"), "mobile media query");
record("A11Y-01", "High", "viewport meta", html.includes('name="viewport"'), "responsive viewport meta");
record("NO-AFFIL-SHOW", "Critical", "no monetized slot inside show card", js.includes('data-no-monetized="true"') && !js.includes('class="show-card monetized"'), "show screens keep Japanese text separate");
record("JAPANESE-EN", "Critical", "Japanese text has English confirmation", js.includes("ja:") && js.includes("en:"), "show text pairs");
record("NO-IFUNSURE-01", "Critical", "If unsure section is removed", !js.includes("guidance:") && !js.includes('class="guidance"') && !js.includes("<h3>If unsure</h3>") && !css.includes(".guidance"), "DoList and Show this in JP now carry the help flow without a separate If unsure section");
record("GUIDANCE-TAP-01", "High", "Japanese phrase choices are tappable separately", js.includes("helpByScreen") && js.includes("data-help-index") && js.includes("phrase-choice") && js.includes("Use this section only when you need to show Japanese to someone.") && !js.includes("guidance-button"), "Show this in JP owns Japanese phrase selection");
record("DESTINATION-01", "Critical", "set destination prioritizes exact place", js.includes("Set the exact final destination. Check with your travel companion or hotel staff ahead of your travel") && js.includes("<strong>Google Maps points to the correct place.</strong>") && js.includes("Open Google Maps, and ask staff if the destination and route are correct") && js.includes("If Google Maps points to the wrong place, explain or show your destination clearly.") && js.includes("What is the type of the place?") && js.includes("Show When you are lost") && js.includes("Open Google Maps, and ask if you think you are lost.") && !js.includes("Add area / city / prefecture and place type") && !js.includes("Confirm the pin, address, and same-name places before choosing transport") && !js.includes("Type the exact place name shown in Google Maps"), "Set destination Do list stays concise and summary emphasizes correct Google Maps place");
record("DESTINATION-HELP-01", "Critical", "set destination has correction help phrase", js.includes("私が向かうべき場所を入力してもらえますか。あるいはGoogle Maps上で教えてもらえますか。") && js.includes("Could you type the place I should go to, or show it to me on Google Maps?"), "Set destination can ask someone to enter or point to the correct destination without mixing DoList explanation into the phrase");
record("DESTINATION-WARNING-01", "Critical", "set destination has prominent warning", js.includes("This app depends on the correct Final Destination.") && js.includes("Do not rush this step while moving.") && css.includes(".warning"), "Set destination warns users to prepare the final destination before travel or with enough time");
record("DESTINATION-RESOURCE-01", "High", "set destination links to pre-trip map backup guide", js.includes('resourceLink: ["Before travel: confirm destination", "/pre-trip-guide.html"]') && js.includes("resource-link") && css.includes(".resource-link a"), "Set Destination links to the pre-travel destination confirmation guide mock");
record("SITE-ENTRY-01", "High", "entry flow splits pre-travel and tool start", html.includes('href="/site-entry.html"') && siteEntryHtml.includes("Site entry") && siteEntryHtml.includes("Before travel guide") && siteEntryHtml.includes("Set Destination") && siteEntryHtml.includes("Transport support") && siteEntryHtml.includes('href="/pre-trip-guide.html"') && siteEntryHtml.includes('href="/"') && preTripHtml.includes('href="/site-entry.html"') && preTripHtml.includes(">Set Destination</a>") && css.includes(".entry-flow"), "Site entry can route to pre-travel guide or directly to Set Destination");
record("TOPBAR-01", "High", "header can return to transport choice", html.includes('data-action="reset">Back to Set Destination</button>\n        <button class="ghost small" type="button" data-target="transport">Select transportation</button>'), "topbar keeps Select transportation at the right as the later flow step");
record("CONTEXT-01", "High", "trip context is visible", js.includes('class="context-bar transit-flow"') && css.includes(".context-bar") && js.includes("readonly-field") && js.includes("Final Destination <small>目的地</small>") && js.includes("Area of the place <small>地域</small>") && !js.includes("<label>Next Transit point"), "destination and area context is inherited from Set Destination with Japanese helper labels");
record("TRANSPORT-CHOICE-01", "Critical", "public transportation choice page", js.includes("transportChoices:") && js.includes("Choose the transport shown in Google Maps. This app helps you prepare and ask people in Japanese.") && js.includes('class="transport-choice-page"') && css.includes(".transport-choice-grid") && js.includes("function transportChoiceJp") && js.includes("タクシー") && js.includes("路線バス"), "transport choices are shown on a standalone page with role guidance and Japanese helper labels");
record("TRANSPORT-CHOICE-02", "High", "shinkansen choice includes limited express", js.includes('["Shinkansen / LTD Express", "limited-prep"]') && js.includes('"Shinkansen / LTD Express": "新幹線・特急"'), "transport choice label makes limited express visible without making the button too long");
record("WALKING-SCOPE-01", "High", "walking is not a transport choice", !js.includes('["Walking", "walk-prep"]') && !js.includes('"walk-prep":'), "walking route guidance stays in Google Maps, not a dedicated transport screen");
record("JOURNEY-FOOTER-01", "Critical", "pages include unified bottom actions", js.includes("After each transport, open Google Maps again from where you are now.") && js.includes('data-target="transport">Select transportation</button>\n      <button type="button" class="secondary" data-target="show-place">Show Final Destination in JP</button>\n      <button type="button" class="secondary" data-target="maps-opened" data-open-maps="true">Open Google Maps</button>') && css.includes(".journey-footer") && css.includes(".journey-footer-hint"), "bottom actions match Set Destination order while keeping the Google Maps recheck hint");
record("INLINE-ACTIONS-01", "Critical", "branch choices can appear inside special pages", js.includes("inlineActions: true") && js.includes("data.inlineActions || !usesCommonBottomActions"), "special choice rows are available without replacing the common bottom nav when a page truly needs them");
record("INLINE-ACTIONS-02", "High", "stage choices are visually separate from bottom nav", js.includes('inlineActionStyle: "stage"') && js.includes("stage-actions") && css.includes(".stage-actions") && css.includes("grid-template-columns: 1fr"), "special stage choices render as compact in-page choices instead of a second bottom nav row");
record("NO-NOTEHELP-01", "High", "luggage note help is not hidden behind a separate note UI", !js.includes("noteHelp:") && !js.includes("data-note-help") && !css.includes(".note-help"), "special luggage help stays in the normal Show this in JP flow");
record("TRAIN-TIMING-01", "High", "train prep has selective timing labels", js.includes("Before entering ticket gate") && js.includes("After entering ticket gate") && js.includes("Google Mapsのこの電車に乗りたいです。改札はどこですか？") && js.includes("Google Maps上の電車の切符の購入、またはICカードをチャージしたいです。どこでできますか。") && appearsInOrder(getScreenBlock("train-prep") || "", ["Buy a ticket for the train shown in Google Maps or charge an IC card before entering", "Find the ticket gate for the train shown in Google Maps", "Ask which platform to wait at for the train shown in Google Maps"]) && css.includes(".action-timing"), "regular train prep buys or charges before finding the gate, then asks platform");
record("TRANSIT-TIMING-01", "High", "other transport pages use selective timing labels", js.includes("Before getting in taxi") && js.includes("After taxi stops, ask driver before it starts") && js.includes("Before going to the bus stop") && js.includes("At the bus stop, before the bus arrives") && js.includes("After on Board") && js.includes("At the ticket counter") && js.includes("At the boarding place") && js.includes("Just before boarding") && js.includes("Confirm reserved or non-reserved seat") && js.includes("helpIndex"), "taxi, bus, limited express, and highway bus actions keep time order without extra note blocks");
record("JPHELP-01", "Critical", "stuck actions include Japanese phrases", js.includes("jpHelp:") && js.includes("Show this in JP") && css.includes(".jp-help"), "action-linked Japanese help phrases");
record("ACTIONGUIDE-01", "Critical", "current-action guidance is selectable", js.includes("What you should do now") && js.includes("data-guide") && css.includes(".action-checklist button.selected"), "current action buttons are self-action guidance");
record("ACTIONGUIDE-02", "High", "self actions and show-JP phrases are visually separated", js.includes("Use this section for your own actions.") && js.includes("Use this section only when you need to show Japanese to someone.") && css.includes(".action-checklist button::after") && css.includes(".phrase-choice::after"), "self actions and Japanese phrase choices have separate sections");
record("ACTIONGUIDE-03", "High", "self actions select nearest show-JP phrase only when matched", js.includes("function resolveChecklistHelpIndex") && js.includes("if (Number.isInteger(resolvedHelpIndex))") && js.includes("delete state.helpByScreen[state.screen]") && js.includes("const selectedPhrase = Number.isInteger(activeHelpIndex)") && !js.includes("candidate >= 0 && candidate < screenData.jpHelp.length ? candidate : fallback"), "DoList taps select the nearest Japanese phrase, otherwise no Japanese body is shown");
record("ACTIONGUIDE-04", "High", "show-JP choices follow DoList order at render time", js.includes("helpOrderFromChecklist") && js.includes("orderedHelpIndices") && js.includes("new Set(helpOrderFromChecklist)") && js.includes("orderedHelpIndices.map"), "Show this in JP choices render in the same order as the visible DoList, even when helpIndex values are not sequential");
record("ACTIONGUIDE-05", "High", "show-JP translation does not carry DoList-only instructions", js.includes("If Google Maps points to the wrong place, explain or show your destination clearly.") && js.includes("私が向かうべき場所を入力してもらえますか。あるいはGoogle Maps上で教えてもらえますか。") && js.includes("Could you type the place I should go to, or show it to me on Google Maps?") && !js.includes("Please explain or show the destination until the person understands. Could they type the correct place in the form"), "DoList can carry the user action, while Show this in JP stays a clean phrase plus direct translation");
record("ACTIONGUIDE-06", "High", "selected Japanese phrase expands under its English choice", js.includes("phrase-choice-row") && js.includes("isSelected ?") && js.includes('<p class="phrase-ja">${fillTemplate(ja)}</p>') && !js.includes("phrase-list") && !js.includes('<p class="phrase-en">${fillTemplate(en)}</p>'), "Show this in JP avoids repeating the same English after selection and expands the Japanese phrase directly under the chosen English");
const taxiPrepBlock = getScreenBlock("taxi-prep") || "";
const busStartBlock = getScreenBlock("bus-start") || "";
const coachPrepBlockForOrder = getScreenBlock("coach-prep") || "";
record("TAXI-JPHELP-ORDER-01", "High", "taxi show-JP choices follow timing order", appearsInOrder(taxiPrepBlock, ["大きな荷物があります。", "タクシーで{finalDestinationLabel}まで行きたいです。", "Google Mapsで表示している場所までタクシーで行きたいです。"]) && !taxiPrepBlock.includes("タクシーを拾いたいです。"), "Taxi Show this in JP choices are ordered independently");
record("BUS-JPHELP-ORDER-01", "High", "local bus show-JP choices follow timing order", appearsInOrder(busStartBlock, ["現金と小銭を用意したいです。近くのコンビニやお店を教えてください。", "道路のこちら側で合っていますか。", "このバスの番号か行き先を知りたいです。", "このバスで合っていますか。", "このバスはGoogle Mapsで表示している停留所に停まりますか。", "その停留所に着く少し前に教えてもらえますか。"]) && !busStartBlock.includes("Google Mapsのこのバス案内で合っていますか。") && !busStartBlock.includes("今から向かって間に合いますか。") && !busStartBlock.includes("現金と小銭を用意して、Google Mapsのバス案内を確認したいです。") && !busStartBlock.includes("近くにコンビニやお店はありますか。") && !busStartBlock.includes("空席") && !busStartBlock.includes("予約画面だけで乗れますか") && !busStartBlock.includes("乗り場はどこですか"), "Local Bus Show this in JP choices stay separate from Highway Bus content");
record("COACH-JPHELP-ORDER-01", "High", "highway bus show-JP choices follow timing order", appearsInOrder(coachPrepBlockForOrder, ["目的の場所まで行くバスで空席はありますか？", "この予約でこのバスに乗りたいです。", "Google Maps上のバスの乗り場はどこですか？", "出発時刻と行き先を知りたいです。", "このバスに乗るにはここで待てばいいですか。", "大きな荷物を預けたいです。いつどこに預けられますか。", "このバスで正しいですか。"]) && !coachPrepBlockForOrder.includes("現金と小銭") && !coachPrepBlockForOrder.includes("バス停から") && !coachPrepBlockForOrder.includes("停留所に停まりますか"), "Highway Bus Show this in JP choices stay separate from Local Bus content");
record("COACH-HELP-MAP-01", "High", "highway bus DoList maps to correct Japanese phrase", coachPrepBlockForOrder.includes('text: "Check departure time and destination", helpIndex: 3') && coachPrepBlockForOrder.includes('text: "Show ticket and confirm if you should wait at this boarding place", helpIndex: 4') && coachPrepBlockForOrder.includes('text: "Show ticket and confirm this is the correct bus", helpIndex: 6'), "Highway bus action taps open the matching Japanese phrase");
record("ACTIONTIMING-01", "High", "timing labels are emphasized", js.includes("CHECK Before Travel") && css.includes("font-weight: 800") && css.includes("text-transform: uppercase"), "Before-travel timing label is prominent");
record("GMAPS-01", "Critical", "open maps passes final destination", js.includes("function buildGoogleMapsUrl") && js.includes("https://www.google.com/maps/dir/?api=1&hl=en&travelmode=transit&destination=") && js.includes("encodeURIComponent(destination)") && js.includes("data-open-maps"), "Open Google Maps builds an English transit-first destination URL");
record("GMAPS-02", "High", "maps URL does not force origin", !js.includes("&origin="), "current location stays in Google Maps");
record("GMAPS-03", "High", "maps opens public transit first", js.includes("travelmode=transit") && !js.includes("travelmode=driving") && !js.includes("travelmode=bicycling"), "car and bicycle are not requested by the app URL");
record("VISUAL-01", "High", "inputs buttons and read-only boxes are visually distinct", css.includes("--input-bg") && css.includes(".where-display") && css.includes("font-weight: 800") && css.includes("input:focus") && css.includes(".primary:hover") && !js.includes("<span>Where you are."), "Where you are is a bold read-only box, not a labeled input");
record("VISUAL-02", "High", "where you are box includes Japanese helper text", js.includes("<span>Where you are</span><small>今自分はここ</small>") && css.includes(".where-display small"), "Where you are box shows 今自分はここ under the English label");
record("DESTINATION-JP-LABELS-01", "High", "set destination has Japanese helper labels", js.includes("Final Destination <small>目的地</small>") && js.includes("Area of the place <small>地域</small>") && js.includes("Type of the place <small>場所の種類</small>") && js.includes("Required / 必須") && js.includes("Recommended / 推奨") && js.includes("<em>公共交通</em>") && css.includes(".label-line small") && css.includes(".transport-arrow em"), "Set destination form labels can be understood by Japanese helpers");
record("SHOWDEST-01", "Critical", "show final destination phrase is heading state", js.includes("私は{finalDestinationLabel}に向かっています。") && js.includes("I am heading to {finalDestinationLabel}.") && js.includes("function buildFinalDestinationLabel") && js.includes("fillTemplate") && js.includes("show-destination-block") && css.includes(".show-destination-block strong") && css.includes("clamp(1.8rem"), "Show Final Destination uses destination parameters inside the phrase and large destination context");
record("SHOWDEST-02", "Critical", "show final destination phrase choices are tappable", js.includes("私は{finalDestinationLabel}に向かっています。") && js.includes("I am heading to {finalDestinationLabel}.") && js.includes("私の目的地は{finalDestinationLabel}です。ルート・交通手段はこれで正しいですか。") && js.includes("My destination is {finalDestinationLabel}. Is this route and transportation correct?"), "Final destination page keeps route-check phrases inside Show this in JP choices");
const mapsOpenedBlock = getScreenBlock("maps-opened") || "";
record("MAPSOPENED-TAP-01", "High", "google maps opened checks current route context", mapsOpenedBlock.includes("Check your current location in Google Maps") && mapsOpenedBlock.includes("Check the route and transportation to the final destination") && mapsOpenedBlock.includes("Google Maps routes and transportation can change by time and location.") && mapsOpenedBlock.includes("It may differ from what you saw before.") && mapsOpenedBlock.includes("私の目的地は{finalDestinationLabel}です。ルート・交通手段はこれで正しいですか。") && mapsOpenedBlock.includes("Google Maps上の私の現在地はここで合っていますか。"), "Google Maps opened supports current location and live route checks");
record("MAPSOPENED-DENSITY-01", "High", "google maps opened stays compact", countActions("maps-opened") === 0 && !mapsOpenedBlock.includes("guidance:") && (mapsOpenedBlock.match(/helpIndex:/g) || []).length === 2 && !mapsOpenedBlock.includes("entrance"), "Google Maps opened has 2 DoList items and no extra action row");
const mapsReturnBlock = getScreenBlock("maps-return") || "";
record("DENSITY-01", "High", "dense pages avoid extra unsure blocks", !busStartBlock.includes("guidance:") && !(getScreenBlock("limited-prep") || "").includes("guidance:") && !coachPrepBlockForOrder.includes("guidance:") && !mapsReturnBlock.includes("Switch to taxi") && !mapsReturnBlock.includes("Check the next place"), "Dense transport pages rely on DoList and Show this in JP instead of extra unsure blocks");
record("TAXI-DEST-01", "High", "taxi final destination phrase uses parameters", js.includes("タクシーで{finalDestinationLabel}まで行きたいです。") && js.includes("I want to go to {finalDestinationLabel} by taxi.") && !js.includes("タクシーでこの場所まで行きたいです。"), "Taxi show phrase inserts Final Destination and Area");
record("TAXI-UNSURE-01", "High", "taxi prep does not duplicate helper text", !taxiPrepBlock.includes("guidance:") && js.includes("Go to Maps place only") && !js.includes("Go to next place only") && !js.includes("Take a taxi to the final destination."), "Taxi prep keeps route choices in actions and help phrases without duplicate helper text");
record("TAXI-PARTIAL-01", "High", "partial taxi copy is not limited to stations or bus stops", js.includes("Show the taxi destination in Google Maps.") && js.includes("Google Mapsで表示している場所までタクシーで行きたいです。最終目的地ではありません。") && js.includes("I want to go only to the place shown in Google Maps by taxi. It is not my final destination.") && !js.includes("Show the next station or bus stop if using taxi only for this section") && !js.includes("I want to go only to the next station or bus stop by taxi"), "Partial taxi destination copy stays generic");
record("TRANSPORT-GOAL-01", "Critical", "intermediate destinations are confirmed through Google Maps only", !js.includes("nextPlace") && !js.includes("{transportDestinationLabel}") && !js.includes("function buildTransportDestinationLabel") && !js.includes("{taxiDestinationLabel}") && js.includes("Ask which platform to wait at for the train shown in Google Maps") && js.includes("Show the place in Google Maps") && js.includes("Google Mapsで表示している場所までタクシーで行きたいです。"), "Intermediate place names are not stored or injected by the app");
record("BUS-GOAL-01", "Critical", "local bus uses stop-based Google Maps help", busStartBlock.includes("Check the stop to get off") && busStartBlock.includes("Ask the driver if this bus stops at the bus stop shown in Google Maps") && busStartBlock.includes("Will this bus stop at the bus stop shown in Google Maps?") && busStartBlock.includes("Google Mapsで表示している停留所で降りたいです。") && !busStartBlock.includes("stop at the stop shown in Google Maps") && !busStartBlock.includes("予約") && !busStartBlock.includes("乗り場") && !busStartBlock.includes("空席"), "Local Bus keeps route-bus-stop content separate");
record("COACH-GOAL-01", "Critical", "highway bus uses booking and boarding-place help", coachPrepBlockForOrder.includes("Prepare ticket, QR, email, or booking number") && coachPrepBlockForOrder.includes("Show the boarding place in Google Maps") && coachPrepBlockForOrder.includes("Google Maps上のバスの乗り場はどこですか？") && !coachPrepBlockForOrder.includes("現金と小銭") && !coachPrepBlockForOrder.includes("道路のこちら側") && !coachPrepBlockForOrder.includes("降りたいです"), "Highway Bus keeps booking and boarding-place content separate");

record("TAXI-HARDCODE-01", "Critical", "taxi driver is not hardcoded to Kiyomizu-dera", js.includes("タクシーで{finalDestinationLabel}まで行きたいです。") && !js.includes("Please take me to Kiyomizu-dera.") && !js.includes("清水寺まで行きたいです。"), "driver-facing taxi phrase uses current destination parameters");
record("ARRIVAL-LOOP-01", "Critical", "arrival check supports transfer continuation", js.includes("After this transport") && js.includes("Open Google Maps again from your current location") && js.includes('["Open Google Maps", "maps-opened", "primary"]') && js.includes('["Select transportation", "transport", "secondary"]') && js.includes("Arrived at final destination") && !js.includes('["I arrived", "done", "primary"]'), "arrival-check sends users back to Google Maps/current route before choosing the next transport");
const arrivalCheckBlock = getScreenBlock("arrival-check") || "";
record("ARRIVAL-SELF-01", "High", "arrival check actions stay self-contained", arrivalCheckBlock.includes("Open Google Maps and check where you are now") && arrivalCheckBlock.includes("Check the latest route to the final destination") && arrivalCheckBlock.includes("Select the next transport after checking Google Maps") && arrivalCheckBlock.includes("Finish only after you reach the entrance, reception, or meeting place") && !arrivalCheckBlock.includes("helpIndex") && !arrivalCheckBlock.includes("jpHelp"), "After-transport page does not show unrelated Japanese helper phrases for self-only actions");
record("BUS-STAGE-01", "High", "local bus uses timing labels instead of stage links", js.includes('"bus-start":') && js.includes('["Local Bus", "bus-start"]') && busStartBlock.includes("Before bus stop") && busStartBlock.includes("At bus stop") && busStartBlock.includes("Before boarding") && busStartBlock.includes("After boarding") && !busStartBlock.includes("When the bus is near") && !busStartBlock.includes("inlineActions") && !busStartBlock.includes('["Before bus stop", "bus-before-stop"') && !busStartBlock.includes('["Switch to taxi", "taxi-prep"'), "bus prep stays on one chronological page with useful timing labels, not overly fine stage links");
record("BUS-START-DOLIST-01", "Critical", "local bus entry keeps a chronological do list", busStartBlock.includes("checklist:") && appearsInOrder(busStartBlock, ["Prepare cash and coins", "Check the latest route and departure time in Google Maps", "Confirm the direction of this bus stop", "Check the bus route number or destination", "Check the stop to get off", "Show Google Maps and ask the driver if this is the correct bus", "Ask the driver if this bus stops at the bus stop shown in Google Maps", "Ask a passenger only if you need help getting off"]), "Local Bus page shows What you should do now in time order");
record("BUS-DRIVER-JP-01", "Critical", "local bus driver and passenger questions are reachable on main bus page", busStartBlock.includes("このバスで合っていますか。") && busStartBlock.includes("このバスはGoogle Mapsで表示している停留所に停まりますか。") && busStartBlock.includes("その停留所に着く少し前に教えてもらえますか。") && busStartBlock.includes("After boarding / Ask passenger if allowed"), "short driver questions and optional passenger help phrase are visible from the main Local Bus page, not only an orphan screen");
record("LIMITED-SEAT-01", "High", "reserved and non-reserved seat checks differ", js.includes('"limited-reserved":') && js.includes('"limited-nonreserved":') && js.includes('["Reserved seat", "limited-reserved"') && js.includes('["Non-reserved seat", "limited-nonreserved"') && js.includes("I have a reserved seat. I want to find this car and seat.") && js.includes("Which cars are non-reserved?"), "Shinkansen seat type choices show different phrases");
const limitedPrepBlock = getScreenBlock("limited-prep") || "";
record("LIMITED-GATE-01", "High", "shinkansen prep includes before-gate steps", limitedPrepBlock.includes("Before entering ticket gate") && limitedPrepBlock.includes("Find the ticket gate for the Shinkansen or limited express shown in Google Maps") && limitedPrepBlock.includes("Show Google Maps and ask where to buy the fare and limited express tickets for this train") && limitedPrepBlock.includes("Google Maps上の新幹線・特急の乗車券と特急券はどこで買えますか。") && limitedPrepBlock.includes("Show ticket to conductor to check the platform for the train") && limitedPrepBlock.includes("この特急・新幹線のこの号車に乗るにはどこのホームのどの辺りで待てばいいですか。") && limitedPrepBlock.includes("Show ticket and check the train name and number on the departure board") && limitedPrepBlock.includes("この列車名・号数の列車に乗りたいです。案内表示板に表示されていますか。") && limitedPrepBlock.includes("Ask staff if the train is delayed") && limitedPrepBlock.includes("この列車は遅れていますか。どの列車に乗ればいいですか。") && limitedPrepBlock.includes("Ask the conductor about paid or reserved luggage space if needed") && limitedPrepBlock.includes("車掌さんへ: 予約が必要な荷物スペースは空いていますか？料金はいくらですか？") && !limitedPrepBlock.includes("train destination in Google Maps") && !limitedPrepBlock.includes("この列車で合っていますか。") && appearsInOrder(limitedPrepBlock, ["Show Google Maps and ask where to buy the fare and limited express tickets for this train", "Find the ticket gate for the Shinkansen or limited express shown in Google Maps", "Show ticket and check the train name and number on the departure board", "Show ticket to conductor to check the platform for the train", "Ask staff if the train is delayed", "Confirm reserved or non-reserved seat", "Check luggage space if needed", "Ask the conductor about paid or reserved luggage space if needed"]), "Shinkansen / limited express prep asks where to buy tickets before finding the gate, then checks board, platform/car position, delay, seat after boarding, luggage, and reserved luggage after that");
record("MONETIZED-RETURN-01", "Medium", "maps-return has no monetized slot", !js.includes("Need internet for Google Maps?"), "Google Maps return screen stays focused on the next action");

const trainBlock = getScreenBlock("train-prep") || "";
const trainShowBlock = getScreenBlock("train-show") || "";
record("TRAIN-SINGLE-LEVEL-01", "High", "train prep uses one-level actions", !trainBlock.includes("inlineActions") && !js.includes("Show train destination in JP"), "Train prep relies on DoList, Show this in JP, and the unified bottom buttons");
record("TRANSPORT-TARGET-01", "Critical", "train pages do not reuse bus-stop destination", !trainBlock.includes("{transportDestinationLabel}") && !trainShowBlock.includes("{transportDestinationLabel}") && !trainBlock.includes("Gojozaka") && !trainShowBlock.includes("Gojozaka") && trainBlock.includes("my destination station using the train shown in Google Maps"), "train guidance refers to the train shown in Google Maps, not the bus stop placeholder");
const coachBlock = getScreenBlock("coach-prep") || "";
const otherBlock = getScreenBlock("other-prep") || "";
record("TRANSPORT-TARGET-02", "High", "coach and other pages avoid bus-stop placeholder", !coachBlock.includes("{transportDestinationLabel}") && !otherBlock.includes("{transportDestinationLabel}") && !coachBlock.includes("Gojozaka") && !otherBlock.includes("Gojozaka"), "non-bus pages do not reuse the local bus stop placeholder");

const failCount = results.filter((r) => r.status === "FAIL").length;
const criticalFailCount = results.filter((r) => r.status === "FAIL" && r.priority === "Critical").length;

console.log("# UAT automated check");
console.log(`Total: ${results.length}`);
console.log(`PASS: ${results.length - failCount}`);
console.log(`FAIL: ${failCount}`);
console.log(`Critical FAIL: ${criticalFailCount}`);
for (const result of results) {
  console.log(`${result.status} ${result.id} ${result.priority} ${result.name} ${result.note}`);
}

process.exit(criticalFailCount > 0 ? 1 : 0);
