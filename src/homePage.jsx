/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";

const GOOGLE_API_KEY = "AIzaSyA0FABOYK_UZK-arNuEgMfOPW1X6qa2anE";

function BookSearch({ onSelectBook }) {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchBooks = async () => {
    if (!query) return;
    setLoading(true);

    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${GOOGLE_API_KEY}`
      );
      const data = await response.json();
      setBooks(data.items || []);
    } catch (error) {
      console.error("Error fetching books:", error);
    }

    setLoading(false);
  };

  return (
    <div className="book-search">
      <input
        type="text"
        placeholder="Enter book title..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={searchBooks} disabled={loading}>
        {loading ? "Searching..." : "Search"}
      </button>

      <div className="book-results">
        {books.map((book) => {
          const { title, authors, imageLinks } = book.volumeInfo;
          const thumbnail = imageLinks?.thumbnail || "https://via.placeholder.com/128x192?text=No+Image";

          return (
            <div key={book.id} className="book-item">
              <img src={thumbnail} alt={title} className="book-cover" />
              <h3>{title}</h3>
              <p>Author: {authors?.join(", ") || "Unknown"}</p>
              <button onClick={() => onSelectBook(title)} >
                Find Nearby Bookstores
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default BookSearch;