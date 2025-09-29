# Vue Forms App

## Overview

This project is a small interactive web application built with Vue 3, TypeScript, Vite, Pinia, and Vue Router. It features two forms (Form A and Form B) with real-time validation, data submission to a backend, and display of response results. The frontend is styled with Tailwind CSS in a dark theme, focusing on logic while maintaining a clean UI. The backend is implemented with NestJS for handling form submissions, logging data, and returning responses. The app is deployed on GitHub Pages (frontend) and Vercel (backend).

The project was developed interactively, step-by-step, based on the provided technical specification (ТЗ). It includes component-based structure, Composition API, strict typing, and optimization for performance and maintainability.

## Features

- **Form A**: Fields for Name*, Email, INN* (validation for individual or legal entity), Phone* (format +7 (000) 000-00-00). Required fields marked with *.
- **Form B**: Fields for Name*, Surname*, Patronymic*, Birth Date* (DD.MM.YYYY), Login* (min 6 chars, Latin), Email*.
- **Real-time Validation**: Inputs turn red on error; error list above submit button; submit enabled only on valid form.
- **Submission**: Simulated server response with setTimeout (initially); now real backend on NestJS. Success returns `{ requestId, classifier }`; error returns `{ error: message }`.
- **State Management**: Pinia stores response data (requestId, classifier) for display on results page.
- **Routing**: Home, Form A, Form B, Results pages with navigation.
- **Dark Theme**: Using Tailwind CSS.
- **Backend Processing**: Logs form data to console (Vercel logs); generates dynamic requestId based on data.
- **Deployment**: Frontend on GitHub Pages, backend on Vercel with automatic CI/CD.

## Technologies

### Frontend
- Vue 3 (Composition API)
- TypeScript
- Vite (build tool)
- Pinia (state management)
- Vue Router (navigation)
- Tailwind CSS v4 (styling, dark mode)

### Backend
- NestJS
- TypeScript

### Deployment
- GitHub Pages (frontend)
- Vercel (backend)

### Other
- ESLint, Prettier for code quality
- Git for version control with semantic commits (feat, fix, etc.)

## Installation and Local Setup

### Frontend

```bash
# Clone the repo
git clone https://github.com/TieR89/vue-forms-app.git
cd vue-forms-app

# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:5173 for the app

# Build for production
npm run build
npm run preview  # Local preview on http://localhost:4173
```
## Backend

```bash
# Clone the repo
git clone https://github.com/TieR89/vue-forms-backend.git
cd vue-forms-backend

# Install dependencies
npm install

# Run development server
npm run start:dev

# API on http://localhost:3000/form/a (POST) etc.
```

## Usage

- Navigate to Home for form selection
- Fill forms with validation
- Submit: Data logged on backend; response stored in Pinia and shown on `/result`
- In prod: Forms send to Vercel backend

## Deployment

### Frontend (GitHub Pages)
- Automated via GitHub Actions (`.github/workflows/deploy.yml`)
- Live: https://tier89.github.io/vue-forms-app/
- Base path: `/vue-forms-app/` in `vite.config.ts`

### Backend (Vercel)
- Automated on push to main
- Live API: https://vue-forms-backend.vercel.app/form/a (POST)
- Logs: View in Vercel dashboard

## Configuration

- **Frontend .env** (optional): `VITE_BACKEND_URL=https://vue-forms-backend.vercel.app`
- **Backend CORS**: Configured for local and prod origins

## Git Commits

Used semantic types: feat (new features), fix (bugs), refactor, etc.

## Troubleshooting

- **CORS errors**: Ensure origins in backend `main.ts` match frontend domain
- **Validation**: Custom validators in frontend `utils/validators.ts`
- **Logs**: On Vercel, data logged to console (no file write for serverless compatibility)

## Links to Share the Completed Task

- **Frontend GitHub Repo**: https://github.com/TieR89/vue-forms-app
- **Backend GitHub Repo**: https://github.com/TieR89/vue-forms-backend
- **Live Demo (Frontend)**: https://tier89.github.io/vue-forms-app/
- **Backend API**: https://vue-forms-backend.vercel.app (Test POST endpoints)
- **Vercel Dashboard** (private, for you): https://vercel.com/antons-projects-ab54297b/vue-forms-backend

## License

MIT License. Feel free to use, modify, and distribute.