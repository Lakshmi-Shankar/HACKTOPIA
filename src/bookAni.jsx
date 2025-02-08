/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
const YOUTUBE_API_KEY = "AIzaSyDaZNuazHgyRmb1IzrLnJ1N0GRaQE9jXPk"; // Replace with your YouTube API Key


function BookAni() {
  const [query, setQuery] = useState("");
  const [videos, setVideos] = useState([]);
  const [selectedVideoId, setSelectedVideoId] = useState(null);
  const [error, setError] = useState(null);

  // Fetch default book-related videos on page load
  useEffect(() => {
    fetchVideos("book animation");
  }, []);

  // Fetch videos from YouTube API
  const fetchVideos = async (searchQuery) => {
    try {
      setError(null);
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchQuery}&maxResults=10&type=video&key=${YOUTUBE_API_KEY}`
      );
      const data = await response.json();

      if (data.items) {
        setVideos(data.items);
      } else {
        setError("No videos found. Try a different search.");
        setVideos([]);
      }
    } catch (error) {
      setError("Error fetching videos. Please try again later.");
      console.error("Error fetching videos:", error);
    }
  };

  return (
    <div className="video-search">
      <h2>📚 Animated Book Explorer</h2>

      {/* Search Input */}
      <div className="search-box">
        <input
          type="text"
          placeholder="Search for book animations..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={() => fetchVideos(query || "book animation")}>Search</button>
      </div>

      {/* Error Message */}
      {error && <p className="error-message">{error}</p>}

      {/* Video Results */}
      <div className="video-results">
        {videos.map((video) => {
          const { videoId } = video.id;
          const { title, thumbnails } = video.snippet;
          return (
            <div key={videoId} className="video-item">
              <img src={thumbnails.medium.url} alt={title} className="video-thumbnail" />
              <h3>{title}</h3>
              <button onClick={() => setSelectedVideoId(videoId)}>Watch</button>
            </div>
          );
        })}
      </div>

      {/* Video Player */}
      {selectedVideoId && (
        <div className="video-player">
          <h2>📺 Now Watching</h2>
          <iframe 
            src={`https://www.youtube-nocookie.com/embed/${selectedVideoId}`} 
            width="600"
            height="350"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            ></iframe>

          <button onClick={() => setSelectedVideoId(null)}>Close Video</button>
        </div>
      )}
    </div>
  );
}

export default BookAni;
