import React, { Component } from 'react';
import "./Header.css";
import { Link } from 'react-router-dom';


class Header extends Component {
    state = {
        value: ""
    }
    handleOnChange = (e) => {
        let currValue = e.target.value;
        this.setState({
            value: currValue
        })
    }


    handleOnKey = (e) => {
        if (e.key == "Enter") {
            this.props.setMovie(this.state.value);
        }

    }



    render() {
        return (
            <div className="header">
                <div onClick={()=>{window.location.reload(false)}} className="logo">
                    <img src="logo.svg" alt="" />
                </div>
                <div className="search-btn">
                    <input type="text" className="search-movies" onKeyPress={this.handleOnKey} onChange={this.handleOnChange} placeholder="Search" />
                </div>
                <div className="header-links">
                    <div className="header-link">
                        <Link to="/">Home</Link>
                    </div>
                    <div className="header-link">
                        <Link to="/fav">Favourites</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;