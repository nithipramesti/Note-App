import React, { useState, useEffect } from "react";
import "../assets/styles/note.css";
import Axios from "axios";

const Note = (props) => {
  const [noteState, editNote] = useState({
    noteData: [
      {
        note: "This is from local state",
      },
    ],
  });

  const fetchTodo = () => {
    Axios.get("http://localhost:2000/noteData").then((response) => {
      editNote({
        noteData: response.data,
      });
      alert(`document is fetched, note: ${noteState.noteData[0].note}`);
    });
  };

  const noteChanged = (event) => {
    // editNote({
    //   noteData: [{ ...noteState.noteData[0], note: event.target.value }],
    // });
    Axios.patch("http://localhost:2000/noteData/1", {
      note: event.target.value,
    }).then(() => {
      fetchTodo();
    });
  };

  const btn = () => {
    alert(`note: ${noteState.noteData[0].note}`);
    fetchTodo();
  };

  useEffect(() => {
    {
      console.log(`note: ${noteState.noteData[0].note}`);
      alert(`useEffect - note: ${noteState.noteData[0].note}`);
      fetchTodo();
    }
  }, []);

  const renderNote = () => {
    return noteState.noteData[0].note;
  };

  return (
    <div className="note">
      {/* <p>STATE: {noteData.note}</p> */}
      <textarea onChange={noteChanged} placeholder="Write note here...">
        {renderNote()}
      </textarea>
      <button onClick={btn}>Check note in Local State</button>
    </div>
  );
};

export default Note;
