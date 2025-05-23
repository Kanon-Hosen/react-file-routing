# 📦 react-file-routing

A zero-config file-based router generator for React using `react-router-dom`.  
Automatically scans your `src/app` folder and generates a full nested route tree with support for layouts, dynamic parameters, and more — inspired by Next.js.

---

## 📚 Table of Contents

- [✨ Features](#-features)
- [📥 Installation](#-installation)
- [🚀 Quick Start](#-quick-start)
  - [1️⃣ Structure Your App](#1️⃣-structure-your-app)
  - [2️⃣ Generate Routes](#2️⃣-generate-routes)
  - [3️⃣ Integrate in Your App](#3️⃣-integrate-in-your-app)
- [👀 Watch Mode](#-watch-mode)
- [🧠 Routing Rules](#-routing-rules)
- [🔧 CLI Options](#-cli-options)
- [📄 Output Example](#-output-example)
- [🙋 FAQ](#-faq)
- [🔗 Links](#-links)
- [📄 License](#-license)
- [⭐ Contributions Welcome](#-contributions-welcome)

---

## ✨ Features

- 📁 File-based routing (Next.js-style)
- 🧱 Nested layouts via `layout.jsx`
- 📄 Pages via `page.jsx`
- 📦 Auto-generates `routes.generated.js`
- 🔄 Watch mode for live updates
- 🧠 Dynamic routes with `[param]` → `:param`
- ✅ Compatible with `react-router-dom@6`
- 💡 Minimal configuration, fast setup

---

## 📥 Installation

```bash
npm install --save-dev react-file-routing
````

---

## 🚀 Quick Start

### 1️⃣ Structure Your App

Organize your app like this:

```
src/
├── app/
│   ├── layout.jsx
│   ├── page.jsx
│   ├── about/
│   │   ├── layout.jsx
│   │   └── page.jsx
│   └── blog/
│       ├── layout.jsx
│       └── [slug]/
│           └── page.jsx
```

### 2️⃣ Generate Routes

```bash
npx react-file-routing
```

Generates:

```
src/router/routes.generated.js
```

### 3️⃣ Integrate in Your App

In `App.jsx`:

```jsx
import { useRoutes } from 'react-router-dom';
import { routes } from './router/routes.generated';

function App() {
  return useRoutes(routes);
}

export default App;
```

In `main.jsx`:

```jsx
import { BrowserRouter } from 'react-router-dom';
import App from './App';

<BrowserRouter>
  <App />
</BrowserRouter>
```

---

## 👀 Watch Mode

Keep routes up to date automatically:

```bash
npx react-file-routing --watch
```

---

## 🧠 Routing Rules

| File / Folder                        | Route Path          |
| ------------------------------------ | ------------------- |
| `src/app/page.jsx`                   | `/`                 |
| `src/app/about/page.jsx`             | `/about`            |
| `src/app/blog/[slug]/page.jsx`       | `/blog/:slug`       |
| `src/app/user/[id]/profile/page.jsx` | `/user/:id/profile` |
| `layout.jsx` inside any folder       | Layout for children |
| `page.jsx` inside any folder         | Final route output  |

---

## 🔧 CLI Options

| Command                          | Description                               |
| -------------------------------- | ----------------------------------------- |
| `npx react-file-routing`         | Generate routes from `src/app`            |
| `npx react-file-routing --watch` | Watch `src/app` and regenerate on changes |

---

## 📄 Output Example

Given:

```
src/app/
├── layout.jsx
├── page.jsx
└── blog/
    ├── layout.jsx
    └── [slug]/page.jsx
```

Generated file:

```js
import React from 'react';
import Layout from '../app/layout.jsx';
import Home from '../app/page.jsx';
import BlogLayout from '../app/blog/layout.jsx';
import BlogPost from '../app/blog/[slug]/page.jsx';

export const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: 'blog',
        element: <BlogLayout />,
        children: [
          { path: ':slug', element: <BlogPost /> }
        ]
      }
    ]
  }
];
```

---

## 🙋 FAQ

### ❓ Can I use `.tsx` files?

Not yet. Support for `.tsx` is planned.

### ❓ Will it overwrite my custom routes?

No. It only generates `routes.generated.js`. You choose whether to use it.

### ❓ Can I customize paths?

Yes — your folder structure defines route paths.

### ❓ Are nested layouts supported?

Yes. Use `layout.jsx` at any depth.

---

## 🔗 Links

* GitHub: [kanon-hosen/react-file-routing](https://github.com/kanon-hosen/react-file-routing)
* NPM: [react-file-routing](https://www.npmjs.com/package/react-file-routing)

---

## 📄 License

MIT © [Kanon Hosen](https://github.com/kanon-hosen)

---

## ⭐ Contributions Welcome

Found a bug? Want to suggest a feature?
Open an issue or submit a PR on [GitHub](https://github.com/kanon-hosen/react-file-routing).

[![npm](https://img.shields.io/npm/v/react-file-routing)](https://www.npmjs.com/package/react-file-routing)
