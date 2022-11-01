import requestData from './request-data.json';
import {ProcessEnv} from "../models/env";
import {IGroupBy} from './models/group-by.model';
import {Dispatch, SetStateAction} from "react";
import {ISocketEvent} from "./models/socket-event.model";
import {IGame} from "../models/game.model";
import {ISport} from "../models/sport.model";
import {IRegion} from "../models/region.model";
import {ITournament} from "../models/tournament.model";
import {ResourceTypes} from "../models/resource-types.model";
import {ISocketApi} from "./models/socket-api.model";

const env: ProcessEnv = process.env;
const ApiUrl = env.REACT_APP_WEBSOCKET_API || "";

class SocketService implements ISocketApi {
    sid = '';
    socket: WebSocket;
    initSocketId = Date.now().toString(36);
    getGamesSocketId = Date.now().toString(36);
    status: 'ready' | 'connected' | 'disconnected' | 'connecting' | 'reconnecting' = 'connecting';
    gamesEventData = {
        rid: '',
        data: {sid: '', data: []},
    };

    getGamesCB?: Dispatch<SetStateAction<any>>;

    constructor() {
        this.socket = new WebSocket(ApiUrl);
        this.socket.onopen = this.onOpen.bind(this);
        this.socket.onmessage = this.onMessage.bind(this);
    }

    public onMessage(event: MessageEvent): void {
        try {
            const EventData: ISocketEvent<any> = JSON.parse(event.data);

            if (EventData.rid === this.initSocketId){
                this.initSocketId = '';
                const data = requestData.allGames;
                data.rid = this.getGamesSocketId;
                this.socket.send(JSON.stringify(data));
            } else if (EventData.rid === this.getGamesSocketId) {
                this.sid = EventData.data.sid;
                if (this.getGamesCB) {
                    this.gamesEventData = EventData;
                    this.getGamesCB(this.group(EventData.data.data));
                }
            }

            if (this.sid === EventData.rid){
                const event = EventData.data[0];
                if (event._new){
                    if (EventData.data.length){
                            this.gamesEventData.data.data.concat(...EventData.data);
                        if (this.getGamesCB){
                            this.getGamesCB(this.group(this.gamesEventData.data.data))
                        }
                    }
                } else if (event._remove){
                    if (EventData.data.length){
                        let removableGamesIds: string[] = EventData.data.map((game: IGame) => game._id);
                        this.gamesEventData.data.data = this.gamesEventData.data.data.filter(
                            (game: IGame)=> !removableGamesIds.includes(game._id)
                        );
                        if (this.getGamesCB){
                            this.getGamesCB(this.group(this.gamesEventData.data.data))
                        }
                    }
                } else {
                    if (EventData.data.length){
                        let updatedGamesIds: string[] = EventData.data.map((game: IGame) => game._id);
                        let newGamesEventData: IGame[] = [];
                        this.gamesEventData.data.data.forEach((game: IGame)=> {
                            if (updatedGamesIds.includes(game._id)){
                                const currentGame = EventData.data.filter((updatedGame: IGame) => updatedGame._id === game._id);
                                game.match_info = {...game.match_info, ...currentGame.match_info}
                            }
                            newGamesEventData.push(game);
                        });
                        (this.gamesEventData.data.data as IGame[]) = newGamesEventData;//TODO
                        if (this.getGamesCB){
                            this.getGamesCB(this.group(this.gamesEventData.data.data))
                        }
                    }
                }
            }
        } catch (ex) {
            console.error('Response data is not valid JSON type.', ex)
        }
    }

    public getAllGames<T>(cb: Dispatch<SetStateAction<T>>) {
        this.getGamesCB = cb;
    }

    private onOpen(): void {
        this.status = 'connected';
        const initData = {...requestData.cmdInit, rid: this.initSocketId}
        this.socket.send(JSON.stringify(initData));
        setInterval(() => this.socket.send(JSON.stringify(requestData.ping)), 10000);
    }

    private group(games: IGame[]) {
        const sports: ISport[] = [];
        const groupBySport = this.groupBy(games, ResourceTypes.SPORT);
        Object.keys(groupBySport).forEach(id => {
            const {games, ...sportItem} = groupBySport[id];

            const groupByRegion = this.groupBy(games, ResourceTypes.REGION);
            const regions: IRegion[] = [];
            Object.keys(groupByRegion).forEach(id => {
                const {games, ...groupItem} = groupByRegion[id];

                const groupByTournament = this.groupBy(games, ResourceTypes.TOURNAMENT);
                const tournaments: ITournament[] = [];
                Object.keys(groupByTournament).forEach(id => {
                    const {games, ...groupItem} = groupByTournament[id];
                    tournaments.push({
                        ...groupItem,
                        games,
                    });
                });

                regions.push({
                    ...groupItem,
                    tournaments,
                });
            });

            sports.push({
                ...sportItem,
                regions,
            });
        });

        return sports;
    }

    private groupBy(games: IGame[], by: ResourceTypes): IGroupBy {
        const group: IGroupBy = {};

        games.forEach((game) => {
            const id = game[by].id;

            if (group[id]) {
                group[id].games.push(game);
            } else {
                group[id] = {
                    ...game[by],
                    games: [game],
                    type: by,
                    gamesCount: 0,
                };
            }
        });

        Object.keys(group).forEach(key => {
            group[key].gamesCount = group[key].games.length;
        });

        return group;
    }
}

export default new SocketService();