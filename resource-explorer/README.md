# Resource Explorer

A React app for browsing Pokemon data with search, filters, and favorites.

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:5173 to view it in the browser.

## What it does

- Browse Pokemon with infinite scroll
- Search by name
- Filter by type and sort alphabetically
- Save favorites to local storage
- View detailed info for each Pokemon
- Switch between light and dark themes

## Built with

- React 18
- Vite
- Material-UI
- React Query
- React Router

## Project layout

```
src/
├── api/           # Data fetching
├── components/    # UI components
├── hooks/         # Custom hooks
├── pages/         # Main pages
└── utils/         # Helper functions
```

## Building for production

```bash
npm run build
```

The build folder will contain the optimized files.