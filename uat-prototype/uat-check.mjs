import { readFile } from "node:fs/promises";

const html = await readFile(new URL("./index.html", import.meta.url), "utf8");
const css = await readFile(new URL("./styles.css", import.meta.url), "utf8");
const js = await readFile(new URL("./app.js", import.meta.url), "utf8");

const results = [];

function record(id, priority, name, pass, note = "") {
  results.push({ id, priority, name, status: pass ? "PASS" : "FAIL", note });
}

function countActions(screenName) {
  const screenStart = js.indexOf(`${JSON.stringify(screenName)}:`);
  if (screenStart === -1) return null;
  const nextScreen = js.indexOf("\n  \"", screenStart + 10);
  const block = js.slice(screenStart, nextScreen === -1 ? js.length : nextScreen);
  const actionsStart = block.indexOf("actions:");
  if (actionsStart === -1) return 0;
  const actionsEnd = block.indexOf("\n    ]", actionsStart);
  const actionsBlock = block.slice(actionsStart, actionsEnd === -1 ? block.length : actionsEnd);
  const actions = actionsBlock.match(/\["[^"]+",\s*"[^"]+"/g) || [];
  return actions.length;
}

const requiredScreens = [
  ["UAT-01", "Critical", "start"],
  ["UAT-01-A", "Critical", "start"],
  ["UAT-02", "Critical", "maps-return"],
  ["UAT-02-A", "Critical", "maps-opened"],
  ["UAT-03", "Critical", "show-place"],
  ["UAT-04", "Critical", "bus-prep"],
  ["UAT-05", "Critical", "bus-direction"],
  ["UAT-06", "Critical", "bus-full"],
  ["UAT-07", "Critical", "night-warning"],
  ["UAT-08", "High", "start"],
  ["UAT-09", "High", "taxi-prep"],
  ["UAT-10", "High", "taxi-driver"],
  ["UAT-11", "High", "train-prep"],
  ["UAT-12", "High", "limited-prep"],
  ["UAT-13", "High", "limited-show"],
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
record("GUIDANCE-01", "Critical", "screens include action guidance", js.includes("guidance:") && js.includes('class="guidance"') && css.includes(".guidance"), "if-unsure guidance is rendered");
record("GUIDANCE-TAP-01", "High", "unsure cases are tappable", js.includes("helpByScreen") && js.includes("data-help-index") && js.includes("guidance-button") && js.includes("If Google Maps shows multiple results") && js.includes("If you are unsure about platform or direction") && js.includes("If the bus stop direction is unclear") && js.includes("If the boarding place is unclear"), "If unsure can reuse the existing Japanese help card");
record("DESTINATION-01", "Critical", "set destination prioritizes exact place", js.includes("Set the exact final destination first") && js.includes("Ask staff or prepare the destination before travel if unsure") && js.includes("before choosing transport"), "Final destination is checked before transport choice");
record("CONTEXT-01", "High", "trip context is visible", js.includes('class="context-bar transit-flow"') && css.includes(".context-bar") && js.includes("readonly-field") && js.includes("Final Destination") && js.includes("Area of the place") && !js.includes("<label>Next Transit point"), "destination and area context is inherited from Set Destination");
record("TRANSPORT-CHOICE-01", "Critical", "public transportation choice page", js.includes("transportChoices:") && js.includes('class="transport-choice-page"') && css.includes(".transport-choice-grid"), "transport choices are shown on a standalone page");
record("JOURNEY-FOOTER-01", "Critical", "pages include unified bottom actions", js.includes("Select transportation") && js.includes("Show Final Destination in JP") && js.includes("Open Google Maps") && css.includes(".journey-footer"), "bottom actions are unified");
record("NOTEHELP-01", "High", "tap note can show Japanese help", js.includes("noteHelp:") && js.includes("data-note-help") && css.includes(".note-help"), "supplemental notes can reveal a show-in-JP phrase");
record("TRAIN-TIMING-01", "High", "train prep has selective timing labels", js.includes("Before entering ticket gate") && js.includes("After entering ticket gate") && js.includes("Google Mapsのこの電車に乗りたいです。改札はどこですか？") && css.includes(".action-timing"), "only time-sensitive train actions get timing labels");
record("TRANSIT-TIMING-01", "High", "other transport pages use selective timing labels", js.includes("Before getting in taxi") && js.includes("After taxi stops, ask driver before it starts") && js.includes("Before going to the bus stop") && js.includes("At the bus stop, before the bus arrives") && js.includes("After on Board") && js.includes("At the boarding place") && js.includes("Confirm reserved or non-reserved seat") && js.includes("helpIndex"), "taxi, bus, limited express, and highway bus actions keep time order without extra note blocks");
record("JPHELP-01", "Critical", "stuck actions include Japanese phrases", js.includes("jpHelp:") && js.includes("Show this in JP") && css.includes(".jp-help"), "action-linked Japanese help phrases");
record("ACTIONGUIDE-01", "Critical", "current-action guidance is selectable", js.includes("What you should do now") && js.includes("data-guide") && css.includes(".action-checklist button.selected"), "current action buttons drive Japanese guidance");
record("GMAPS-01", "Critical", "open maps passes final destination", js.includes("function buildGoogleMapsUrl") && js.includes("https://www.google.com/maps/dir/?api=1&destination=") && js.includes("encodeURIComponent(destination)") && js.includes("data-open-maps"), "Open Google Maps builds a destination-only directions URL");
record("GMAPS-02", "High", "maps URL does not force origin or travel mode", !js.includes("&origin=") && !js.includes("travelmode="), "current location and transport mode stay in Google Maps");
record("VISUAL-01", "High", "inputs buttons and read-only boxes are visually distinct", css.includes("--input-bg") && css.includes(".where-display") && css.includes("font-weight: 800") && css.includes("input:focus") && css.includes(".primary:hover") && !js.includes("<span>Where you are."), "Where you are is a bold read-only box, not a labeled input");
record("SHOWDEST-01", "Critical", "show final destination phrase is heading state", js.includes("私は{finalDestinationLabel}に向かっています。") && js.includes("I am heading to {finalDestinationLabel}.") && js.includes("function buildFinalDestinationLabel") && js.includes("fillTemplate") && js.includes("show-destination-block") && css.includes(".show-destination-block strong") && css.includes("clamp(1.8rem"), "Show Final Destination uses destination parameters inside the phrase and large destination context");
record("SHOWDEST-02", "Critical", "show final destination unsure choices are tappable", js.includes("Use this when you cannot explain the destination in Japanese.") && js.includes("Show Google Maps to make sure you are on the route.") && js.includes("Googleマップのガイドは正しいですか。"), "Final destination page If unsure expands matching Japanese phrases");
record("TAXI-DEST-01", "High", "taxi final destination phrase uses parameters", js.includes("タクシーで{finalDestinationLabel}まで行きたいです。") && js.includes("I want to go to {finalDestinationLabel} by taxi.") && !js.includes("タクシーでこの場所まで行きたいです。"), "Taxi show phrase inserts Final Destination and Area");
record("TAXI-UNSURE-01", "High", "taxi unsure action is user action", js.includes("Take a taxi to the final destination.") && !js.includes("If taking taxi all the way, show the final destination after the taxi stops."), "Taxi unsure copy is a user action, not an instruction to show after stopping");
record("TAXI-PARTIAL-01", "High", "partial taxi copy is not limited to stations or bus stops", js.includes("Show only the taxi destination.") && js.includes("タクシーでは{taxiDestinationLabel}まで行きたいです。") && js.includes("function buildTaxiDestinationLabel") && !js.includes("Show the next station or bus stop if using taxi only for this section") && !js.includes("I want to go only to the next station or bus stop by taxi") && js.includes("If the taxi is only for part of the trip"), "Partial taxi destination copy stays generic");

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
