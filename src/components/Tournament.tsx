import TreeItem from '@mui/lab/TreeItem';
import {ITournament} from "../models/tournament.model";

import Game from './Game';

interface props {
    tournament: ITournament;
}

export default function Tournament({tournament}: props) {
    return (
        <TreeItem nodeId={tournament.name} label={tournament.name + `(${tournament.gamesCount})`}>
            {tournament.games.map((game, index) => (
                <Game
                    key={index}
                    game={game}/>)
            )}
        </TreeItem>
    )
}
