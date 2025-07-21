# Node.js App with React and SQLite

A full-stack application with Express backend, React frontend, and SQLite database.

## Local Development

1. Install dependencies:
```bash
npm run install-all
```

2. Start development servers:
```bash
npm run dev
```

The app will be available at:
- Frontend: http://localhost:5173
- Backend: http://localhost:3001

## Deployment on Render

### Render Configuration

1. Create a new Web Service on Render
2. Connect your GitHub repository (tirandagan/dipankar)
3. Use these settings:
   - **Environment**: Node
   - **Build Command**: `npm run render-build`
   - **Start Command**: `npm start`
   - **Environment Variables**:
     - `NODE_ENV`: production
     - PORT will be set automatically by Render

### Important Notes for Render:

1. **SQLite Database**: The SQLite database file will be stored in `/database/app.db`. Note that on Render's free tier, the database will be reset on each deployment since the filesystem is ephemeral.

2. **For Production Use**: Consider upgrading to a persistent disk on Render or switching to PostgreSQL for data persistence.

3. **Build Process**: The build command installs dependencies for both server and client, then builds the React app.

## Project Structure

```
nodejs-app/
├── server/           # Express backend
├── client/           # React frontend  
├── database/         # SQLite database files
└── package.json      # Root package.json
```