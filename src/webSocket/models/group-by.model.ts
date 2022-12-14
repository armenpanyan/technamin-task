import {IGame} from "../../models/game.model";
import {ResourceTypes} from "../../models/resource-types.model";
import {IGameDetailedResourceBase} from "../../models/resource-base.model";

interface IOrderType<T extends ResourceTypes = any> extends IGameDetailedResourceBase<T> {
    games: IGame[];
}

export interface IGroupBy {
    [key: string]: IOrderType
}
