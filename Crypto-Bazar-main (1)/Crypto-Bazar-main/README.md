# Crypto-Bazar

Crypto-Bazar is a cryptocurrency learning and visualization platform that provides users with real-time information about various cryptocurrencies, their market trends, and educational resources.

## Features

- Real-time cryptocurrency data visualization
- Interactive coin table with pagination
- Detailed information pages for individual cryptocurrencies
- User authentication system
- AI-powered query system for cryptocurrency-related questions

## Tech Stack

### Frontend
- React.js
- Axios for API requests
- React Router for navigation
- Tailwind CSS for styling
- Chart.js for data visualization

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose for database management
- JSON Web Tokens (JWT) for authentication
- Google's Generative AI for handling user queries

## Getting Started

### Prerequisites
- Node.js
- npm or yarn
- MongoDB

### Installation

1. Clone the repository:
  ```bash
       git clone https://github.com/priyanshu-gupta07/crypto-bazar.git
       cd crypto-bazar
```   
2. Install server dependencies:
```bash
cd Server
npm install
```
4. Install client dependencies:
```bash
cd ../Client/crypto-bazar
npm install
```
5. Create a .env file in the Server directory and add the following:
```Text
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_KEY=your_google_generative_ai_key
```
6. Start the Server:
```bash
cd ../../Server
npm start
```
7. Start the client:
```bash
cd ../Client/crypto-bazar
npm start
```
The application should now be running on http://localhost:3000.

## Project Structure

- /Client/crypto-bazar: Contains the React frontend application
- /Server: Contains the Node.js backend application

### Key Files

- Client/crypto-bazar/src/App.js: Main React component and routing setup
- Client/crypto-bazar/src/pages: React components for different pages
- Client/crypto-bazar/src/components: Reusable React components
- Server/index.js: Entry point for the backend server
- Server/controllers: Backend route handlers
- Server/models: MongoDB schema definitions

## Deployment

The server is configured for deployment on Vercel. The vercel.json file in the Server directory provides the necessary configuration.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
