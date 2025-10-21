# My GoodBuy
## Project title and description
My GoodBuy is a simple and efficient React web application designed to help users track and manage quality products they've purchased from various stores. The application provides a seamless interface for core CRUD (Create, Read, Update, Delete) operations, ensuring users can easily maintain a record of their favorite items, including photos and key purchase details.

The app is built using React for a dynamic front-end experience and relies on Firebase for secure, cloud-synced data persistence.

## Technologies and Dependencies
This project relies on the following key dependencies:

Core Frameworks
* React: For building the component-based user interface.
* React Router DOM: For handling client-side routing and navigation.

For UI and Styling
* styled-components
* react-icon

Data and Backend
* firebaseis used to provide the backend infrastructure for data storage and file uploads.

## Installation and Local Setup
Follow these steps to get a local copy of the project running on your development machine.

Steps
1. Clone the Repository:
git clone 
cd my-goodbuy

2. Install Dependencies
npm install

3. Configure Firebase Credentials: (See API Connection details below.)

4. Run the Application:
npm start

## API Connection and Credentials
This application connects to Google Firebase for all backend services. You must create your own Firebase project in the Google Firebase Console to run the app locally and securely isolate your data.

Configuration (.env File)
Create a file named .env in the root directory of the project and populate it with your unique project configuration:

REACT_APP_FIREBASE_API_KEY="YOUR_API_KEY"
REACT_APP_FIREBASE_AUTH_DOMAIN="YOUR_AUTH_DOMAIN"
REACT_APP_FIREBASE_PROJECT_ID="YOUR_PROJECT_ID"
REACT_APP_FIREBASE_STORAGE_BUCKET="YOUR_STORAGE_BUCKET"
REACT_APP_FIREBASE_MESSAGING_SENDER_ID="YOUR_MESSAGING_SENDER_ID"
REACT_APP_FIREBASE_APP_ID="YOUR_APP_ID"
Security Note: Ensure your Firebase Security Rules are configured to allow data reads, writes, and image uploads from your development environment. Do not share your real API keys publicly.


