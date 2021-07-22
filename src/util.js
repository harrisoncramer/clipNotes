export const getUrl = () =>
  new Promise((resolve, _reject) => {
    chrome.tabs.query(
      { active: true, windowId: chrome.windows.WINDOW_ID_CURRENT },
      function (tabs) {
        const url = tabs[0].url;
        const parsedUrl = new URL(url);
        const domain = parsedUrl.hostname;
        resolve({ url: domain });
      }
    );
  });

// Pass down url into next .then() block
export const getChromeStorageForClipNotes = ({ url }) =>
  new Promise((resolve, _reject) => {
    console.log("Getting chrome storage...");
    chrome.storage.local.get("clipNotes", function (result) {
      if (!result) {
        // If there is no "clipNotes" object in local storage, then create one...
        const initialState = {};
        chrome.storage.local.set({ clipNotes: initialState }, function () {
          console.log("Set initial storage.");
          resolve({ url, result: initialState });
        });
      } else {
        console.log("Fetched initial storage successfully. State is ", result);
        resolve({ url, result });
      }
    });
  });

export const setStateOfCurrentUrl = ({ url, result }) =>
  new Promise((resolve, _reject) => {
    console.log(`Getting state for url of ${url}`);
    if (!result.clipNotes[url]) {
      chrome.storage.local.set(
        { clipNotes: { ...result.clipNotes, [url]: [] } },
        function () {
          console.log(`Set initial state of ${url} to be an empty array.`);
          resolve({ url });
        }
      );
    }
    resolve({ url });
  });

export const getStateOfCurrentUrl = ({ url }) =>
  new Promise((resolve, _reject) => {
    chrome.storage.local.get("clipNotes", function (result) {
      resolve({ data: result.clipNotes[url] });
    });
  });

export const saveNote = ({ url, note }) =>
  new Promise(async (resolve, _reject) => {
    chrome.storage.local.get("clipNotes", function (result) {
      // Get the array for the current URL, and push onto it.
      console.log(result.clipNotes);
      result.clipNotes[url].push(note);
      chrome.storage.local.set({ ...result }, function () {
        console.log("Added a note");
        resolve();
      });
    });
  });
