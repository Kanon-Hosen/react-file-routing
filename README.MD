
# 📦 react-router-file

A zero-config file-based router generator for React using `react-router-dom`.  
Automatically reads your `src/pages` folder and generates a route tree for you.

---

## ✨ Features

- 📁 File-based routing (Next.js style)
- ⚛️ React-friendly output
- 🔄 Auto-generates `routes.generated.js`
- 👀 Watch mode for live updates
- 🧠 Dynamic routing with `[param].jsx` → `:param`
- ⚡ Fast & Easy setup
- ✅ Compatible with `react-router-dom@6`

---

## 📥 Installation

Install the package as a development dependency:

```bash
npm install --save-dev react-router-file
````

---

## 🚀 Usage

### 📁 Step 1: Create Your Pages

Inside your React app, structure your pages like this:

```
src/
├── pages/
│   ├── index.jsx           → "/"
│   ├── about.jsx           → "/about"
│   ├── contact.jsx         → "/contact"
│   └── blog/
│       └── [slug].jsx      → "/blog/:slug"
```

---

### ⚙️ Step 2: Generate the Routes

Run the following command to generate the routes:

```bash
npx react-router-file
```

This will generate a file at:

```
src/router/routes.generated.js
```

---

### 🧠 Sample Output

```js
import About from './src/pages/about.jsx';
import Contact from './src/pages/contact.jsx';
import Home from './src/pages/index.jsx';

export const routes = [
  { path: '/about', element: <About /> },
  { path: '/contact', element: <Contact /> },
  { path: '/', element: <Home /> },
];
```

---

## 🧩 Integration with React Router

Use the generated `routes.generated.js` file like this:

```jsx
// App.jsx
import { useRoutes } from 'react-router-dom';
import { routes } from './router/routes.generated';

function App() {
  const element = useRoutes(routes);
  return element;
}

export default App;
```

---

## 👀 Watch Mode

To regenerate routes on every file change inside `src/pages`:

```bash
npx react-router-file --watch
```

This will watch your files and regenerate the route file automatically when changes are detected.

---

## 🧠 Routing Rules

| File Path                         | Route Path          |
| --------------------------------- | ------------------- |
| `src/pages/index.jsx`             | `/`                 |
| `src/pages/about.jsx`             | `/about`            |
| `src/pages/blog/[slug].jsx`       | `/blog/:slug`       |
| `src/pages/user/[id]/profile.jsx` | `/user/:id/profile` |

* **Dynamic routes**: `[param].jsx` → `:param`
* **Nested routes**: use folders inside `src/pages`
* `index.jsx` inside any folder becomes the base path for that folder

---

## 🔧 CLI Options

| Command                         | Description                           |
| ------------------------------- | ------------------------------------- |
| `npx react-router-file`         | Generate routes from `src/pages`      |
| `npx react-router-file --watch` | Watch `src/pages` and auto-regenerate |

---


Now you can run it in any project via:

```bash
npx react-router-file
```

---



## 📄 License

MIT © [Kanon Hosen](https://github.com/kanon-hosen)

---

## 📘 Links

* 🔗 GitHub: [https://github.com/kanon-hosen/react-file-routing](https://github.com/kanon-hosen/react-file-routing)
* 📦 NPM: [https://www.npmjs.com/package/react-file-routing](https://www.npmjs.com/package/react-file-routing)

---

## 🙋 FAQ

### ❓ Can I use `.tsx` files?

Not yet. Current version supports `.jsx` only. `.tsx` support is planned.

### ❓ Will this replace my custom routes?

No. It only generates `routes.generated.js`. You can decide whether to use it or not.

### ❓ Can I customize route paths?

Yes! You can structure your files/folders to shape your routes however you want.

---

## ⭐ Contributions Welcome

Found a bug? Want to add a feature? Open an issue or PR on [GitHub](https://github.com/kanon-hosen/react-file-routing).

```

