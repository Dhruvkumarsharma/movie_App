import axios from 'axios';
import React, { Component } from 'react';
import Header from "./Components/Header/Header.jsx";
import Movies from "./Components/Movies/Movies.jsx";
import { API_KEY, API_URL } from "./API/secreates";
import Pagination from './Components/Pagination/Pagination.jsx';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Favourite from "./Components/Favourite/Favourite";
import MoviePage from "./Components/MoviePage/MoviePage";
import Crousel from './Components/Crousel/Crousel.jsx';
// import "App.css"
class App extends Component {
  state = {
    moviesData: [],
    currentMovie: "avengers",
    pages: [],
    currPage: 1,
    fav: [],
    flag:false,
    isfav:false,
  }
  
  setMovie = async (movieName) => {
    let data = await axios.get(API_URL + "/search/movie", {
      params: { api_key: API_KEY, page: 1, query: movieName },
    });
    let moviesdata = data.data.results;
    let pagesCount = data.data.total_pages;
    let pages = [];
    for (let i = 1; i <= pages.length; i++) {
      pages.push(i);
    }


    this.setState({
      moviesData: moviesdata,
      currentMovie: movieName,
      pages: pages,
      flag:true
    })

  }


  async componentDidMount() {
    let data = await axios.get(API_URL + "/search/movie", {
      params: { api_key: API_KEY, page: 1, query: this.state.currentMovie },
    });
    let moviesdata = data.data.results;
    // console.log(moviesdata);
    let pagesCount = data.data.total_pages;
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
      pages.push(i);
    }
    this.setState({
      moviesData: moviesdata,
      pages: pages
    })
  }


  nextPage = async () => {

    let data = await axios.get(API_URL + "/search/movie", {
      params: {
        api_key: API_KEY,
        page: this.state.currPage + 1,
        query: this.state.currentMovie,
      },
    });

    let moviesData = data.data.results;
    this.setState({
      moviesData: moviesData,
      currPage: this.state.currPage + 1,
    });

  }


  previousPage = async () => {

    let data = await axios.get(API_URL + "/search/movie", {
      params: {
        api_key: API_KEY,
        page: this.state.currPage - 1,
        query: this.state.currentMovie,
      },
    });

    let moviesData = data.data.results;
    this.setState({
      moviesData: moviesData,
      currPage: this.state.currPage - 1,
    });
  }


  setPage = async (pageCount) => {
    let data = await axios.get(API_URL + "/search/movie", {
      params: {
        api_key: API_KEY,
        page: pageCount,
        query: this.state.currentMovie,
      },
    });
    // console.log(data);
    let moviesData = data.data.results;
    this.setState({
      moviesData: moviesData,
      currPage: pageCount,
    });
  };
  setFav = (movieObj) => {
    let mobj = this.state.fav;
    let myfav = mobj.filter((movobj) => {
      return movobj == movieObj;
    })
    if (myfav.length == 0 && this.state.isfav == false) {
      mobj.push(movieObj);
      this.setState({
        fav: mobj,
        isfav:true,
      })


    }
    if(this.state.isfav == true){
      let mmobj = this.state.fav.filter( (obj)=>{
        if(obj != movieObj){
          return true;
        }
        return false;
      } )
      this.setState({
        fav:mmobj,
        isfav:false,
      })
    }
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Header setMovie={this.setMovie}></Header>


          <Switch>
            <Route path="/" exact>
              {(this.state.moviesData.length) ? (
                <React.Fragment>
                  <br></br>
                  <div>
                    {this.state.flag ? <></>:
                    (<Crousel></Crousel>)
                    }
                  

                  </div>
                  <Movies moviesData={this.state.moviesData}></Movies>
                  <Pagination pages={this.state.pages}
                    currPage={this.state.currPage}
                    nextPage={this.nextPage}
                    previousPage={this.previousPage}
                    setPage={this.setPage}
                  ></Pagination>
                </React.Fragment>
              ) : (
                <h1>Oops No Movies Found !!</h1>
              )
              }
            </Route>


            <Route path="/fav" render={(props) => (<Favourite {...props} fav={this.state.fav}></Favourite>)} exact></Route>


            <Route path="/moviepage" render={(props) => (<MoviePage {...props} setfav={this.setFav} fav={this.state.fav}></MoviePage>)} exact ></Route>


          </Switch>
        </div>
      </Router>



    );
  }
}

export default App;


