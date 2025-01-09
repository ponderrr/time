# Admin Portal Application

## Overview
A full-stack administrative portal built with .NET Core and React, enabling management of activities, locations, and related entities. The application features a robust authentication system, complete CRUD operations, and a modern responsive UI.

## Features
- User authentication with JWT tokens
- Activity management with location tracking
- Product catalog with inventory management
- Tag-based categorization system
- Location and venue management
- Role-based access control
- Responsive UI with modern design patterns

## Technology Stack
### Backend
- .NET Core 
- Entity Framework Core
- JWT Authentication
- SQL Server Database
- RESTful API Architecture

### Frontend
- React with TypeScript
- Mantine UI Components
- Tailwind CSS
- Axios for API Communication
- React Router for Navigation

## Project Structure
```
TIME/
├── backend-temp/
│   ├── bin/
│   ├── Common/
│   ├── Controllers/
│   ├── Data/
│   ├── Entities/
│   ├── logs/
│   ├── Migrations/
│   ├── obj/
│   ├── Properties/
│   ├── Services/
│   ├── .env
│   ├── .env.example
│   ├── appsettings.Development.json
│   ├── appsettings.json
│   ├── backend-temp.csproj
│   └── Program.cs
├── client/
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   └── Navigation.tsx
│   │   ├── config/
│   │   │   ├── axios.ts
│   │   │   └── env.ts
│   │   ├── constants/
│   │   │   └── types.ts
│   │   ├── pages/
│   │   │   ├── activities/
│   │   │   ├── activity-types/
│   │   │   ├── auth/
│   │   │   ├── locations/
│   │   │   ├── products/
│   │   │   └── tags/
│   │   ├── services/
│   │   │   └── authService.ts
│   │   ├── App.css
│   │   ├── App.tsx
│   │   ├── index.css
│   │   ├── main.tsx
│   │   └── routes.ts
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   ├── tsconfig.app.json
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   └── vite.config.ts
├── .gitignore
└── time.sln
```

## Setup Instructions

### Backend Setup
1. Navigate to the backend directory
2. Install dependencies:
   ```bash
   dotnet restore
   ```
3. Update database connection string in `appsettings.json`
4. Run migrations:
   ```bash
   dotnet ef database update
   ```
5. Start the server:
   ```bash
   dotnet run
   ```

### Frontend Setup
1. Navigate to the frontend directory
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## API Endpoints
The application provides the following main API endpoints:

- Authentication: `/api/auth`
- Activities: `/api/activity`
- Locations: `/api/location`
- Products: `/api/product`
- Tags: `/api/tag`
- Reviews: `/api/review`

## Features in Detail

### Activity Management
- Create and schedule activities
- Assign locations and products
- Tag-based categorization
- Time and date management
- Product association

### Location Management
- Location creation and editing
- Address management
- Venue details
- Location-based filtering

### Product Management
- Product catalog
- Inventory tracking
- Price management
- Product-location association

## Security
- JWT-based authentication
- Role-based authorization
- Secure password handling
- API rate limiting
- CORS policy implementation

## Testing
- Unit tests for backend services
- Component testing for frontend
- Integration testing for API endpoints

## Development Notes
- Follow the established coding standards
- Document new features and APIs
- Update test cases as needed
- Maintain type safety in TypeScript
- Follow RESTful API conventions

## License
This project was created for educational purposes as part of a class project. All rights reserved.