import TreeItem from '@mui/lab/TreeItem';
import Region from './Region';

import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import { useEffect, useState } from 'react';
import socket from '../webSocket/Socket.service';
import {IOrderType} from '../webSocket/models';
import {Outlet} from 'react-router-dom';

interface ISport {
    regions: any
}

export default function Sport(){
    const [sports, setSports] = useState<[ISport & IOrderType] | null>(null);

    useEffect(() => {
      socket.getAllGames(setSports);
    }, [socket.status]);
  

    return (
        <TreeView
        aria-label="file system navigator"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        sx={{width: 900}}
      >
        {sports?.map((sport: ISport & IOrderType) => (
            <TreeItem
                key={sport.name}
                nodeId={sport.name}
                label={sport.name + `(${sport.regions.length})`}
            >
                {sport.regions.map((region: any) => <Region key={region.name} region={region} />)}
            </TreeItem>
        ))}
         <Outlet />
      </TreeView>
    )
}