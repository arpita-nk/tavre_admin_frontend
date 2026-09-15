# Tavré Admin Frontend

Admin dashboard for **Tavré**, a premium clothing brand. Built with React 19 + Vite, this app lets admins manage products, inventory, orders, and customers.

## Features

- **Authentication** — token-based admin login
- **Dashboard** — overview landing page
- **Products** — view, search, and add new products
- **Inventory** — bulk import products via CSV with column mapping
- **Orders** — order management
- **Customers** — customer management

## Tech Stack

- [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- [React Router 7](https://reactrouter.com/) for routing
- [React Bootstrap](https://react-bootstrap.github.io/) for UI components
- [React Icons](https://react-icons.github.io/react-icons/)
- ESLint for linting

## Getting Started

### Prerequisites

- Node.js (LTS recommended)
- A running instance of the Tavré backend API (see [Configuration](#configuration))

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app runs on Vite's default dev server (usually `http://localhost:5173`).

### Build

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## Configuration

This app expects a backend API. Currently the API base URL (`http://localhost:3000`) is hardcoded in:
- `src/apis/fetchDataApi.js`
- `src/component/pages/Login.jsx`

> **TODO:** Move this to an environment variable (e.g. `VITE_API_BASE_URL`) so it can be configured per environment.

## Project Structure

```
src/
├── apis/            # API request helpers
├── assets/          # Images/logos
├── component/
│   ├── forms/        # Reusable form components
│   ├── layouts/       # AdminLayout, SidebarMenu
│   ├── modals/        # AddProductModal, ImportModal
│   └── pages/         # Login, Dashboard, Products, Inventory, Orders, Customers
├── styles/          # Page/component-specific CSS
├── App.jsx          # Routes
└── main.jsx         # Entry point
```

## Known Issues

- Login does not currently persist the auth token to `localStorage`, which `ProtectedRoute` relies on — needs a fix so successful logins actually unlock protected routes.
- `App.jsx` imports `./component/Layouts/AdminLayout` (capitalized), but the folder is `component/layouts` (lowercase). This works on case-insensitive filesystems but will fail on Linux/CI — rename the import or the folder to match.

## License

_Add license info here._
