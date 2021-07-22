// First we didn't realize that there was a different console for the extension and for the main page
// We also didn't realize that the extensino can't modify localStorage (switch to the chrome storage)
// Pushing everything into the array—difficult to access the property of the object that we need to modify.

import React, { useState } from "react";
import "./App.css";
import TextArea from "./TextArea.js";
import Notes from "./Notes";
import {
  getUrl,
  getChromeStorageForClipNotes,
  setStateOfCurrentUrl,
  getStateOfCurrentUrl,
} from "./util";

function App() {
  const [notes, setNotes] = useState([]);
  React.useEffect(() => {
    getUrl()
      .then(({ url }) => getChromeStorageForClipNotes({ url }))
      .then(({ url, result }) => setStateOfCurrentUrl({ url, result }))
      .then(({ url }) => getStateOfCurrentUrl({ url }))
      .then(({ data }) => setNotes(data));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <TextArea setNotes={setNotes} notes={notes} />
        <Notes notes={notes} />
      </header>
    </div>
  );
}

export default App;
