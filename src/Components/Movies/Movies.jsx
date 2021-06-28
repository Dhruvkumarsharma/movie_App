import React, { Component } from 'react';
import Movie from "../Movie/Movie";
import "./Movies.css";
class Movies extends Component {
    state = {  }
    render() { 
        let moviesdata =this.props.moviesData;
        return ( 
            <div className="movies">
                { moviesdata.map((movieObj)=>{
                    return <Movie key={movieObj.id} movie={movieObj} ></Movie>
                })  }
            </div>
         );
    }
}
 
export default Movies;