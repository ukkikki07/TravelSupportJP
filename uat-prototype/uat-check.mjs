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
  const actions = block.match(/\["[^"]+",\s*"[^"]+"/g) || [];
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

record("LAYOUT-PC", "Critical", "desktop viewport support", css.includes("width: min(100%, 960px)") && css.includes("grid-template-columns: repeat(6"), "max width and 6-column scenario strip");
record("LAYOUT-SP", "Critical", "smartphone viewport support", css.includes("@media (max-width: 640px)") && css.includes("grid-template-columns: 1fr"), "mobile media query");
record("A11Y-01", "High", "viewport meta", html.includes('name="viewport"'), "responsive viewport meta");
record("NO-AFFIL-SHOW", "Critical", "no monetized slot inside show card", js.includes('data-no-monetized="true"') && !js.includes('class="show-card monetized"'), "show screens keep Japanese text separate");
record("JAPANESE-EN", "Critical", "Japanese text has English confirmation", js.includes("ja:") && js.includes("en:"), "show text pairs");

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
