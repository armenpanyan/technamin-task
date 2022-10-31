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
const ApiUrl = env.REACT_APP_WEBSOCKET_API || ""; //TODO

class SocketService implements ISocketApi {
    socket: WebSocket;
    subscribeId = '';
    // subscribers = [];
    initSocketId = Date.now().toString(36);
    getGamesSocketId = Date.now().toString(36);
    status: 'ready' | 'connected' | 'disconnected' | 'connecting' | 'reconnecting' = 'connecting';

    getGamesCB?: Dispatch<SetStateAction<any>>;

    constructor() {
        this.socket = new WebSocket(ApiUrl);
        this.socket.onopen = this.onOpen.bind(this);
        this.socket.onmessage = this.onMessage.bind(this);
    }

    public onMessage(event: MessageEvent): void {
        try {
            const EventData: ISocketEvent<any> = JSON.parse(event.data);

            if (EventData.rid === this.getGamesSocketId) {
                if (this.getGamesCB) {
                    this.getGamesCB(this.group(EventData.data.data));
                }
            }
        } catch (ex) {
        }
    }

    public getAllGames<T>(cb: Dispatch<SetStateAction<T>>) {
        this.getGamesCB = cb;

        setTimeout(() => {
            const data = requestData.allGames;
            data.rid = this.getGamesSocketId;
            this.socket.send(JSON.stringify(data));
        }, 2000)
    }

    private onOpen(): void {
        this.status = 'connected';
        this.socket.send(JSON.stringify({...requestData.cmdInit}));
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