# Weather App

A simple weather app using [weatherapi.com](https://www.weatherapi.com/).

The weather API provides city name auto-completion and weather data and this app presents it on the front end.

# Installation

To run this app, make sure you have nvm installed, and run `nvm install --lts`. This will install the latest stable version. Currently the project is using `node@23.9.0`.

Once node is installed, `npm ci --legacy-peer-deps` to cleanly install the node packages.

To run the app, `npm run dev` to run on your local machine. This will use Vite to run a dev instance of the site, and a link to the running site will appear in the console.

## Technical Stack

• React (latest stable version)
• React Query for data fetching and caching
• Any styling solution of your choice (CSS, Tailwind, Material UI, Chakra UI, etc.)
API Integration
• Use the WeatherAPI to fetch weather data (https://www.weatherapi.com/docs/)
• You'll need to sign up for a free API key

## Features

1. Search Page
   - A clean interface with a search input for city names
   - Validation for the search input
   - A search button to trigger the API request
   - Optional: Autocomplete suggestions for city names
3. Forecast Page
   - Display a 14-day weather forecast for the selected city
   - Present the data in a UI format of your choosing
   - Option to return to the search page
5. Optional Features
   - Responsive design (mobile and desktop)
   - Loading states during API calls
   - Error handling for API failures
   - Meaningful tests for key components
