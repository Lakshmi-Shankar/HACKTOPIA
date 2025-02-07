/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import debounce from "lodash.debounce";

const API_URL = "https://api.promptrepo.com/api/private/Bookdata";
const API_KEY = "74822403ee7d4965a11242e22bffddbe";

const cache = {}; // In-memory cache for search results

const HomePage = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Function to fetch books from PromptRepo API
  const fetchBooks = async (searchQuery) => {
    if (!searchQuery.trim()) return;

    if (cache[searchQuery]) {
      setResults(cache[searchQuery]);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        API_URL,
        [{ "Book Name": searchQuery }],
        {
          headers: {
            "Content-Type": "application/json",
            "x-api-key": API_KEY,
          },
        }
      );

      const books = response.data;
      
      // Fetch images for each book
      const booksWithImages = await Promise.all(
        books.map(async (book) => {
          const imgUrl = await fetchBookImage(book["Book Name"]);
          return { ...book, imgUrl };
        })
      );

      cache[searchQuery] = booksWithImages; // Store in cache
      setResults(booksWithImages);
    } catch (err) {
      setError("Error fetching search results. Try again later.");
      console.error("API Error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch book images from Open Library API
  const fetchBookImage = async (bookName) => {
    try {
      const response = await axios.get(
        `https://openlibrary.org/search.json?title=${encodeURIComponent(bookName)}`
      );
      const bookData = response.data.docs[0]; // Get the first match
  
      if (bookData && bookData.cover_i) {
        return `https://covers.openlibrary.org/b/id/${bookData.cover_i}-M.jpg`;
      }
  
      // Second Attempt: Fetch image using ISBN (if available)
      if (bookData && bookData.isbn) {
        return `https://covers.openlibrary.org/b/isbn/${bookData.isbn[0]}-M.jpg`;
      }
  
    } catch (err) {
      console.error("Error fetching book image:", err);
    }
  
    return "https://via.placeholder.com/128x192?text=No+Image"; // Default image
  };
  

  // Debounce function to reduce API calls
  const debouncedSearch = useCallback(debounce((q) => fetchBooks(q), 500), []);

  useEffect(() => {
    debouncedSearch(query);
    return () => debouncedSearch.cancel();
  }, [query]);

  return (
    <div className="mainHome">
      <div className="Title">
        <h1>READORA</h1>
        <nav>
          
        </nav>
      </div>
      <div style={{ padding: "20px", textAlign: "center" }}>
        <input
          type="text"
          placeholder="Search for a book..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ padding: "10px", width: "300px", marginBottom: "10px" }}
        />

        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
          {results.map((book, index) => (
            <div key={index} style={{ border: "1px solid #ddd", padding: "10px", width: "200px", textAlign: "center" }}>
              <img src={book.imgUrl} alt={book["Book Name"]} style={{ width: "128px", height: "192px", objectFit: "cover" }} />
              <h3>{book["Book Name"]}</h3>
              <p><strong>Genre:</strong> {book["Genre"]}</p>
              <p><strong>Author:</strong> {book["Author"] || "Unknown"}</p>
              <p><strong>Rating:</strong> {book["Rating"] || "N/A"}</p>
            </div>
          ))}
        </div>

        {!loading && results.length === 0 && query && <p>No books found.</p>}
      </div>
    </div>
  );
};

export default HomePage;
