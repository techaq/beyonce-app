import React, { useState, useEffect } from "react";

function MusicApp() {
  const [artistName, setArtistName] = useState("");
  const [artistOptions, setArtistOptions] = useState([]);
  const [trackData, setTrackData] = useState([]);
  const [searching, setSearching] = useState(false);

  const handleSearchClick = () => {
    if (artistName.trim() !== "") {
      setSearching(true);
    }
  };

  const fetchTopTracks = (artistName) => {
    fetch(
      `http://ws.audioscrobbler.com/2.0/?method=artist.getTopTracks&artist=${artistName}&api_key=5c4af263893f04cb0df26a7aebf93dcb&format=json`
    )
      .then((response) => response.json())
      .then((data) => {
        setTrackData(data.toptracks.track);
      })
      .catch((error) => console.error("Error fetching top tracks:", error));
  };

  useEffect(() => {
    if (searching) {
      fetch(
        `http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${artistName}&api_key=5c4af263893f04cb0df26a7aebf93dcb&format=json`
      )
        .then((response) => response.json())
        .then((data) => {
          if (
            data.results &&
            data.results.artistmatches &&
            data.results.artistmatches.artist
          ) {
            setArtistOptions(data.results.artistmatches.artist);
          } else {
            setArtistOptions([]);
          }
        })
        .catch((error) => console.error("Error fetching data:", error))
        .finally(() => {
          setSearching(false);
        });
    }
  }, [searching, artistName]);

  return (
    <div className="music-app">
      <h1>Artist Top Tracks</h1>
      <div className="search-container">
        <div className="artist-dropdown">
          <input
            type="text"
            placeholder="Enter artist name"
            value={artistName}
            onChange={(e) => {
              setArtistName(e.target.value);
              setArtistOptions([]); // Clear artist options when typing
            }}
          />
          {artistOptions.length > 0 && !searching && (
            <ul className="artist-options">
              {artistOptions.map((artist, index) => (
                <li
                  key={index}
                  onClick={() => {
                    setArtistName(artist.name);
                    setArtistOptions([]);
                    fetchTopTracks(artist.name);
                  }}
                >
                  {artist.name}
                </li>
              ))}
            </ul>
          )}
        </div>
        <button onClick={handleSearchClick}>Search</button>
      </div>
      {trackData.length > 0 ? (
        <div>
          <h2>Top Tracks for {artistName}</h2>
          <ul className="track-list">
            {trackData.map((track, index) => (
              <li key={index}>{track.name}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p>
          {searching
            ? "Searching..."
            : "No top tracks available for this artist."}
        </p>
      )}
    </div>
  );
}

export default MusicApp;
