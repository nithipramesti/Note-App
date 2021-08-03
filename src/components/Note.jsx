import React, { useEffect, useState } from "react";
import "../assets/styles/note.css";
import Axios from "axios";

import { useSelector, useDispatch } from "react-redux";

const Note = (props) => {
  const [noteId, setNoteId] = useState(0);

  const globalState = useSelector((state) => state);
  const dispatch = useDispatch();

  const noteChanged = (event) => {
    Axios.patch(`http://localhost:2000/noteData/${props.noteData.id}`, {
      note: event.target.value,
    });
  };

  const deleteNote = () => {
    Axios.delete(`http://localhost:2000/noteData/${props.noteData.id}`).then(
      () => props.fetchData()
    );
  };

  return (
    <div className="note" style={{ backgroundColor: props.noteData.color }}>
      <textarea onChange={noteChanged} placeholder="Write note here...">
        {props.noteData.note}
      </textarea>
      <button id="button-delete" onClick={deleteNote}>
        <ion-icon name="trash-outline"></ion-icon>
      </button>
    </div>
  );
};

export default Note;
