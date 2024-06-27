import React from 'react';
import './App.css'; // Підключення стилів, якщо є
import FeedParser from './components/FeedParser';

function App() {
  return (
    <div className="App">
      <h1>Розбір RSS/Atom та генерація CSV</h1>
      <FeedParser />
    </div>
  );
}

export default App;
