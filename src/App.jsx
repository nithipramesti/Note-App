import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./assets/styles/app.css";
import Note from "./components/Note";

function App() {
  const [noteState, setNoteState] = useState([]);
  const [showColor, setShowColor] = useState(false);

  //update the local state:
  const fetchData = () => {
    Axios.get("http://localhost:2000/noteData/").then((response) => {
      setNoteState(response.data);
      // alert(
      //   `data is fetched, note data:${response.data[0].note}, ${response.data[1].note}, ${response.data[2].note}, ${response.data[3].note},${response.data[0].note}`
      // );
    });
  };

  const renderNotes = () => {
    return noteState.map((val) => {
      return <Note key={val.id} noteData={val} fetchData={fetchData} />;
    });
  };

  // const noteColors = ["yellow", "orange", "black", "green"];
  const noteColors = {
    yellow: "#FDD082",
    orange: "#FDA57F",
    purple: "#BE9DFE",
    green: "#E7F09B",
  };

  const addNote = (color) => {
    Axios.post("http://localhost:2000/noteData/", {
      note: "",
      color: noteColors[color],
    })
      .then((res) => {
        fetchData();
      })
      .catch((err) => {
        console.log(err);
      });
    setShowColor(false);
    // console.log(document.querySelector("Note"));
  };

  const showColorNote = () => {
    showColor ? setShowColor(false) : setShowColor(true);
  };

  const renderAddNoteColor = () => {
    return Object.keys(noteColors).map((color) => {
      return (
        <div
          id={color}
          onClick={() => addNote(color)}
          style={{ backgroundColor: noteColors[color] }}
        ></div>
      );
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="app">
      <h1>Notes</h1>
      <div className="add-container">
        <button id="button-add" onClick={showColorNote}>
          +
        </button>
        <div className="note-color-container">
          {showColor ? renderAddNoteColor() : null}
        </div>
      </div>
      <div className="notes-container">
        {noteState.length ? renderNotes() : <p>Loading...</p>}
      </div>
    </div>
  );
}

export default App;
