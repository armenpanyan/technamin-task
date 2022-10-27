import React, {useEffect} from 'react';
import logo from './logo.svg';
import './App.css';

const requestData = `{
                        "cmd": "init",
                        "params": {
                            "device": "desktop",
                            "language": "en-GB"
                        },
                        "rid": "4E50E253-6181-050B-8E40-7155F77EE9DA"
                  }`;

const pingRequestData = `{
"cmd": "ping",
"rid": "F46614F4-4AA8-3F42-FEE1-11A7325E21E4"
}`;

function App() {

  useEffect(() => {
    let socket = new WebSocket("wss://mob.blue-version.com/hub/ws-sport");

    socket.onopen = function(e) {
      socket.send(requestData);
      setInterval(() => socket.send(pingRequestData), 10000)
    };

    socket.onmessage = function(event) {
      console.log(JSON.parse(event.data));
    };
  }, [])


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >:
          Tecgnamin Task
        </a>
      </header>
    </div>
  );
}

export default App;
