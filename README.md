# Weather App

## Overview

A responsive, TypeScript-powered weather app built with modern frontend tools. This app provides real-time weather data for any city worldwide, with a clean, user-friendly interface.The app detects the user's location by default, allowing users to add their favorite locations, displayed on a sidebar. Favorites can be managed by clicking the heart icon beside each location's name and temperature.

The app fetches detailed weather data, including hourly forecasts, sunrise/sunset times, humidity, wind, precipitation, and UV index information.

## Features

- **Real-Time Weather Data**: Fetches up-to-date weather information from [Weather API](https://www.weatherapi.com/).
- **Unlimited API Requests**: Uses a free API with no request limits to ensure smooth and continuous data fetching.
- **Responsive UI**: Built with Material UI for a seamless experience on any device.
- **Favorites Feature**: Allows users to save favorite cities and easily access weather data for multiple locations.
- **Clean and Intuitive Design**: Weather icons and modern UI elements provide a visually appealing and user-friendly interface.
- **CI/CD with Netlify**: Deployed on Netlify for automatic deployments, CI/CD integration, and easy scaling.

## Tech Stack

- **Frontend**: React with Vite for fast development.
- **Language**: TypeScript for type safety and maintainable code.
- **State Management**: React Query for data fetching and caching.
- **Component Library**: Material UI for responsive, accessible components.
- **Icons**: React Icons for weather icons.
- **API**: Weather API for fetching weather data.

## Setup & Installation

### Prerequisites

- **Node.js** (v14+ recommended)
- **NPM** (v6+) or **Yarn** (v1.22+)

### Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/your-username/weather-app.git
   cd weather-app
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

   or

   ```bash
   yarn install
   ```

3. **Set Up Environment Variables**:

   - Create a `.env` file in the project root directory with the following content:
     ```env
     VITE_WEATHER_API_KEY=your_api_key_here
     ```
   - Replace `your_api_key_here` with your actual API key from [Weather API](https://www.weatherapi.com/).

4. **Run the Application**:
   ```bash
   npm run dev
   ```
   or
   ```bash
   yarn dev
   ```

The app will be available at `http://localhost:3000` by default.

## Deployment

The app is automatically deployed to Netlify via GitHub CI/CD integration. Each commit to the main branch triggers a new deployment.

## Screenshot
![Screenshot 2024-11-08 101255](https://github.com/user-attachments/assets/09c708bd-5875-441b-a45a-1a1b2d65fc71)

