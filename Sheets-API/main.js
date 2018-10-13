// Client ID and API key from the Developer Console
var CLIENT_ID = '598385287162-m4r7llc22tuvgcetipov7gr0crpvld17.apps.googleusercontent.com';
var API_KEY = 'AIzaSyDs_SMb0S5fEaeZcb9MreZY0o7JIBIHo9I';

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = "https://www.googleapis.com/auth/spreadsheets";

var authorizeButton = document.getElementById('authorize_button');
var signoutButton = document.getElementById('signout_button');

/**
 *  On load, called to load the auth2 library and API client library.
 */
function handleClientLoad() {
  gapi.load('client:auth2', initClient);
}

/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
function initClient() {
  gapi.client.init({
    apiKey: API_KEY,
    clientId: CLIENT_ID,
    discoveryDocs: DISCOVERY_DOCS,
    scope: SCOPES
  }).then(function () {
    // Listen for sign-in state changes.
    gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

    // Handle the initial sign-in state.
    updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    authorizeButton.onclick = handleAuthClick;
    signoutButton.onclick = handleSignoutClick;
  });
}

/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
function updateSigninStatus(isSignedIn) {
  if (isSignedIn) {
    authorizeButton.style.display = 'none';
    signoutButton.style.display = 'block';
    main();
  } else {
    authorizeButton.style.display = 'block';
    signoutButton.style.display = 'none';


  }
}

/**
 *    Sign in the user upon button click.
 */
function handleAuthClick(event) {
  gapi.auth2.getAuthInstance().signIn();
}

/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick(event) {
  gapi.auth2.getAuthInstance().signOut();
  window.location.reload();
}

/**
*   Main body of code to be run after the client is authorized
*/
function main(){
  let pocCaller = createCaller("1_Vr3VQen93ncj77t83kX_6Y8XuqWsY2INNP3qiPj16s", "A1:C", "RAW", "INSERT_ROWS"); //create caller is defined at the bottom of the page

  //Define DOM elements
  const formArea = document.querySelector(".pocForm");
  const textInput = document.getElementById("textForm");
  const colorInput = document.getElementById("colorForm");
  const buttonInput = document.getElementById("buttonForm");
  const submitButton = document.getElementById("submitButton");
  //This can be done more efficiently with querySelectorAll, but I'm showing each individual event here

  //Make form visible if authorized
  formArea.style.display = 'block';

  //setup event listeners
  textInput.addEventListener("change", () => console.log(textInput.value));
  colorInput.addEventListener("change", () => console.log(colorInput.value));
  buttonInput.addEventListener("click", () => buttonInput.value++);
  //submit event listener
  submitButton.addEventListener("click", handleSubmit); //event listeners can also be given named functions

  /**
  *   Calls the google api to record values and resets form
  */
  function handleSubmit(){
    let formValues = [[textInput.value,colorInput.value,buttonInput.value]];
    pocCaller(formValues).then(response => console.log(response.result)).catch(err => console.log(err.result));
    textInput.value = "";
    colorInput.value ="000000";
    buttonInput.value = 0;
  }

}

/**
*   Curried function to create response generators
*   @param spreadsheetId The ID of the spreadsheet to update.
*   @param range The A1 notation of a range to search for a logical table of data.
*   @param valueInputOption How the input data should be interpreted. (RAW or USER_ENTERED)
*   @param insertDataOption How the input data should be inserted. (OVERWRITE or INSERT_ROWS)
*
*   @param values The spreadsheet values in nested array form.
*/

let createCaller = (spreadsheetId, range, valueInputOption, insertDataOption) => (values) => {
  var params = {
    spreadsheetId: spreadsheetId,
    range: range,
    valueInputOption: valueInputOption,
    insertDataOption, insertDataOption
  }
  var valueRangeBody = {
    values: values
  }
  var request = gapi.client.sheets.spreadsheets.values.append(params, valueRangeBody);
  return request;
}
