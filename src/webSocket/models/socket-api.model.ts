import {Dispatch, SetStateAction} from "react";

export interface ISocketApi {
    socket: WebSocket;
    initSocketId: string;
    getGamesSocketId: string;
    // subscribers: Object[];
    subscribeId: string;

    getGamesCB?: Dispatch<SetStateAction<any>>;
    getAllGames<T>(cb: Dispatch<SetStateAction<T>>): void;
    onMessage(a: MessageEvent): void;
}
