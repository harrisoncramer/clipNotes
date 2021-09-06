import React, { useState } from 'react';
import './App.css';
import TextArea from './TextArea.js';
import Notes from './Notes';
import {
  getUrl,
  getChromeStorageForClipNotes,
  setStateOfCurrentUrl,
  getStateOfCurrentUrl,
} from './util';

function App() {
  const [notes, setNotes] = useState([]);

  /* On initial page load...
   * 1. Get the chrome storage.
   * 2. If there are no notes for the current url, then set an empty array.
   * 3. Get the data just set/not set for the current url.
   * 4. Take the data at the current URL and set it inside the state of the applications.
   * Those notes are then passed down to the TextArea and Notes components to be rendered to the page.
   */
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
        {notes.length > 0 && <Notes notes={notes} />}
      </header>
    </div>
  );
}

export default App;
