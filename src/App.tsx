import React, {useEffect} from 'react';
import logo from './logo.svg';
import './App.css';

const cmdInit = `{
                        "cmd": "init",
                        "params": {
                            "device": "desktop",
                            "language": "en-GB"
                        },
                        "rid": "4E50E253-6181-050B-8E40-7155F77EE9DA"
                  }`;

const ping = `{
"cmd": "ping",
"rid": "F46614F4-4AA8-3F42-FEE1-11A7325E2n[m1E4"
}`;

const allGames = `{
   "cmd":"get",
   "params":{
      "channel":"active",
      "label":"live games",
      "subscribe":true,
      "what":{
         "game":[
            "_id",
            "date",
            "home",
            "away",
            "status",
            "markets_count"
         ],
         "match_info":[
            "score",
            "scores",
            "game_score",
            "server",
            "time"
         ],
         "region":[
            "id",
            "alias",
            "name",
            "order"
         ],
         "sport":[
            "id",
            "alias",
            "name",
            "order"
         ],
         "tournament":[
            "id",
            "alias",
            "name",
            "order"
         ]
      },
      "where":{
         "game":{
            "active":true,
            "feed":"live"
         }
      }
   },
   "rid":"FF32862C-84F7-1276-CC06-289CA979E081"
}`;


const createGame = `{
  "data":
  [
    {
      "_id": "sr:match:22813885",
      "_new": true,
      "away":
      {
        "abbreviation": "RME",
        "alias": "Racing 92",
        "gender": "male",
        "id": "sr:competitor:36538",
        "name": "Racing 92"
      },
      "date":
      {
        "start": 1599321600,
        "start_day": 1599264000,
        "start_hour": 1599321600,
        "start_pretty": 1599321600000
      },
      "home":
      {
        "abbreviation": "LOU",
        "alias": "Lyon Ou",
        "country": "France",
        "country_code": "FRA",
        "gender": "male",
        "id": "sr:competitor:52812",
        "name": "Lyon Ou"
      },
      "markets_count": 35,
      "match_info":
      {},
      "region":
      {
        "alias": "Rugby Union",
        "id": "sr:category:82",
        "name": "Rugby Union",
        "order": 81
      },
      "sport":
      {
        "alias": "Rugby",
        "id": "sr:sport:12",
        "name": "Rugby",
        "order": 9
      },
      "status":
      {
        "alias": "Not started",
        "id": "sr:sport:12:status:0",
        "name": "Not started",
        "origin_id": "0",
        "short_name": "Soon"
      },
      "tournament":
      {
        "alias": "Top 14",
        "id": "sr:tournament:420",
        "name": "Top 14",
        "order": 419
      }
    }
  ],
  "rid": "UOEfycNfmT_cm-hCg-ZHb",
  "cmd": "create"
}
`

function App() {

  useEffect(() => {
    let socket = new WebSocket("wss://mob.blue-version.com/hub/ws-sport");
    let sid: string = '';

    socket.onopen = function(e) {
      socket.send(cmdInit);
      setInterval(() => socket.send(ping), 5000)
      setTimeout(() => socket.send(allGames), 1000)
      setTimeout(() => {
        const data = JSON.parse(createGame);
        console.log(sid);
        data.rid = sid;
        socket.send(JSON.stringify(data))
      }, 5000)

      setTimeout(() => socket.send(allGames), 20000)
    };

    socket.onmessage = function(event) {
      const data = JSON.parse(event.data);
      if (data.data.sid){
        sid = data.data.sid;
      }
      console.log(data);
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
