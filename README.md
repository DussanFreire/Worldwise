# Worldwise - Track Your Footsteps 🌎

A world map application that allows users to track their travels and memories in cities across the globe. Developed as part of a React course, this project integrates with Google OAuth for user authentication and provides an interactive map interface where users can select cities, add descriptions of their experiences, and save them. The app is built with modern technologies like React, React-DOM, Leaflet, Vite, and CSS Modules.

## Features ✨

- **Interactive World Map**: Powered by Leaflet, allowing users to select cities and add custom memories.
- **Google OAuth Authentication**: Users can log in securely using their Google accounts.
- **Memory Storage**: Save descriptions of your travels to each city.
- **Dynamic UI**: Developed using React with CSS Modules for scoped and dynamic styling.
- **Fast Development Workflow**: Utilizes Vite for fast bundling and development server.

## Technologies Used ⚙️

- **React**: Component-based UI library for building interactive interfaces.
- **React-DOM**: Renders React components to the DOM.
- **Leaflet**: Interactive map library for adding, editing, and managing city markers on the map.
- **Vite**: Modern front-end build tool for blazing-fast development.
- **CSS Modules**: Scoped and modular CSS for styling components.
- **Google OAuth**: Authentication with Google using the `@react-oauth/google` package.

## Installation 🏁

To get started with this project, follow these steps:

1. **Clone the repository**:
 ```bash
 git clone https://github.com/your-username/world-map-tracker.git
```
2.	**Navigate to the project folder**:
```bash
cd world-map-tracker
```
3.	**Install dependencies**:

```bash
npm install
```

4.	**Install dependencies**:
Create a .env file in the root directory with the following environment variables:
```bash
VITE_APP_CLIENT_ID=your-google-oauth-client-id
```
Replace your-google-oauth-client-id with your actual Google OAuth Client ID.

5.	**Run the development server**:
```bash
npm run dev
```
6.	**Open the app**:
Open your browser and navigate to http://localhost:5173 to see the app in action.


## Usage 🚀
1.	Log in using your Google account to access the world map.
2.	Select a city on the map.
3.	Add a description or memory of your experience in that city.
4.	Save your city to keep track of your visited locations and memories.
5.	The app allows you to come back and see all the places you’ve visited even after you reload or log back in.


