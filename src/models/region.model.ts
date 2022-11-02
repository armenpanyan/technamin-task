import {ITournament} from "./tournament.model";
import {ResourceTypes} from "./resource-types.model";
import {IGameDetailedResourceBase} from "./resource-base.model";

export interface IRegion extends IGameDetailedResourceBase<ResourceTypes.REGION> {
    tournaments: ITournament[];
}
