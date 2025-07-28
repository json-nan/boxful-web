# Boxful Web Application

A modern delivery management web application built with Next.js 15, React 19, and Ant Design. This application provides a complete solution for managing delivery orders, user authentication, and package tracking.

## Prerequisites

Before running this project locally, ensure you have the following installed:

- **Node.js**: Version 20.x or higher
- **npm**: Version 9.x or higher (comes with Node.js)
- **Git**: For version control

You can check your versions by running:
```bash
node --version
npm --version
```

## Tech Stack

### Core Framework
- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - Latest React with concurrent features
- **[TypeScript 5](https://www.typescriptlang.org/)** - Type-safe development

### UI & Styling
- **[Ant Design 5.26.6](https://ant.design/)** - Enterprise UI component library
- **[@ant-design/nextjs-registry](https://ant.design/docs/react/use-with-next)** - Next.js integration
- **[@ant-design/v5-patch-for-react-19](https://ant.design/docs/react/v5-for-19)** - React 19 compatibility
- **[Ant Design Icons](https://ant.design/components/icon)** - Icon library
- **CSS Modules** - Scoped styling

### State Management & Data Fetching
- **[TanStack Query 5](https://tanstack.com/query/latest)** - Server state management
- **[Zustand 5](https://zustand-demo.pmnd.rs/)** - Client state management
- **[Axios 1.11](https://axios-http.com/)** - HTTP client with interceptors

### Utilities & Tools
- **[Day.js 1.11](https://day.js.org/)** - Date manipulation library
- **[nuqs 2.4](https://nuqs.47ng.com/)** - URL state management
- **[React Hook Form 7.61](https://react-hook-form.com/)** - Form validation

### Development Tools
- **[ESLint 9](https://eslint.org/)** - Code linting
- **[Turbopack](https://turbo.build/pack)** - Fast bundler for development

## Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── (authenticated)/          # Protected routes
│   │   ├── dashboard/            # Dashboard page
│   │   └── orders/               # Orders management
│   │       ├── create/           # Create order page
│   │       └── page.tsx          # Orders list page
│   ├── auth/                     # Authentication pages
│   │   ├── sign-in/              # Login page
│   │   └── sign-up/              # Registration page
│   ├── layout.tsx                # Root layout with providers
│   └── globals.css               # Global styles
├── components/                   # Shared components
│   └── svg/                      # SVG components
├── hooks/                        # Custom hooks
│   └── useAuthGuard.ts          # Authentication guard
├── libs/                         # Library configurations
│   └── axios.ts                 # Axios setup with interceptors
├── modules/                      # Feature modules
│   ├── auth/                    # Authentication module
│   │   ├── _api/                # Auth API hooks
│   │   └── pages/               # Auth pages
│   ├── orders/                  # Orders module
│   │   ├── _api/                # Orders API hooks
│   │   ├── pages/               # Order pages
│   │   ├── stores/              # Order state management
│   │   └── types/               # Order TypeScript types
│   └── layouts/                 # Layout components
├── utils/                       # Utility functions
│   ├── jwt.ts                  # JWT token validation
│   └── errorHandler.ts         # API error handling
└── catalogues/                 # Static data catalogs
    ├── Genders.ts              # Gender options
    └── PhoneCodes.ts           # Phone country codes
```

## Key Features

### 🔐 Authentication System
- **JWT-based authentication** with automatic token refresh
- **Age verification** (18+ years required for signup)
- **Protected routes** with automatic redirects
- **Token expiration handling** with cleanup

### 📦 Order Management
- **Multi-step order creation** with form state persistence
- **Package tracking** with detailed item management
- **Date-filtered order listing** with URL state management
- **Real-time form validation** with error handling

### 🎨 User Interface
- **Responsive design** with Ant Design components
- **React 19 compatibility** with proper concurrent features
- **Loading states** and error notifications
- **Empty states** for better UX

### 🚀 Performance & Developer Experience
- **Turbopack** for fast development builds
- **TypeScript** for type safety
- **ESLint** for code quality
- **Automatic token management** with Axios interceptors

## Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_BACKEND_URL=your_backend_api_url
```

## Getting Started

> **Note for development**: While Docker is excellent for production deployments, we recommend using local development (`npm run dev`) instead of Docker during development on Mac and Windows for better performance. Learn more about [optimizing local development](https://nextjs.org/docs/app/getting-started/deploying).

### 1. Clone the repository
```bash
git clone <repository-url>
cd boxful-web
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
```bash
cp .env.example .env.local
# Edit .env.local with your backend API URL
```

### 4. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Available Scripts

- **`npm run dev`** - Start development server with Turbopack
- **`npm run build`** - Build the application for production
- **`npm run start`** - Start the production server
- **`npm run lint`** - Run ESLint for code quality checks

## API Integration

### Authentication Endpoints
- `POST /authentication/sign-up` - User registration
- `POST /authentication/sign-in` - User login
- `POST /authentication/refresh-token` - Token refresh

### Orders Endpoints
- `GET /orders` - List orders with date filtering
- `POST /orders` - Create new order

### Error Handling
The application automatically extracts error messages from API responses:
```json
{
  "error": "Unprocessable Entity",
  "message": "Email already exists",
  "statusCode": 422
}
```

## Development Guidelines

### Code Organization
- **Feature-based modules** in `src/modules/`
- **API logic** separated in `_api/` directories
- **Shared components** in `src/components/`
- **Type definitions** co-located with features

### State Management
- **Server state**: TanStack Query for API data
- **Client state**: Zustand for application state
- **URL state**: nuqs for shareable application state
- **Form state**: React Hook Form for form validation

### Authentication Flow
- **Token storage**: localStorage with automatic cleanup
- **Route protection**: useAuthGuard hook
- **Automatic refresh**: Axios interceptors handle token renewal
- **Fallback handling**: Redirect to sign-in on authentication failures

## Deployment

### Production Build
```bash
npm run build
npm run start
```

### Environment Configuration
Ensure all environment variables are configured for your production environment.

## Contributing

1. Follow the existing code structure and naming conventions
2. Use TypeScript for all new code
3. Add proper error handling with the `getErrorMessage` utility
4. Test authentication flows thoroughly
5. Ensure responsive design compatibility

## Learn More

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API
- [Ant Design Documentation](https://ant.design/) - UI component library
- [TanStack Query](https://tanstack.com/query/latest) - Server state management
- [React 19 Documentation](https://react.dev/) - Latest React features
