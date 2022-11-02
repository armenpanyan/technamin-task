import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import {useParams, useNavigate} from 'react-router-dom';

import {IGame} from "../models/game.model";

interface props {
    game: IGame;
}

export default function Game({game}:props){
    let navigate = useNavigate();

    function onClick(){
        navigate(game._id)
    }

    return (
        <div onClick={onClick}>
            <TableContainer
                component={Paper}
                sx={{marginTop: 2, marginLeft: 1, marginBottom: 2, width: 700}}
            >
                <Table
                    sx={{ width: 650, }} aria-label="simple table"
                >
                    <TableBody>
                        <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                HOME TEAM NAME
                            </TableCell>
                            <TableCell align="right">{game.home.name}</TableCell>
                        </TableRow>
                        <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                AWAY TEAM NAME
                            </TableCell>
                            <TableCell align="right">{game.away.name}</TableCell>
                        </TableRow>
                        <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                            MARKETS COUNT
                            </TableCell>
                            <TableCell align="right">{game.markets_count}</TableCell>
                        </TableRow>
                        <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                            SCORE
                            </TableCell>
                            <TableCell align="right">{game.match_info?.score}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export function GameId(){
    const {gameId} = useParams();

    return <p>Game Id - {gameId}</p>;
}