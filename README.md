# 👨‍💻 VS Code Portfolio

> An interactive developer portfolio built to resemble Visual Studio Code.

[![React](https://img.shields.io/badge/React-19-blue?logo=react&style=for-the-badge)](https://react.dev)
[![TanStack Router](https://img.shields.io/badge/TanStack_Router-1.0-red?style=for-the-badge)](https://tanstack.com/router)
[![Vite](https://img.shields.io/badge/Vite-6.0-purple?logo=vite&style=for-the-badge)](https://vitejs.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript&style=for-the-badge)](https://www.typescriptlang.org)

Welcome to my portfolio! This isn't just a static list of projects; it's a fully functional web application designed to emulate the experience of the **VS Code IDE**.

## 🚀 Features

### 🎨 Authentic VS Code Experience
- **Activity Bar**: Functional navigation between Explorer, Search, Source Control (GitHub link), and Debugger.
- **Sidebar**: Interactive file explorer with collapsible folders.
- **Tabs System**: Open and switch between multiple "files" (pages).
- **Status Bar**: Real-time mock data and layout info.

### ⚡ Technical Highlights
- **Syntax Highlighting**: Custom `JsonCode` and `CssCode` components to render data with theme-accurate coloring.
- **Interactive Debugger**: A `/debug` route that simulates a live debugging session with real-time variable updates (Heap usage, active connections, CPU load).
- **Dynamic Routing**: Powered by **TanStack Router** for file-based routing that mirrors the file explorer structure.
- **CSS-First**: Styled primarily with Vanilla CSS and VS Code variables for authentic theming and performance.

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/WijanDev/portfolio.git
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

## 📂 Project Structure

```text
src/
├── components/       # UI Components (ActivityBar, Sidebar, JsonCode...)
├── routes/           # File-based routes (home.tsx, projects.tsx...)
├── styles.css        # VS Code theme variables and global styles
└── main.tsx          # App entry point
```

## 🧩 "Files" to Explore

- `home.tsx`: Introduction and developer stats.
- `projects.tsx`: A list of my recent work.
- `contact.css`: Contact information styled as CSS rules.
- `package.json`: A curated view of the project's actual dependencies.
- `debug.tsx`: A completely interactive debug session simulation.

---

*Built with ❤️ by Wijan Ruiz Mok*
