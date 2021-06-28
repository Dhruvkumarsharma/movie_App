import axios from 'axios';
import React, { Component } from 'react';
import Carousel from 'react-elastic-carousel';
import { API_KEY, API_URL, IMAGE_URL } from "../../API/secreates";
import YouTube from 'react-youtube';
import "./Crousel.css"

class Crousel extends Component {
    state = {
        trendobj:[],
        videoobj:[]
    }
    async componentDidMount(){
        let response = await axios.get(`${API_URL}/trending/all/day?api_key=${API_KEY}`);
        let data = response.data.results.slice(0, 10);
        let videoobj = data.map( (obj)=>{
            return obj.id;
        } )
        // console.log(videoobj);
        let movieObj = await Promise.all(videoobj.map( async (id)=>{
            // https://api.themoviedb.org/3/movie/646207/videos?api_key=865b483d55b619279149858c6786abcf&language=en-US
            let obj =  await axios.get(`${API_URL}/movie/${id}/videos?api_key=${API_KEY}&language=en-US`);
            return obj;
        } ));
        // console.log(movieObj);
        let ytobj = movieObj.map( (mobj)=>{
            console.log("inside ytobj");
            let vidObj = mobj.data.results;
             let yt = vidObj.filter( (obj) =>{
                if(obj.site == "YouTube" && obj.type == "Trailer"){

                    return true;
                }
                return false;
             } )
             return yt;
            // console.log(vidObj);
        } )
        ytobj = ytobj.map( (obj) => {
            if(obj.length > 0){
                if(obj.length == 1){
                    return obj[0];
                }else{
                    return obj[1];
                }
            }
        } )
        let videoArr = ytobj.filter( (obj)=>{
            if(obj){
                return true;
            }
            return false;
        } )

        console.log(videoArr);
        this.setState({
            trendobj:data,
            videoobj:videoArr
        })
      }
  
    //     // https://api.themoviedb.org/3/trending/all/day?api_key=865b483d55b619279149858c6786abcf
   
    render() {

        
        const opts = {
            height: '360',
            width: '1300',
            playerVars: {
            //   autoplay: 1,
            }
        }
        let vobj = this.state.videoobj;
        return (
            <Carousel>
                {vobj.map( (obj)=>{
                    return <YouTube className="slider" videoId={obj.key} opts={opts}></YouTube>

                } )}
            </Carousel>
        );
    }
}

export default Crousel;