Loner

Overview

Loner is a React application that helps you find hikes within a specified radius of a search location and provides historic foot traffic data along with current busyness, weather data and user reviews. Since it was not easily available, all foot traffic data is synthesized by the server-side using weighted arrays & appended to each hike object returned to the frontend. Loner utilizes the following APIs: Google Maps JavaScript API, Weather API, and Auth0. The application was built using MongoDB, Express, React and Node.js.

Features

Hike Search: Search for hikes by specifying a location and a radius. Loner will display a list of available hikes within the defined area. The user is able to sort the results by current busyness, length of drive to the trailhead and rating.

Historic and Current Foot Traffic Data: Loner provides foot traffic data for each hike, helping you plan the best time your hiking adventure based on past usage.

Weather Information: Get up-to-date weather information for the selected hiking location to ensure you're prepared for your outdoor adventure. This includes temp, realfeel temp, expected precipitation, humidity, wind speed and uv index.

User Reviews: Read what other hikers have to say about each hike.

User Authentication: Loner uses Auth0 for user authentication, allowing you to create an account, log in, and save/delete your favorite hikes for future reference.

Technologies Used

 - React
 - MongoDB
 - Express
 - Node.js
 - Google Maps JavaScript API
 - Weather API
 - Auth0
