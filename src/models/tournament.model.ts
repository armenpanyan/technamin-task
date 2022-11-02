import {IGame} from "./game.model";
import {ResourceTypes} from "./resource-types.model";
import {IGameDetailedResourceBase} from "./resource-base.model";

export interface ITournament extends IGameDetailedResourceBase<ResourceTypes.TOURNAMENT> {
    games: IGame[];
}
