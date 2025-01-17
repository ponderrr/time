# T.I.M.E. Travel Admin Portal

## Overview
This admin portal was developed as part of a collaborative travel platform project in CMPS 2850. The portal specifically manages the Activities component of the T.I.M.E. (Travel Integration Made Easy) system, providing administrators with tools to manage travel activities, locations, and related services.

## Screenshots

### Main Dashboard Views
![Activities Listing](/screenshots/activities-listing.png)
*Activities Listing - Main view for managing travel activities*

![Activity Types](/screenshots/activity-types.png)
*Activity Types - Categorization management for activities*

![Locations](/screenshots/locations.png)
*Locations - Venue and destination management*

![Products](/screenshots/products.png)
*Products - Related products and services management*

![Tags](/screenshots/tags.png)
*Tags - Activity tagging and organization system*

### Form Interfaces
![Create Activity](/screenshots/activity-create.png)
*Create Activity Form - Comprehensive activity creation interface*

![Update Activity](/screenshots/activities-update.png)
*Update Activity Form - Activity modification interface*

## Features

### Core Functionality
- **Activities Management**: Create, read, update, and delete travel activities
- **Location Management**: Handle venue and destination information
- **Product Integration**: Manage activity-related products and services
- **Tag System**: Organize activities with a flexible tagging system
- **Activity Types**: Categorize different types of activities

### Technical Highlights
- Full-stack application with C# (.NET) backend and React/TypeScript frontend
- RESTful API architecture with proper error handling
- JWT-based authentication system
- Responsive design using Mantine UI and Tailwind CSS
- SQL Server database integration
- Proper state management and form handling

## Technology Stack

### Backend
- ASP.NET Core
- Entity Framework Core
- SQL Server
- JWT Authentication
- Swagger/OpenAPI

### Frontend
- React 18
- TypeScript
- Vite
- Mantine UI Components
- Tailwind CSS
- Axios for API integration

## Project Structure

### Backend Components
- `Controllers/`: API endpoints for each entity
- `Entities/`: Data models and DTOs
- `Services/`: Business logic and security services
- `Data/`: Database context and configurations

### Frontend Components
- `pages/`: React components for different views
- `components/`: Reusable UI components
- `constants/`: Type definitions and constants
- `config/`: Application configuration
- `services/`: API integration services

## Setup and Installation

1. **Backend Setup**
```bash
# Clone the repository
git clone [repository-url]

# Navigate to the backend directory
cd [backend-directory]

# Restore packages
dotnet restore

# Update database
dotnet ef database update

# Run the application
dotnet run
```

2. **Frontend Setup**
```bash
# Navigate to the frontend directory
cd [frontend-directory]

# Install dependencies
npm install

# Start the development server
npm run dev
```

## Environment Configuration
- Configure the database connection string in `appsettings.json`
- Set up JWT authentication keys in environment variables
- Configure CORS settings for local development

## Contributing
This project was developed as part of CMPS 2850 coursework. While it's open for reference, please note that it's primarily a portfolio piece demonstrating full-stack development capabilities.