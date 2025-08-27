![Wanderlist screenshot](<Screenshot 2025-06-22 at 10.21.38 PM.png>)

# Wanderlist

**Wanderlist** is a full-stack travel bucket list application built with the **MERN stack**. Users can sign up, log in, and keep track of the destinations they've visited or want to explore. The app also allows exploring trips shared by others, displayed on a world map.

## Features

- **User Authentication**: Secure login with JWT authentication
- **CRUD Functionality**: Create, read, update, and delete (CRUD) trips
- **Trip Details**: Add tags, descriptions, and images to destinations
- **Explore Page**: A public page to explore trips shared by others
- **Responsive UI**: A mobile-friendly and clean interface
- **Background Imagery**: Beautiful travel-themed backgrounds sourced from [Unsplash](https://unsplash.com/)
- **Trip Types**: Add Tags for trips (e.g., adventure, beach, city, historical) to help users organize and filter their destinations.
- **Trip Plans**: Let users specify whether a trip is in the **"Planned"**, **"Visited"**, phase.


## Stretch Goals

To further enhance the functionality and user experience of **Wanderlist**, here are some **stretch goals** to consider implementing:

### 1. **Map Integration**:
   - **World Map Display**: Integrate a map (such as Google Maps or Mapbox) to visually display destinations users have visited or plan to visit.
   - **Geolocation**: Allow users to add their current location automatically using the browser’s geolocation API.
  

### 2. **User Interactions**:
   - **Comments**: Allow users to comment on other users' trips in the Explore page.
   - **Likes and Ratings**: Let users like or rate trips shared by others to encourage engagement.
   - **Follow Users**: Users can follow other users and see their updates in the feed.
   - **Search Functionality**: Search for trips by location, name, or tags
   - **User Profile**: Ability for users to view their saved trips in a profile page   

### 3. **Trip Sharing & Social Features**:
   - **Share to Social Media**: Allow users to share their travel destinations or bucket list trips on social media platforms.
   - **Friend System**: Implement a friend system where users can connect with others and share trips privately.

### 4. **Trip Recommendations**:
   - **AI-based Recommendations**: Suggest destinations based on user interests or previous trips (e.g., similar destinations, location-based recommendations).
   - **Popular Trips**: Show a list of the most popular or highly-rated destinations in the Explore page.

### 5. **Advanced Search & Filters**:
   - **Search by Tags**: Allow users to search trips by tags, making it easier to explore trips by type or interest.
   - **Filter by Travel Dates**: Add an option to filter trips based on travel dates or when the trip was added.

### 6. **User Settings & Profile Customization**:
   - **Profile Customization**: Let users customize their profiles with avatars, bios, and social media links.
   - **Dark Mode**: Implement a dark mode for users who prefer a darker interface.
   - **Email Notifications**: Send email notifications to users when someone comments on or likes their trips.


## Tech Stack

### Frontend
- **React**: For building the user interface
- **React Router**: For client-side routing
- **Fetch API**: For making HTTP requests to the backend
- **CSS**: For styling the application
- **Vite**: For fast and modern frontend development

### Backend
- **Node.js**: JavaScript runtime for the backend
- **Express**: Web framework for Node.js
- **MongoDB + Mongoose**: NoSQL database for storing trips and user data
- **JWT (JSON Web Token)**: For user authentication and authorization
- **Dotenv**: For managing environment variables

