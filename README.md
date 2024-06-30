# RES-Q

A React application similar to Uber but for ambulance services, including user and driver dashboards with a tracking system.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Acknowledgements](#acknowledgements)

## Features
- Real-time tracking of ambulances
- User and driver dashboards
- Map view with hospital and ambulance markers
- Live location updates using WebSockets

## Technologies Used
- React
- Google Maps API
- Socket.IO
- Flask
- NodeJS
- VITE

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Python(v3.11.0 or higher)
- Flask
### Installation

1. Clone the repository:<br>
    git clone https://github.com/BISHAL214/HackStreetBoys

2. Navigate to the project directory<br>
    cd HackStreetBoys

3. Install dependencies:<br>
    npm install
    # or
    yarn install
    # or
    bun install

## Usage
1. Start the backend server:<br>
    py /backend/app.py

2. Start the development server:<br>
    npm run dev
    # or
    yarn run dev
    # or
    bun run dev

3. Open your browser and go to http://localhost:5173.

## API Endpoints
- The application communicates with a backend server to fetch and update live locations.<br>
    GET /api/coordinates/latest: Fetches the latest coordinates of all ambulances.

## Acknoledgement   
- Google Maps React
- Socket.io
- Thanks to the contributors and maintainers of the librarians used in this project
