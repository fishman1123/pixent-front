# Pixent - Personal Perfume Recommendation Service

This application provides a personalized perfume recommendation service powered by AI.

## Ownership

This application is owned by (주)네안데르.

## Contact Information

For any technical issues or suggestions, please contact:
- Yong Joo Cho (cho.y.j1997@gmail.com)

## Directory Structure

```
pixent-front/
├── public/          # Static files
├── src/             # Source code
│   ├── api/         # API integration logic
│   ├── assets/      # Static assets (images, fonts)
│   ├── components/  # React components
│   │   └── admin/   # Admin dashboard components
│   ├── data/        # Data files
│   ├── hooks/       # Custom React hooks
│   ├── locales/     # Internationalization files
│   ├── recoil/      # Recoil state management
│   ├── store/       # Redux store
│   └── util/        # Utility functions
├── dist/            # Production build output
└── .env             # Environment variables
```

## Tech Stack

- **Frontend Framework**: React (Vite)
- **State Management**: Redux Toolkit, Recoil
- **API Client**: Axios, React Query
- **Styling**: TailwindCSS, Flowbite
- **Internationalization**: i18next
- **Data Visualization**: Recharts
- **Deployment**: Vercel

## Features

### Core Functionality

The Pixent application offers the following features:

- **Personalized Perfume Recommendations**: Get AI-powered perfume recommendations based on your preferences and profile.
- **Social Login Integration**: Easily log in using your social media accounts for a personalized experience.
- **Customization Feedback**: Provide feedback to further customize your personal perfume recommendations.
- **AI Advisor**: Get AI-based advice to help you discover your perfect personal fragrance.
- **User Dashboard**: Track your perfume profile and get updates on new recommendations.

### Admin Features

For administrators, the application offers:
- User management
- Result analytics
- Report generation and sharing

## Getting Started

### Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Production Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```
