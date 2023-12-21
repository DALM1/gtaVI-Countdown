import React from "react";
import Countdown from "../component/Countdown";
import logo from "../assets/_logo.png";

function Main() {
  return (
    <div>
      <a
        href="https://www.rockstargames.com/fr/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={logo} alt="" />
      </a>

      <Countdown className="Countdown" futureDate="2025-04-04T00:00:00" />

      <iframe
        className="iframe"
        width="560"
        height="315"
        src="https://www.youtube.com/embed/QdBZY2fkU-0"
        title="GTA VI Trailer"
        frameBorder="0"
        allowFullScreen
      ></iframe>
    </div>
  );
}

export default Main;
