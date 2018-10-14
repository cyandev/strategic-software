// Client ID and API key from the Developer Console
var CLIENT_ID = '598385287162-m4r7llc22tuvgcetipov7gr0crpvld17.apps.googleusercontent.com'; //Production
//var CLIENT_ID = '598385287162-1hp35lk1ar7jo98cjt10t83r2b053h1h.apps.googleusercontent.com'; //Testing
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

  const outputTable = document.getElementById("outputTable");
  const chartElement = document.getElementById("chart");
  const pocGetCaller = createGetCaller("1_Vr3VQen93ncj77t83kX_6Y8XuqWsY2INNP3qiPj16s");
  const barMaker = createChartMaker('bar', 'Button presses');
  const lineMaker = createChartMaker('line', 'Button presses');

  let request = pocGetCaller("output!A1:C10");
  request.then(response => {
    let valuesArr = response.result.values;
    valuesArr.forEach(rowArr => {
      let row = document.createElement("TR");
      rowArr.forEach(value => row.appendChild(makeTableItem(value)));
      outputTable.append(row);
    });
    let textInputs = valuesArr.map(rowArr => rowArr[0]);
    let buttonPresses = valuesArr.map(rowArr => rowArr[2]);
    textInputs.splice(0,1);
    buttonPresses.splice(0,1);
    let chart = new ApexCharts(chartElement, barMaker(buttonPresses, textInputs));
    chart.render();
  });
}

/**
*   Curried function to create response generators
*   @param spreadsheetId The ID of the spreadsheet to update.
*
*   @param range The A1 notation of a range to search for a logical table of data.
*/

const createGetCaller = (spreadsheetId) => (range) => {
  var params = {
    spreadsheetId: spreadsheetId,
    range: range
  }
  var request = gapi.client.sheets.spreadsheets.values.get(params);
  return request;
}
/**
*   Creates a th DOM element
*   @param tableValue the text to be added to the table
*/
function makeTableItem(tableValue){
  let node = document.createElement("TH");
  let textnode = document.createTextNode(tableValue);
  node.appendChild(textnode);
  return node;
}
/**
*   Curried function to create chart option generators
*   @param {string} type the type of chart to be drawn
*   @param {string} name the name that the data represents
*
*   @param {array} data the data to show
*   @param {array} categories the labels to show along the x axis
*/

const createChartMaker = (type, name) => (data, categories) => ({
  chart: {
    type: type
  },
  series: [{
    name: name,
    data: data
  }],
  xaxis: {
    categories: categories
  }
});
