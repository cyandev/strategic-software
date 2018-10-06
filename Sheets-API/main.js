// Client ID and API key from the Developer Console
var CLIENT_ID = '60510912763-l4vq9eueehj4lgd3i547k8risqpbdmjf.apps.googleusercontent.com';
var API_KEY = 'AIzaSyCZNBqRLg7HOqyR_6u4HrWF2ixG7gI9Uac';

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
 *  Sign in the user upon button click.
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
 * Append a pre element to the body containing the given message
 * as its text node. Used to display the results of the API call.
 *
 * @param {string} message Text to be placed in pre element.
 */
function appendPre(message) {
  var pre = document.getElementById('content');
  var textContent = document.createTextNode(message + '\n');
  pre.appendChild(textContent);
}

function main(){
  //Code in this function is run if the user has been authorized
  //Requests to the google api should be called (and defined maybe?) here
  //TODO check what the proper practice is on nested functions

  document.querySelector(".dummy").innerHTML = "Authorized, you can now modify the spreadsheet through this input field"

  function writeSheet(range,values){
    /*
      Takes range argument in form of A1 string notation including sheet name
      values are in 2D array form
      array of rows, which are arrays of values
      [[row1],[row2]]
    */
    var body = {
      values: values
    };

    gapi.client.sheets.spreadsheets.values.update({
      spreadsheetId: '1oBHeLAUu9-CPasNNavU0_ZBOFTUNMLEC4ehV3AiwLRA',
      range: range,
      valueInputOption:'RAW',
      resource: body
    }).then((response) => {
      //This isn't strictly necessary
      var result = response.result;
      console.log(`${result.updatedCells} cells updated.`);
    });
  }

  function makeRequest(cell){ //returns a request promise
    var request = gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: '1oBHeLAUu9-CPasNNavU0_ZBOFTUNMLEC4ehV3AiwLRA',
      range: cell,
    });
    return request
    /*
      Access data by
      makeRequest(cell in A1 notation including sheet name).then(function(response){
    });
    or pass a seperate function
    values are at response.result.values
    */
  }

}
