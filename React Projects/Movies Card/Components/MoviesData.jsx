import seriesData from "../seriesData.json"
import { Card } from "./Cards"

export const Movies=()=>{
    return (
        <>
        <section className="container">
        <h2>List of Top Netflix Movies</h2>
        <ul className="card">
            {seriesData.map((curMovie)=>{
                console.log(curMovie.name);
                return <Card data={curMovie} id={curMovie.id}/>
            })}
        </ul>
        </section>
       
        </>
    )
}