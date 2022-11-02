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
    id: string;
    name: string;
    origin_id: string;
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
        score: string;
        time?: string;
    };

    home: {
        abbreviation: string;
        alias: string;
        gender: Genders;
        id: string;
        name: string;
        short_name: string;
    };

    away: {
        abbreviation: string;
        alias: string;
        gender: Genders;
        id: string;
        manager: string;
        name: string;
        short_name: string;
    };

    status: IGameStatus;
}
