/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const YOUTUBE_API_KEY = "AIzaSyDaZNuazHgyRmb1IzrLnJ1N0GRaQE9jXPk"; // Replace with your YouTube API Key

function AudioBook() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const initialQuery = params.get("query") || "";

  const [query, setQuery] = useState(initialQuery);
  const [audioBooks, setAudioBooks] = useState([]);
  const [selectedAudioId, setSelectedAudioId] = useState(null);

  useEffect(() => {
    if (query) {
      searchAudioBooks(query);
    }
  }, [query]);

  const searchAudioBooks = async (searchTerm) => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchTerm}+audiobook&maxResults=10&type=video&key=${YOUTUBE_API_KEY}`
      );
      const data = await response.json();
      setAudioBooks(data.items || []);
    } catch (error) {
      console.error("Error fetching audiobooks:", error);
    }
  };

  return (
    <div className="audio-search">
      <h2>🎧 Audiobook Explorer</h2>

      {/* Audio Results */}
      <div className="audio-results">
        {audioBooks.map((audio) => {
          const { videoId } = audio.id;
          const { title, thumbnails } = audio.snippet;
          return (
            <div key={videoId} className="audio-item">
              <img src={thumbnails.medium.url} alt={title} className="audio-thumbnail" />
              <h3>{title}</h3>
              <button onClick={() => setSelectedAudioId(videoId)}>Listen</button>
            </div>
          );
        })}
      </div>

      {/* Audio Player */}
      {selectedAudioId && (
        <div className="audio-player">
          <h2>🎶 Now Playing</h2>
          <iframe
            width="600"
            height="350"
            src={`https://www.youtube-nocookie.com/embed/${selectedAudioId}`}
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <button onClick={() => setSelectedAudioId(null)}>Close Audio</button>
        </div>
      )}
    </div>
  );
}

export default AudioBook;
