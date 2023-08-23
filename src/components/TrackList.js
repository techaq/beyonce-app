import React from "react";
import "../index.css";

function TrackList({ tracks }) {
  return (
    <div className="track-list">
      <ul>
        {tracks.map((track, index) => (
          <li key={index}>{track.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default TrackList;
