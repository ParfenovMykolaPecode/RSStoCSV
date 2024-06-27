# RSS Feed Parser

This project is a simple RSS feed parser that allows users to enter an RSS/Atom URL, parse the feed, and optionally download the parsed data as a CSV file.

## Setup Instructions

### Prerequisites

Before you begin, ensure you have the following installed on your system:

- Node.js (v12.x or higher)
- npm (Node Package Manager) or yarn

### Getting Started

Clone the repository from GitHub:

git clone https://github.com/ParfenovMykolaPecode/RSStoCSV.git
cd RSStoCSV

### Backend Setup

Navigate to the server directory and install dependencies:

cd server
npm install

Start the Node.js server:

npm start

The server should now be running at http://localhost:3001.

### Frontend Setup

Open a new terminal window/tab.

Navigate to the client directory and install dependencies:

cd client 
npm install

Start the React development server

npm start

### Using the Application

Enter an RSS/Atom URL into the input field and click "Parse" to see the parsed feed data displayed.

Click "Download CSV" to download the parsed feed data as a CSV file (parsed_feed.csv).