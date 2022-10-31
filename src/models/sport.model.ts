import {IGameDetailedResourceBase} from "./resource-base.model";
import {ResourceTypes} from "./resource-types.model";
import {IRegion} from "./region.model";

export interface ISport extends IGameDetailedResourceBase<ResourceTypes.SPORT> {
    regions: IRegion[];
}
