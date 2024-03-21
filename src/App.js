import React from 'react';

import './App.css';
import ZoomMtgEmbedded from '@zoom/meetingsdk/embedded';

function App() {

  const client = ZoomMtgEmbedded.createClient();

  var authEndpoint = "https://sysc-zoom-auth-server-3b591ca480f6.herokuapp.com/"
  var sdkKey = '97zkC6mhQXmbHVHgAe9yw'
  var meetingNumber = '88958472494'
  var passWord = '0mi3ck'
  var userName = 'Doctor'

  function getSignature(e) {
    e.preventDefault();

    fetch(authEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        meetingNumber: meetingNumber,
        role: 0
      })
    }).then(res => res.json())
    .then(response => {
      startMeeting(response.signature)
    }).catch(error => {
      console.error(error)
    })
  }

  function startMeeting(signature) {

    let meetingSDKElement = document.getElementById('meetingSDKElement');

    client.init({zoomAppRoot: meetingSDKElement, language: 'en-US', patchJsMedia: true}).then(() => {
      client.join({
        signature: signature,
        sdkKey: sdkKey,
        meetingNumber: meetingNumber,
        password: passWord,
        userName: userName,
        userEmail: ''
      }).then(() => {
        console.log('joined successfully')
      }).catch((error) => {
        console.log(error)
      })
    }).catch((error) => {
      console.log(error)
    })
  }

  return (
    <div className="App">
      <main>
        <h1>Zoom Meeting SDK Sample React</h1>

        {/* For Component View */}
        <div id="meetingSDKElement">
          {/* Zoom Meeting SDK Component View Rendered Here */}
        </div>

        <button onClick={getSignature}>Join Meeting</button>
      </main>
    </div>
  );
}

export default App;
