import {IGame} from "../../models/game.model";

export interface ISocketEvent<T> {
    rid: string;
    time?: number;
    data: T;
}

export interface ISocketGameEvent {
    rid: string;
    data: {
        data: IGame[] | [],
        sid: string
    };
}
