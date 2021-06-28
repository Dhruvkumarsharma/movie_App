import React, { Component } from 'react';
import axios from 'axios';
import YouTube from 'react-youtube';
import { API_URL, API_KEY } from "../../API/secreates"
import "./MoviePage.css";
class Moviepage extends Component {
    state = {
        videoObject: {},
    }

    async componentDidMount() {
        let response = await axios.get(`${API_URL}/movie/${this.props.location.state.id}/videos?api_key=${API_KEY}&language=en-US`);
        console.log(response);
        let videoObjt = response.data.results.filter((videoObj) => {
            if (videoObj.type == "Trailer" && videoObj.site == "YouTube") {
                return true;
            }
            return false;
        })
        this.setState({
            videoObject: videoObjt[0],
        })
    }
    handleFav = ()=>{
        this.props.setfav(this.props.location.state);
    }
    render() {
        const opts = {
            height: "100%",
            width: "100%",
            playerVars: {
                autoplay: 1,
            },
        };
        let { title, tagline, vote_average, poster_path, overview } = this.props.location.state;
        return (
            <div className="movie-page">
                <div className="movie-page-poster">
                    <img src={poster_path} alt="" />
                </div>
                <div className="movie-page-details">
                    <div className="movie-title-info">
                        <h1>
                            {title} <br></br> {vote_average} IMDB
                        </h1>
                        <button className="btn btn-danger" onClick={this.handleFav}>ADD TO FAV</button>
                        <br />
                        <span>{tagline}</span>
                        <p>{overview}</p>
                    </div>
                    <div className="movie-trailer">
                        {(this.state.videoObject) ? (<YouTube videoId={this.state.videoObject.key} opts={opts}></YouTube>) : (<YouTube></YouTube>)}

                    </div>
                </div>
            </div>
        );
    }
}

export default Moviepage;
