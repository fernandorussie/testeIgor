import React from "react"
import axios from "axios"
import Carsl from "react-elastic-carousel"

const movies = axios.create({
    baseURL:"https://api.themoviedb.org/3/movie/popular?api_key=4325378346eac4ca5bf909477593a901&language=pt-BR"
})

export default class Main extends React.Component{

    state ={
        listMovies: []
    }

    async componentDidMount(){
        const response = await movies.get()
        const filmes = response.data.results.map(item =>{
            return{
                ...item,
                imgApi: `https://image.tmdb.org/t/p/w500/${item.poster_path}`
            }
        })
        this.setState({
            listMovies: filmes
        })
    }

    
    render(){
        let {listMovies} = this.state
        return(
            <div>
                <h1>Filmes</h1>
                <Carsl>
                    {listMovies.map((item) => (
                        <div>
                            <ul>
                                <li>{item.title}</li>
                            </ul>
                            <img src={item.imgApi} alt={`Banner do filme:${item.title}`}/>
                            <p>{item.overview}</p>
                            
                        </div>
                    ))}
                </Carsl>
            </div>
        )
    }

}