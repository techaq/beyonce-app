import React, { useState, useEffect } from "react";
import "./index.css";
import Header from "./components/Header";
import TrackList from "./components/TrackList";
import Footer from "./components/Footer";

export default function MusicApp() {
  const apiKey = process.env.REACT_APP_API_KEY;

  const artist = "beyonce"; // Artist name for the API request
  const url = `http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=${artist}&api_key=${apiKey}&format=json`;

  const [tracks, setTracks] = useState([]);

  const getTracks = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.toptracks && data.toptracks.track) {
        setTracks(data.toptracks.track);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getTracks();
  }, []);

  const loaded = () => {
    return (
      <div>
        <h1>Beyoncé's Top Tracks</h1>
        <ul>
          {tracks.map((track, index) => (
            <li key={index}>{track.name}</li>
          ))}
        </ul>
      </div>
    );
  };

  const loading = () => {
    return <h1>Loading...</h1>;
  };

  return tracks.length > 0 ? loaded() : loading();
}
