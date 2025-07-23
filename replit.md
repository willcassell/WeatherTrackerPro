# WeatherFlow Tempest Weather Station Dashboard

## Overview

This is a modern weather monitoring application that displays real-time data from a WeatherFlow Tempest weather station. The application fetches data from the WeatherFlow API and presents it in an intuitive dashboard with weather cards, live radar, and automatic updates.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **UI Framework**: shadcn/ui components with Radix UI primitives
- **Styling**: Tailwind CSS with custom weather-themed color variables
- **Build Tool**: Vite for fast development and optimized builds

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ESM modules
- **Database ORM**: Drizzle ORM configured for PostgreSQL
- **Session Storage**: PostgreSQL-based session storage with connect-pg-simple
- **Development Server**: Custom Vite integration for seamless full-stack development

### Data Storage
- **Primary Database**: PostgreSQL via Neon serverless database
- **Fallback Storage**: In-memory storage implementation for development
- **Schema Management**: Drizzle migrations with shared schema definitions
- **Data Retention**: Weather history maintained for 48 hours

## Key Components

### Weather Dashboard Components
1. **TopBanner**: Station info and last update timestamp
2. **TemperatureCard**: Current, high, and low temperatures
3. **WindCard**: Wind speed, direction with compass visualization
4. **PressureCard**: Barometric pressure with trend indicators
5. **RainfallCard**: Today's and yesterday's precipitation
6. **AdditionalDataCard**: Humidity, UV index, and visibility
7. **RadarDisplay**: Embedded Windy.com live weather radar

### Data Layer
- **WeatherData Schema**: Comprehensive weather metrics storage
- **Storage Interface**: Abstracted storage layer supporting multiple backends
- **API Integration**: WeatherFlow Tempest API client with error handling

### UI System
- **Design System**: shadcn/ui with "new-york" style configuration
- **Dark Theme**: Default dark theme optimized for weather monitoring
- **Responsive Design**: Mobile-first approach with breakpoint handling
- **Custom Animations**: Weather-specific visual indicators and loading states

## Data Flow

1. **API Polling**: Server polls WeatherFlow API every 3 minutes
2. **Data Transformation**: Raw API data converted to normalized schema
3. **Storage**: Weather data saved with automatic history management
4. **Client Updates**: Frontend polls for updates every 3 minutes
5. **Real-time Display**: Live data visualization with trend indicators

### WeatherFlow API Integration
- **Endpoint**: Better forecast API for current conditions
- **Authentication**: Token-based authentication (multiple env var options)
- **Data Processing**: Wind direction conversion, pressure trend calculation
- **Error Handling**: Graceful fallback for API failures

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Neon PostgreSQL driver
- **@tanstack/react-query**: Server state management
- **drizzle-orm**: Type-safe database ORM
- **express**: Web server framework
- **date-fns**: Date formatting and manipulation

### UI Dependencies
- **@radix-ui/***: Accessible UI primitives
- **tailwindcss**: Utility-first CSS framework
- **lucide-react**: Modern icon library
- **wouter**: Lightweight router

### Development Tools
- **vite**: Build tool and dev server
- **typescript**: Type safety
- **tsx**: TypeScript execution
- **esbuild**: Fast bundling for production

## Deployment Strategy

### Build Process
1. **Frontend Build**: Vite builds React app to `dist/public`
2. **Backend Build**: esbuild bundles server code to `dist/index.js`
3. **Database Setup**: Drizzle migrations applied via `db:push` command

### Environment Configuration
- **DATABASE_URL**: PostgreSQL connection string (required)
- **API Tokens**: WeatherFlow API authentication (multiple naming options)
- **NODE_ENV**: Environment detection for development features

### Production Considerations
- **Static Serving**: Express serves built frontend assets
- **Error Handling**: Comprehensive error boundaries and API error handling
- **Performance**: Query caching, optimized bundle sizes, and efficient re-renders
- **Monitoring**: Request logging and response time tracking

### Development Features
- **HMR**: Hot module replacement via Vite
- **Error Overlay**: Runtime error display in development
- **Replit Integration**: Banner and cartographer for Replit environment
- **Live Reloading**: Automatic server restart on changes