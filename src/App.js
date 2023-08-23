import React, { useState, useEffect } from "react";
import "./App.css";

function MusicApp() {
  const [trackData, setTrackData] = useState([]);

  useEffect(() => {
    fetch(
      "http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=beyonce&api_key=YOUR_API_KEY&format=json"
    )
      .then((response) => response.json())
      .then((data) => {
        if (
          data.results &&
          data.results.artistmatches &&
          data.results.artistmatches.artist
        ) {
          // Assuming there's only one artist result
          const artist = data.results.artistmatches.artist[0];
          // Now fetch top tracks for this artist
          fetch(
            `http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=${artist.name}&api_key=YOUR_API_KEY&format=json`
          )
            .then((response) => response.json())
            .then((data) => setTrackData(data.toptracks.track))
            .catch((error) => console.error("Error fetching data:", error));
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div>
      <h1>Beyoncé's Top Tracks</h1>
      <ul>
        {trackData.map((track, index) => (
          <li key={index}>{track.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default MusicApp;
