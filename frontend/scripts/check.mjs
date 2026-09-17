import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import { routes } from "./routes.mjs";
import { services } from "../src/data/services.js";
assert.equal(new Set(services.map((s) => s.slug)).size, services.length);
for (const route of routes) {
  const html = await readFile(
    new URL(
      `../../dist${route.path === "/" ? "" : route.path}/index.html`,
      import.meta.url,
    ),
    "utf8",
  );
  assert.ok(html.includes("<h1"), `Missing h1: ${route.path}`);
  assert.ok(
    html.includes('rel="canonical"'),
    `Missing canonical: ${route.path}`,
  );
  assert.ok(
    !html.includes("Loading your next step"),
    `Unresolved route: ${route.path}`,
  );
  assert.ok(!html.includes("tel:undefined"));
  assert.ok(!html.includes("tel:null"));
}
for (const name of ["home-hero", "kitchen", "contractors"]) {
  const file = await stat(
    new URL(`../public/images/${name}.webp`, import.meta.url),
  );
  assert.ok(file.size < 350000, `${name} image should be optimized`);
}
console.log(`Validated ${routes.length} prerendered routes and image budgets.`);
