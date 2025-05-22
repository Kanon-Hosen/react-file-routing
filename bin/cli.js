#!/usr/bin/env node

import { buildRoutes } from "../lib/buildRoutes.js";
import { watch } from "chokidar";

const args = process.argv.slice(2);

async function generate() {
  const content = buildRoutes(); // buildRoutes নিজেই ফাইল লিখছে, তাই শুধু কল করলেই হবে
  console.log("✅ src/router/routes.generated.js updated!");
}

(async () => {
  if (args.includes("--watch")) {
    console.log("👀 Watching src/pages for changes...");
    await generate();
    watch("./src/pages", { ignoreInitial: true }).on(
      "all",
      async (event, path) => {
        console.log(`🔄 Detected ${event} on ${path}`);
        await generate();
      }
    );
  } else {
    console.log("🔧 Generating routes...");
    await generate();
  }
})();
