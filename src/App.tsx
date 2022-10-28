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

const allGamesRequestData = `{
"cmd": "get",
"params":
{
"channel": "active",
"label": "live games",
"subscribe": true,
"what":
{
"game":
[
"_id",
"date",
"home",
"away",
"status",
"markets_count"
],
"match_info":
[
"score",
"scores",
"game_score",
"server",
"time"
],
"region":
[
"id",
"alias",
https://stackedit.io/app#
2/259/1/22, 1:54 PM
StackEdit
"name",
"order"
],
"sport":
[
"id",
"alias",
"name",
"order"
],
"tournament":
[
"id",
"alias",
"name",
"order"
]
},
"where":
{
"game":
{
"active": true,
"feed": "live"
}
}
},
"rid": "FF32862C-84F7-1276-CC06-289CA979E081"
}`

function App() {

  useEffect(() => {
    let socket = new WebSocket("wss://mob.blue-version.com/hub/ws-sport");

    socket.onopen = function(e) {
      // socket.send(requestData);
      setTimeout(() => socket.send(requestData), 10000)
      setInterval(() => socket.send(pingRequestData), 10000)
      // setTimeout(() => socket.send(pingRequestData), 10000)
      // socket.send(allGamesRequestData);
      setTimeout(() => socket.send(allGamesRequestData), 20000)
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
          Technamin Task
        </a>
      </header>
    </div>
  );
}

export default App;
