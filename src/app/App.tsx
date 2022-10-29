import { useEffect } from 'react';
import Sport from '../sport/Sport.component';
import socket from '../webSocket/Socket.service';

function App() {
  function cmdInit(){
    // socket
  }

  useEffect(() => {

    console.log('effect');
    console.log(socket.socket.readyState);


    // let sid: string = '';

    // socket.onopen = function (e) {
    //   socket.send(cmdInit);
    //   setInterval(() => socket.send(ping), 5000)
    //   setTimeout(() => socket.send(allGames), 1000)
    //   setTimeout(() => {
    //     const data = JSON.parse(createGame);
    //     console.log(sid);
    //     data.rid = sid;
    //     socket.send(JSON.stringify(data))
    //   }, 5000)

    //   setTimeout(() => socket.send(allGames), 20000)
    // };

    // socket.onmessage = function (event) {
    //   const data = JSON.parse(event.data);
    //   if (data.data.sid) {
    //     sid = data.data.sid;
    //   }
    //   console.log(data);
    // };
  }, [socket.status]);

  return (
    <div > 
      <Sport sport={{name: 'gago'}}/>
    </div>
  );
}

export default App;
