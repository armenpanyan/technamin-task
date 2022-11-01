import {Genders} from "./genders.model";
import {IGameResource} from "./game-resource.model";

export interface IGameDate {
    start: number;
    start_day: number;
    start_hour: number;
    start_pretty: string;
}

export interface IGameStatus {
    alias: string;
    id: string; // "sr:sport:21:status:502"
    name: string;
    origin_id: string; // '502'
    short_name: string;
}

export interface IGame {
    _id: string;

    region: IGameResource;
    sport: IGameResource;
    tournament: IGameResource;

    markets_count: number;
    date: IGameDate;
    match_info: {
        score: string; // number:number
        time?: string;
    };

    home: {
        abbreviation: string;
        alias: string;
        gender: Genders;
        id: string; // "sr:competitor:407935"
        name: string;
        short_name: string;
    };

    away: {
        abbreviation: string;
        alias: string;
        gender: Genders;
        id: string; // sr:competitor:408101
        manager: string;
        name: string;
        short_name: string;
    };

    status: IGameStatus;
}
