import React, { Component } from 'react';
import Movies from '../Movies/Movies';
class Favourite extends Component {
    state = { 
        
     }
    render() {
        let fav = this.props.fav;
        return ( 
            <Movies moviesData={fav}></Movies>
         );
    }
}
 
export default Favourite;