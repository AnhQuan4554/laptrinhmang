import logo from "./logo.svg";
import "./App.css";
import React from "react";
import DrawerMusic from "./components/DrawerMusic";
import ReactAudioPlayer from "react-audio-player";
function App() {
  return (
    <div>
      <DrawerMusic />
      {/* <ReactAudioPlayer src="./mp3/neulaanh.mp3" autoPlay controls /> */}
    </div>
  );
}

export default App;
