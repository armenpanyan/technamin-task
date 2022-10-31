import {IGameDetailedResourceBase} from "./resource-base.model";
import {ResourceTypes} from "./resource-types.model";
import {ITournament} from "./tournament.model";

export interface IRegion extends IGameDetailedResourceBase<ResourceTypes.REGION> {
    tournaments: ITournament[];
}
