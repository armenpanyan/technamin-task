import {IGameDetailedResourceBase} from "./resource-base.model";
import {ResourceTypes} from "./resource-types.model";
import {IGame} from "./game.model";

export interface ITournament extends IGameDetailedResourceBase<ResourceTypes.TOURNAMENT> {
    games: IGame[];
}
