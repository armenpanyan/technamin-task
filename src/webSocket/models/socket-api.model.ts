import {Dispatch, SetStateAction} from "react";
import {ISocketGameEvent} from "./socket-event.model";



export interface ISocketApi {
    sid: string;
    socket: WebSocket;
    initSocketId: string;
    getGamesSocketId: string;
    gamesEventData: ISocketGameEvent,

    getGamesCB?: Dispatch<SetStateAction<any>>;
    getAllGames<T>(cb: Dispatch<SetStateAction<T>>): void;
    onMessage(a: MessageEvent): void;
}
