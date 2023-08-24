import React, { useState, useEffect } from "react";

function MusicApp() {
  const [artistName, setArtistName] = useState("");
  const [trackData, setTrackData] = useState([]);

  useEffect(() => {
    if (artistName.trim() !== "") {
      fetch(
        `http://ws.audioscrobbler.com/2.0/?method=artist.getInfo&artist=${artistName}&api_key=YOUR_API_KEY&format=json`
      )
        .then((response) => response.json())
        .then((data) => {
          if (
            data.results &&
            data.results.artistmatches &&
            data.results.artistmatches.artist
          ) {
            const artist = data.results.artistmatches.artist[0];
            fetch(
              `http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=${artist.name}&api_key=YOUR_API_KEY&format=json`
            )
              .then((response) => response.json())
              .then((data) => setTrackData(data.toptracks.track))
              .catch((error) => console.error("Error fetching data:", error));
          }
        })
        .catch((error) => console.error("Error fetching data:", error));
    }
  }, [artistName]);

  return (
    <div className="music-app">
      <h1>Artist Top Tracks</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Enter artist name"
          value={artistName}
          onChange={(e) => setArtistName(e.target.value)}
        />
      </div>
      <ul className="track-list">
        {trackData.map((track, index) => (
          <li key={index}>{track.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default MusicApp;
