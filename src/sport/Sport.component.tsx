import { ISport } from "./sport.model"

interface props {
    sport: ISport
}

export default function Sport({sport}:props){
    return (<>{sport.name}</>)
}