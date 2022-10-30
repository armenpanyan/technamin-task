import requestData from'./request-data.json';
import { ProcessEnv } from "../models/env";
import {IGame, IGroupBy, IOrderType, ISocketApi} from './models';

const env: ProcessEnv = process.env;
const ApiUrl = env.REACT_APP_WEBSOCKET_API || ""; //TODO

class SocketService implements ISocketApi {
    socket;
    subscribeId = "";
    subscribers = [];
    initSocketId = String(Math.random());
    getGamesSocketId = String(Math.random());
    status: 'ready' | 'connected' | 'disconnected' | 'connecting' | 'reconnecting' = 'connecting';
    getGamesCB = (a: any) => {};

    constructor(){
        this.socket = new WebSocket(ApiUrl);
        this.socket.onopen = this.onOpen.bind(this);
        this.socket.onmessage = this.onMessage.bind(this);
    }

    public onMessage(event: MessageEvent){
        const EventData = JSON.parse(event.data)  

        if(EventData.rid === this.getGamesSocketId){
            const a = this.group(EventData.data.data);
            this.getGamesCB(a);
        }
    }

    public getAllGames(cb: any){
        this.getGamesCB = cb;
        setTimeout(() => { 
            const data = requestData.allGames;
            data.rid = this.getGamesSocketId;
            this.socket.send(JSON.stringify(data));
        }, 2000)
    }

    private onOpen() {
        this.status = 'connected';
        this.socket.send(JSON.stringify({...requestData.cmdInit}));
        setInterval(() => this.socket.send(JSON.stringify(requestData.ping)), 10000)
    }

    private group (data: any){
        const sports: any[] = [];
        const groupBySport = this.groupBy(data, 'sport');
        Object.keys(groupBySport).forEach(id => {
            const {data, ...sportItem} = groupBySport[id];

            let groupByRegion = this.groupBy(data, 'region'); 
            let regions: any[] = [];
            Object.keys(groupByRegion).forEach(id => {
                const {data, ...groupItem} = groupByRegion[id];
            
                let groupByTournament = this.groupBy(data, 'tournament');
                let tournaments: any[] = [];
                Object.keys(groupByTournament).forEach(id => {

                const {data, ...groupItem} = groupByTournament[id];
                tournaments.push({...groupItem, games: data})
            }) 
            
            regions.push({...groupItem,tournaments,})
            })

            sports.push({...sportItem, regions,})
        })
        return sports;
    }

    private groupBy(games: IGame[], by: IOrderType['type']): IGroupBy{
        const group: IGroupBy = {};
    
        games.forEach(game => {
            let id = game[by].id;
             if(group[id]) {
                group[id].data.push(game);
            } else {
                group[id] = {
                    ...game[by],
                    data: [game],
                    type: by,
                };
            }
        });
    
        Object.keys(group).forEach(key => {
            group[key].gamesCount = group[key].data.length;
        })
    
        return group;
    }
}

export default new SocketService();