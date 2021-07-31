import React, { useState, useEffect } from "react";
import Axios from "axios";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import rootReducer from "./redux/reducers";

import "./assets/styles/app.css";
import Note from "./components/Note";

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

function App() {
  const [noteState, setNote] = useState([]);

  //update the local state:
  const fetchData = () => {
    Axios.get("http://localhost:2000/noteData/").then((response) => {
      setNote(response.data);
      alert(`data is fetched, 2nd note data:${response.data[1].note}`);
    });
  };

  const renderNotes = () => {
    return noteState.map((val) => {
      return <Note noteData={val.note} />;
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Provider store={store}>
      <div className="app">
        <h1>Notes</h1>
        <button>Add</button>
        <div className="notes-container">
          {noteState.length ? renderNotes() : <p>Loading...</p>}
        </div>
      </div>
    </Provider>
  );
}

export default App;
