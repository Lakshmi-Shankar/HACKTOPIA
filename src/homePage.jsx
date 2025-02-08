/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const GOOGLE_API_KEY = "AIzaSyA0FABOYK_UZK-arNuEgMfOPW1X6qa2anE";

function BookSearch({ onSelectBook }) {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [randomBooks, setRandomBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchRandomBooks(); // Fetch books on component mount
  }, []);

  const fetchRandomBooks = async () => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=fiction&maxResults=10&key=${GOOGLE_API_KEY}`
      );
      const data = await response.json();
      setRandomBooks(data.items || []);
    } catch (error) {
      console.error("Error fetching random books:", error);
    }
  };

  const searchBooks = async () => {
    if (!query) return;
    setLoading(true);

    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=10&key=${GOOGLE_API_KEY}`
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
      <h2>Readora</h2><br /><br /><br />
      <hr /><br />
      <nav className="navbar">
        <div>|</div>
        <div className="opts">
          <Link to={"/blindDate"} className="opt">Blind Date</Link>
        </div>
        <div>|</div>
        <div className="opts">
          <Link to={"/bookAni"} className="opt">Book Animation</Link>
        </div>
        <div>|</div>
        <div className="opts">
          <Link to={"/audioBook"} className="opt">Audio Book</Link>
        </div>
        <div>|</div>
      </nav>
      <br />
      <hr />
      <br /><br /><br />

      {/* Search Input */}
      <input
        type="text"
        placeholder="Enter book title..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={searchBooks} disabled={loading}>
        {loading ? "Searching..." : "Search"}
      </button>

      {/* Search Results */}
      <div className="book-results">
        {books.map((book) => {
          const { title, authors, imageLinks } = book.volumeInfo;
          const thumbnail = imageLinks?.thumbnail || "https://via.placeholder.com/128x192?text=No+Image";

          return (
            <div key={book.id} className="book-item">
              <img src={thumbnail} alt={title} className="book-cover" />
              <h3>{title}</h3>
              <p>Author: {authors?.join(", ") || "Unknown"}</p>
              <button onClick={() => onSelectBook(title)}>Find Nearby Bookstores</button>
            </div>
          );
        })}
      </div>

      {/* Random Books Section */}
      <h2 className="random-books-title">📚 Discover Books</h2>
      <div className="book-results">
        {randomBooks.map((book) => {
          const { title, authors, imageLinks } = book.volumeInfo;
          const thumbnail = imageLinks?.thumbnail || "https://via.placeholder.com/128x192?text=No+Image";

          return (
            <div key={book.id} className="book-item">
              <img src={thumbnail} alt={title} className="book-cover" />
              <h3>{title}</h3>
              <p>Author: {authors?.join(", ") || "Unknown"}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default BookSearch;
