import "../index.css"
import { use, useEffect, useState } from "react"
import { Card } from "./PokemonCard";


export const Pokemon = () => {
    const [pokemon, setPokemon] = useState([])
    const [loading, setLoading] = useState(true)
    const API = "https://pokeapi.co/api/v2/pokemon?limit=124";
    const getPokemon = async () => {
       
        try {
            const res = await fetch(API);
            const data = await res.json();
            // console.log(data);

            const detailedPokemonData = data.results.map(async (curpoke) => {
                const res = await fetch(curpoke.url);
                const data = await res.json();
                // console.log(res);
                return data;
            });

            // console.log(detailedPokemonData);
            const detailedPokemon = await Promise.all(detailedPokemonData);
            setPokemon(detailedPokemon);
            setLoading(false)
            // console.log(detailedPokemon);
            
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
  }

    useEffect(() => {
        getPokemon()
    }, [])


    if (loading){
        return <h1>Loading.....</h1>
    }
    return (
        <>
        <section className="container">
            <div>
           <ul className="cards">
            {
                pokemon.map((curPokemon)=>{
                    return (
                        <>
                    {/* <li key={curPokemon.id}>{curPokemon.name}</li> */}
                    <Card id={curPokemon.id} data={curPokemon}/>
                        </>
                    )
                })
            }
           </ul>
        </div>
        </section>
        </>
        
    )
} 