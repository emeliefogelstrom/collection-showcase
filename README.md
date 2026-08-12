# Collection Showcase

A full-stack web application for showcasing a curated collection online. Originally built to display sports memorabilia, the app is designed to be generic — it can be adapted to present any kind of collection: vintage prams, vinyl records, stamps, model trains, and more.

## Features

- 🖼️ Browse collection items with images, descriptions, and categorization
- 🔍 Search and filter items by category and decade/era
- 🌍 Multi-language support (English / Norwegian)
- 🔐 Admin authentication for managing content
- ➕ Admin panel to add, edit, and remove items and categories
- 📄 Pagination for browsing large collections
- 📱 Responsive design

## Tech Stack

**Frontend**
- React 18
- Vite
- Tailwind CSS
- React Router
- Axios
- i18next (internationalization)

**Backend**
- Node.js / Express
- MongoDB with Mongoose
- JWT-based authentication
- Local image storage with Jimp for image processing

## Project Structure

collection-showcase/
├── client/ # React frontend (Vite)
└── server/ # Express backend API


## Getting Started

### Prerequisites

- Node.js (v18 or later recommended)
- A MongoDB database (local or [MongoDB Atlas](https://www.mongodb.com/atlas))

### Installation

1. Clone the repository
```bash
   git clone https://github.com/emeliefogelstrom/collection-showcase.git
   cd collection-showcase
```

2. Install server dependencies
```bash
   cd server
   npm install
```

3. Install client dependencies
```bash
   cd ../client
   npm install
```

### Environment Variables

**server/.env**

MONGODB_URL=your_mongodb_connection_string
PORT=4000


**client/.env**

VITE_API_URL=http://localhost:4000/api


### Running Locally

Start the backend:
```bash
cd server
npm start
```

Start the frontend (in a separate terminal):
```bash
cd client
npm run dev
```

The app will be available at `http://localhost:3000` (or the port Vite assigns).

## Admin Access

Admin accounts are not created through the public UI for security reasons. See `server/scripts/` for the admin creation script.

## License

Apache-2.0