import requestData from'./request-data.json';
import { ProcessEnv } from "../core/models/env";

const env: ProcessEnv = process.env;
const ApiUrl = env.REACT_APP_WEBSOCKET_API || ""; //TODO

interface ISocketApi {
    socket: WebSocket;
    subscribers: Object[];
    subscribeId: string;
    // init(): void;
    ping(): void;
    getAllGames(): void;
    onMessage(a: any): void;
}

let count = 0;

class SocketService implements ISocketApi {
    status: 'ready' | 'connected' | 'disconnected' | 'connecting' | 'reconnecting' = 'connecting';
    socket;
    subscribeId = "";
    subscribers = [];

    constructor(){
        this.socket = new WebSocket(ApiUrl);
        this.socket.onopen = this.onOpen.bind(this);


        this.socket.onmessage = (data) => {
            console.log('message:', JSON.parse(data.data));

            if (count < 2) {
                this.getAllGames();
            }

            count++;
        }
    }

    // init(){
    //     this.socket.send(JSON.stringify(requestData.cmdInit));

    // }

    ping(){}

    getAllGames(){
        console.log('call get all games');
        this.socket.send(JSON.stringify(requestData.allGames));
    }

    onMessage(a: any){
        console.log(a);
        // get all games
        // init
        // ping
    }

    private onOpen() {
        this.status = 'connected';
        this.socket.send(JSON.stringify({...requestData.cmdInit, type: "100000000"}));
    }
}

export default new SocketService();


        // this.socket.onmessage = (ev) => {
            // if (ev.type === 'init') {
            //     this.getAllGames();
            // }
        // };

        // this.socket.send(JSON.stringify(requestData.cmdInit));
        // this.socket.onmessage = (a) => {
        //     console.log(a);
        // }
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