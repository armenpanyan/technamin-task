import {ResourceTypes} from "./resource-types.model";

export interface IGameDetailedResourceBase<T extends ResourceTypes> {
    id: string;
    name: string;
    alias: string;
    order: number;

    gamesCount: number;
    type: T;
}
