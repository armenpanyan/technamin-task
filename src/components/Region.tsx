import TreeItem from '@mui/lab/TreeItem';

import Tournament from './Tournament';
import {IRegion} from "../models/region.model";



interface props {
    region: IRegion;
}

export default function Region({region}:props){
    return (
            <TreeItem nodeId={region.name} label={region.name + `(${region.gamesCount})`}>
                {
                    region.tournaments.map((tournament, index) => (
                        <Tournament 
                            key={index}
                            tournament={tournament}
                        />
                    ))
                }
            </TreeItem>
    )
}