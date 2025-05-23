#!/usr/bin/env node

import { buildRoutes } from "../lib/buildRoutes.js";
import { watch } from "chokidar";
import path from "path";

const args = process.argv.slice(2);

async function generate() {
  try {
    const content = buildRoutes();
    console.log("✅ src/router/routes.generated.js updated!");
  } catch (error) {
    console.error("❌ Failed to generate routes:", error.message);
  }
}

(async () => {
  if (args.includes("--watch")) {
    console.log("👀 Watching src/app for changes...");
    await generate();

    const watcher = watch("./src/app", {
      ignoreInitial: true,
      persistent: true,
    });

    watcher.on("all", async (event, filePath) => {
      const ext = path.extname(filePath);
      if ([".jsx", ".tsx"].includes(ext)) {
        console.log(`🔄 Detected ${event} on ${filePath}`);
        await generate();
      }
    });
  } else {
    console.log("🔧 Generating routes...");
    await generate();
  }
})();
