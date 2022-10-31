import TreeItem from '@mui/lab/TreeItem';
import Game from './Game';
import {ITournament} from "../models/tournament.model";

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
