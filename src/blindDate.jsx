// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import "./App.css"; // Import the new CSS file for styling

function BlindDate() {
  const [book, setBook] = useState(null);
  const [isReading, setIsReading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [lastGenre, setLastGenre] = useState(null);

  const genreHints = {
    Fiction: [
      "A narrative woven with secrets and untold truths...",
      "A tale that bends reality and challenges perception...",
      "Characters and stories that blur the line between fact and fiction..."
    ],
    Mystery: [
      "Every page holds a secret, will you uncover it?",
      "A labyrinth of clues leading to an unexpected revelation...",
      "Detectives, secrets, and an enigma waiting to be solved..."
    ],
    Fantasy: [
      "Step into a realm where magic and mystery intertwine...",
      "A world beyond imagination, where myths come to life...",
      "A battle between light and darkness unfolds in this tale of wonder..."
    ],
    Horror: [
      "A shadow lurks within these pages... dare to turn them?",
      "Terror seeps through the ink, chilling every word...",
      "A haunting tale that will keep you awake at night..."
    ]
  };

  const getHintByGenre = (genre) => {
    const hints = genreHints[genre];
    return hints[Math.floor(Math.random() * hints.length)];
  };

  const getRandomGenre = () => {
    const genres = Object.keys(genreHints);
    let newGenre = genres[Math.floor(Math.random() * genres.length)];

    while (newGenre === lastGenre) {
      newGenre = genres[Math.floor(Math.random() * genres.length)];
    }

    setLastGenre(newGenre);
    return newGenre;
  };

  const getRandomBook = async () => {
    setLoading(true);
    try {
      const genre = getRandomGenre();

      setBook({
        genre,
        hint: getHintByGenre(genre)
      });

      setIsReading(false);
    } catch (error) {
      console.error("Error fetching book:", error);
    }
    setLoading(false);
  };

  const startReading = () => {
    setIsReading(true);
  };

  return (
    <div className="blind-date-container">
      <h1 className="title_b">📚 Blind Date with a Book</h1>
      <p className="subtitle">Discover a surprise book based on a hidden clue!</p>

      <button className="blind-date-btn" onClick={getRandomBook} disabled={loading}>
        {loading ? "Finding Your Mystery Book..." : "🎲 Blind Date"}
      </button>

      {book && !isReading && (
        <div className="book-card">
          <h2 className="mystery-title">🔍 A Journey Into the Unknown:</h2>
          <p className="book-hint">{book.hint}</p>
          <button className="read-btn" onClick={startReading}>📖 Reveal Book</button>
        </div>
      )}

      {isReading && book && (
        <div className="book-card">
          <h2 className="book-title">📖 Your Mystery Book:</h2>
          <p className="book-summary">A captivating {book.genre} story awaits you...</p>
          <button className="enjoy-btn" onClick={() => alert("Enjoy your reading!")}>✔ Enjoy!</button>
        </div>
      )}
      
    </div>
  );
}

export default BlindDate;
