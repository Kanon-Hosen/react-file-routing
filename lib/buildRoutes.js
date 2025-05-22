import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function toValidComponentName(filePath) {
  const baseName = path.basename(filePath, ".jsx"); // e.g. [id]
  const clean = baseName.replace(/^\[(.+)\]$/, "$1"); // [id] -> id
  return clean
    .split(/[^a-zA-Z0-9]/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(""); // id -> Id
}

function getRoutePath(relativePath) {
  return (
    "/" +
    relativePath
      .replace(/\\/g, "/")
      .replace(/\.jsx$/, "")
      .replace(/index$/, "")
      .replace(/\[([^\]]+)\]/g, ":$1")
      .replace(/\/$/, "")
  );
}

export function buildRoutes() {
  const pagesDir = path.resolve(process.cwd(), "src/pages");
  const outputFile = path.resolve(
    process.cwd(),
    "src/router/routes.generated.js"
  );

  const scanDir = (dir) => {
    const items = fs.readdirSync(dir);
    const routes = [];

    items.forEach((item) => {
      const fullPath = path.join(dir, item);
      const stats = fs.statSync(fullPath);

      if (stats.isDirectory()) {
        routes.push(...scanDir(fullPath));
      } else if (item.endsWith(".jsx")) {
        const relativePath = path
          .relative(process.cwd(), fullPath)
          .replace(/\\/g, "/");
        const routePath = getRoutePath(path.relative(pagesDir, fullPath));
        const componentName = toValidComponentName(item);

        routes.push({
          path: routePath || "/",
          file: "./" + relativePath,
          name: componentName,
        });
      }
    });

    return routes;
  };

  const routeTree = scanDir(pagesDir);

  const fileContent = `// AUTO-GENERATED FILE
import React from 'react';
${routeTree.map((r) => `import ${r.name} from '${r.file}';`).join("\n")}

export const routes = [
${routeTree
  .map((r) => `  { path: '${r.path}', element: <${r.name} /> },`)
  .join("\n")}
];
`;

  fs.mkdirSync(path.dirname(outputFile), { recursive: true });
  fs.writeFileSync(outputFile, fileContent);

  return fileContent;
}
