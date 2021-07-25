import React, { useState } from "react";
import "./assets/styles/app.css";
import Note from "./components/Note";

function App() {
  return (
    <div className="app">
      <h1>Notes</h1>
      <div className="notes-container">
        <Note />
      </div>
    </div>
  );
}

export default App;
