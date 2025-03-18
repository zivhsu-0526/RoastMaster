# RoastMaster - Coffee Roasting Profile Manager

RoastMaster is a web application for managing and analyzing coffee roasting profiles. Built with React and Material-UI, it helps coffee roasters track and improve their roasting process.

## Prerequisites

- Node.js (v16 or higher)
- npm (v8 or higher)

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/RoastMaster.git
   cd RoastMaster
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Environment Setup:
   - Create `.env.development` for development environment
   - Copy `.env.production` for production environment
   - Configure the necessary environment variables:
     - `REACT_APP_GOOGLE_CLIENT_ID`: Your Google OAuth client ID
     - Other environment-specific variables as needed

4. Start the development server:
   ```bash
   npm start
   ```
   This will run the app in development mode at [http://localhost:3000](http://localhost:3000)

5. For production build:
   ```bash
   npm run build
   ```
   This will create an optimized production build in the `build` folder.

## Main Features

- Google OAuth authentication
- Coffee roasting profile management
- Interactive roasting charts using Highcharts
- Responsive Material-UI design

## Tech Stack

- React 19
- TypeScript
- Material-UI (MUI) v6
- Highcharts
- React Router v7
- Google OAuth

## Project Structure

```
RoastMaster/
├── src/               # Source files
├── public/           # Static files
├── design/           # Design assets
├── .env.development  # Development environment variables
└── .env.production   # Production environment variables
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
