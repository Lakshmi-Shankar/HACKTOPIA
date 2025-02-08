/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const GOOGLE_API_KEY = "AIzaSyA0FABOYK_UZK-arNuEgMfOPW1X6qa2anE";

function BookSearch({ onSelectBook }) {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [randomBooks, setRandomBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState(null); // Track selected book for embedding

  useEffect(() => {
    fetchRandomBooks(); // Fetch random books on component mount
  }, []);

  const fetchRandomBooks = async () => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=fiction&maxResults=10&key=${GOOGLE_API_KEY}`
      );
      const data = await response.json();

      console.log("Random Books API Response:", data); // Debugging API Response

      if (data.items && Array.isArray(data.items)) {
        setRandomBooks(data.items);
      } else {
        setRandomBooks([]); // Set empty if no books are found
      }
    } catch (error) {
      console.error("Error fetching random books:", error);
      setRandomBooks([]); // Prevent UI from breaking
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
      <h2>Readora</h2>
      <br />
      <hr />
      <br />
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
          const { title, authors, imageLinks, previewLink } = book.volumeInfo;
          const thumbnail = imageLinks?.thumbnail || "https://via.placeholder.com/128x192?text=No+Image";
          const bookId = book.id;

          return (
            <div key={book.id} className="book-item">
              <img src={thumbnail} alt={title} className="book-cover" />
              <h3>{title}</h3>
              <p>Author: {authors?.join(", ") || "Unknown"}</p>
              <button onClick={() => onSelectBook(title)}>Find Nearby Bookstores</button>
              {previewLink && (
                <button onClick={() => setSelectedBookId(bookId)}>Read Me</button>
              )}
            </div>
          );
        })}
      </div>

      {/* Random Books Section */}
      <h2 className="random-books-title">📚 Discover Books</h2>
      {randomBooks.length === 0 ? (
        <p>No random books found. Try searching for a book!</p>
      ) : (
        <div className="book-results">
          {randomBooks.map((book) => {
            const { title, authors, imageLinks, previewLink } = book.volumeInfo;
            const thumbnail = imageLinks?.thumbnail || "https://via.placeholder.com/128x192?text=No+Image";
            const bookId = book.id;

            return (
              <div key={book.id} className="book-item">
                <img src={thumbnail} alt={title} className="book-cover" />
                <h3>{title}</h3>
                <p>Author: {authors?.join(", ") || "Unknown"}</p>
                {previewLink && (
                  <button onClick={() => setSelectedBookId(bookId)}>Read Me</button>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Embedded eBook Viewer */}
      {selectedBookId && (
        <div className="book-viewer">
          <h2>📖 Now Reading</h2>
          <iframe
            src={`https://books.google.com/books?id=${selectedBookId}&printsec=frontcover&output=embed`}
            width="600"
            height="500"
            allowFullScreen
          ></iframe>
          <button onClick={() => setSelectedBookId(null)}>Close Book</button>
        </div>
      )}
    </div>
  );
}

export default BookSearch;
