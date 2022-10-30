import TreeItem from '@mui/lab/TreeItem';
import Game from './Game';


interface props {
    tournament: any
}

export default function Tournament({tournament}:props){
    return (
            <TreeItem nodeId={tournament.name} label={tournament.name + `(${tournament.gamesCount})`}>
                {tournament.games.map((game: any, index: number) => (
                <Game
                    key={index}
                    game={game} />)
                )}
            </TreeItem>
    )
}