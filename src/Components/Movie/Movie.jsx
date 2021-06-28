import React, { Component } from 'react';
import { API_KEY, API_URL, IMAGE_URL } from "../../API/secreates";
import "./Movie.css"
import axios from 'axios';
import { Link } from 'react-router-dom';

class Movie extends Component {
    state = {
        detailedMovieObj: {},
    }


    async componentDidMount() {

        //https://api.themoviedb.org/3/movie/508943/videos?api_key=865b483d55b619279149858c6786abcf&language=en-US
        let reqdata = await axios.get(`${API_URL}/movie/${this.props.movie.id}?api_key=${API_KEY}&language=en-US`);
        let detailedmovie = reqdata.data;
        // console.log(detailedmovie);
        let posterPath = IMAGE_URL + detailedmovie.poster_path;
        this.setState({
            detailedMovieObj: { ...detailedmovie, poster_path: posterPath },
        })
    }




    render() {
        // console.log(this.props.movie);
        let { poster_path, title, vote_average } = this.props.movie;
        let posterpath = IMAGE_URL + poster_path;
        return (
            <div className="movie-item">
                <div className="movie-poster">
                    <Link to={{ pathname: "/moviepage", state:this.state.detailedMovieObj}}>

                        <img src={posterpath} alt="" />
                    </Link>
                </div>
                <div className="movie-info">
                    <div className="movie-title">{title}</div>
                    <div className="movie-rating">{vote_average} IMDB</div>
                </div>
            </div>
        );
    }
}

export default Movie;