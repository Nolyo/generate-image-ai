# Generate Image AI

React + Express application for generating images using OpenAI's DALL-E 3 API, with password authentication.

## Architecture

### Production
- **Single port (3001)**: Express serves both the API and the built React frontend
- Frontend is built as static files and served from `/dist`

### Development
- **Port 3000**: Vite dev server (frontend with HMR)
- **Port 3001**: Express API server
- Vite proxies `/api/*` requests to Express

## Prerequisites

- Node.js 18+
- pnpm
- OpenAI account with API access

## Local Installation

```bash
cd app
pnpm install
```

## Configuration

Create a `.env` file at the project root with:

```env
# Authentication
AUTH_SECRET=your-secret-key-for-jwt-min-32-chars
AUTH_PASSCODE=your-password-to-access-app

# OpenAI
OPENAI_API_KEY=sk-...

# Server
PORT=3001
NODE_ENV=development
```

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `AUTH_SECRET` | Secret key for signing JWT tokens (min 32 characters) | ✅ |
| `AUTH_PASSCODE` | Password to access the application | ✅ |
| `OPENAI_API_KEY` | OpenAI API key for DALL-E 3 | ✅ |
| `PORT` | Express server port (default: 3001) | ❌ |
| `NODE_ENV` | Environment (`development` or `production`) | ❌ |

## Development

```bash
cd app
pnpm run dev
```

Open http://localhost:3000

## Build and Local Production

```bash
cd app
pnpm run build
pnpm start
```

The application will be available at http://localhost:3001

## Deployment on Dokploy

### 1. Project Configuration

In Dokploy, create a new application with:

- **Build Type**: Dockerfile
- **Docker File**: `./Dockerfile`
- **Docker Context Path**: `.` (project root)
- **Port**: `3001`

### 2. Environment Variables

Add in the **Environment** tab:

```env
AUTH_SECRET=your-secret-key-for-jwt-min-32-chars
AUTH_PASSCODE=your-password-to-access-app
OPENAI_API_KEY=sk-...
NODE_ENV=production
PORT=3001
```

### 3. Domain

In the **Domains** tab, configure:
- **Port**: `3001`
- **HTTPS**: Enabled (with Let's Encrypt)
- **Domain**: `image.yourdomain.com` (or your domain)

### 4. Deployment

Click **Deploy** to start the build and deployment process.

## Technical Architecture

### Frontend (React + Vite)
- React 18
- TypeScript
- React Router
- Formik + Zod (validation)
- TailwindCSS
- Tests with Vitest

### Backend (Express)
- Express 5
- JWT authentication
- Cookie-based sessions
- OpenAI SDK for DALL-E 3

### Docker
- **Multi-stage build**:
  1. `builder` stage: Build React frontend
  2. `production` stage: Express server + static files

## API Endpoints

### Authentication
- `GET /api/session` - Check if user is authenticated
- `POST /api/login` - Login (body: `{ password: string }`)
- `POST /api/logout` - Logout

### Images
- `POST /api/images` - Generate an image (authentication required)
  - Body: `{ prompt: string, size?: string }`
  - Response: `{ url: string, revised_prompt: string | null }`

### Health
- `GET /api/health` - Healthcheck

## Available Scripts

```bash
# Development (frontend + backend in parallel)
pnpm run dev

# Production build
pnpm run build

# Start in production
pnpm start

# Tests
pnpm run test
pnpm run test:ui

# Linting
pnpm run lint

# Type checking
pnpm run typecheck
```

## Project Structure

```
.
├── app/
│   ├── src/              # React source code
│   │   ├── components/
│   │   ├── pages/
│   │   └── router.tsx
│   ├── server/           # Express code
│   │   └── index.js
│   ├── dist/             # React build (generated)
│   └── package.json
├── Dockerfile            # Multi-stage build
├── docker-compose.yml    # Docker configuration
└── README.md
```

## Troubleshooting

### 500 Error on /api/login
Check that `AUTH_SECRET` and `AUTH_PASSCODE` environment variables are properly configured.

### 500 Error on /api/images
Check that `OPENAI_API_KEY` is properly configured and valid.

### Bad Gateway (502)
Check that the port configured in Dokploy matches the port exposed by the application (3001).

### Top-level await error during build
The code now uses `useEffect` in a `ProtectedRoute` component to avoid top-level await which is not supported in all build environments.

## Modifications for Dokploy Deployment

1. **Unified server**: Express now serves React static files in production
2. **Multi-stage Dockerfile**: Optimized build with build/production separation
3. **React Router**: Replaced top-level await with component using useEffect
4. **Express 5 compatibility**: Used middleware instead of `app.get('*')` for catch-all route
5. **Start script**: Added `pnpm start` to run in production

## License

MIT
