import React, { useEffect, useState } from "react";
import "../assets/styles/note.css";
import Axios from "axios";

const Note = (props) => {
  const [noteState, setNote] = useState([]);

  //update the local state:
  const fetchData = () => {
    Axios.get("http://localhost:2000/noteData/").then((response) => {
      setNote(response.data);
    });
  };

  const noteChanged = (event) => {
    Axios.patch("http://localhost:2000/noteData/1", {
      note: event.target.value,
    }).then(() => {
      fetchData();
      //why not take the data directly from textarea?
    });
  };

  const renderNote = () => {
    return noteState[0].note;
    //for initial data of the note, so it's not an empty note every time refresh the app
  };

  //every time we reset the app, the local state will reset into the initial data
  //in order to display the recent data of the notes, we need to fetch the data from database into the local state
  //so the note can display the data from the local state
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="note">
      {noteState.length ? (
        <>
          <textarea
            onChange={noteChanged}
            placeholder="Write note here..."
            value={noteState[0].note}
          />
        </>
      ) : (
        <p>Loading</p>
      )}
    </div>
  );
};

export default Note;
