import TreeItem from '@mui/lab/TreeItem';
import Tournament from './Tournament';


interface props {
    region: any
}

export default function Region({region}:props){
    return (
            <TreeItem nodeId={region.name} label={region.name + `(${region.gamesCount})`}>
                {
                    region.tournaments.map((tournament: any, index: number) => (
                        <Tournament 
                            key={index}
                            tournament={tournament}
                        />
                    ))
                }
            </TreeItem>
    )
}