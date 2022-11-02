import {IRegion} from "./region.model";
import {ResourceTypes} from "./resource-types.model";
import {IGameDetailedResourceBase} from "./resource-base.model";

export interface ISport extends IGameDetailedResourceBase<ResourceTypes.SPORT> {
    regions: IRegion[];
}
