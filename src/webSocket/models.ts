export interface ISocketApi {
    socket: WebSocket;
    initSocketId: string;
    getGamesSocketId: string;
    subscribers: Object[];
    subscribeId: string;
    getGamesCB: any;

    getAllGames(cb: any): void;
    onMessage(a: any): void;
}

export interface IOrderType {
    id: string;
    data: IGame[]
    name: string; 
    alias: string;
    order: number; 
    gamesCount: number;
    type: 'sport' | 'region' | 'tournament',
}

export interface IGame {
    away: any;
    date: any;
    home: any;
    status: any;
    match_info: any;
    markets_count: any;
    sport: IOrderType;
    region: IOrderType;
    tournament: IOrderType;
}

export interface IGroupBy{
    [key: string]: IOrderType
}