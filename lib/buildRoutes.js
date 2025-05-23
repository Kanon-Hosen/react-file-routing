import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function toValidComponentName(filePath) {
  const baseName = path.basename(filePath, ".jsx");
  const clean = baseName.replace(/\[(.+)\]/, "$1");
  return clean
    .split(/[^a-zA-Z0-9]/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

function getRoutePath(relativePath) {
  return (
    "/" +
    relativePath
      .replace(/\\/g, "/")
      .replace(/page\.jsx$/, "")
      .replace(/layout\.jsx$/, "")
      .replace(/\/index$/, "")
      .replace(/\[([^\]]+)\]/g, ":$1")
      .replace(/\/$/, "")
  );
}

function buildTree(dir, parentPath = "") {
  const items = fs.readdirSync(dir);
  const routes = [];

  const layoutPath = items.find((f) => f === "layout.jsx");
  const pagePath = items.find((f) => f === "page.jsx");

  let children = [];

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stats = fs.statSync(fullPath);
    if (stats.isDirectory()) {
      children.push(...buildTree(fullPath, path.join(parentPath, item)));
    }
  }

  const route = {
    path: getRoutePath(parentPath) || "/",
    ...(layoutPath && {
      element: toValidComponentName("layout.jsx"),
      layoutImport:
        "./" +
        path
          .relative("src/router", path.join(dir, "layout.jsx"))
          .replace(/\\/g, "/"),
    }),
    ...(pagePath && {
      pageElement: toValidComponentName("page.jsx"),
      pageImport:
        "./" +
        path
          .relative("src/router", path.join(dir, "page.jsx"))
          .replace(/\\/g, "/"),
    }),
    ...(children.length && { children }),
  };

  return [route];
}

export function buildRoutes() {
  const pagesDir = path.resolve(process.cwd(), "src/app");
  const outputDir = path.resolve(process.cwd(), "src/router");
  const outputFile = path.join(outputDir, "routes.generated.js");

  const routeTree = buildTree(pagesDir);

  const imports = new Set();
  const buildJSXTree = (nodes) => {
    return nodes
      .map((node) => {
        if (node.layoutImport)
          imports.add(`import ${node.element} from '${node.layoutImport}';`);
        if (node.pageImport)
          imports.add(`import ${node.pageElement} from '${node.pageImport}';`);

        const children = node.children ? buildJSXTree(node.children) : "";

        if (node.layoutImport) {
          return `{
    path: '${node.path}',
    element: <${node.element} />,${
            children
              ? `
    children: [
${children}
    ]`
              : node.pageElement
              ? `
    children: [{ index: true, element: <${node.pageElement} /> }]`
              : ""
          }
  }`;
        } else {
          return `{
    path: '${node.path}',
    element: <${node.pageElement} />
  }`;
        }
      })
      .join(",\n");
  };

  const fileContent = `// AUTO-GENERATED FILE
import React from 'react';
${Array.from(imports).join("\n")}

export const routes = [
${buildJSXTree(routeTree)}
];
`;

  fs.mkdirSync(outputDir, { recursive: true });
  fs.writeFileSync(outputFile, fileContent);

  return fileContent;
}
