import React, { useState, useEffect } from "react";
import MovieDataService from "../services/movie";
import { Link } from "react-router-dom";
import "../index.css";
const MoviesList = props => {
  const [movies, setMovies] = useState([]);
  const [searchTitle, setSearchTitle ] = useState("");
  const [searchGenres, setSearchGenre ] = useState("");
  const [genres, setGenres] = useState(["All Genres"]);

  useEffect(() => {
    retrieveMovies();
   // retrieveGenres();
  }, []);

  const onChangeSearchTitle = e => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  useEffect(() => {
    document.title = 'Movies';
  });
  

  const retrieveMovies = () => {
    MovieDataService.getAll()
      .then(response => {
        
        setMovies(response.data.movies);
        
      })
      .catch(e => {
        console.log(e);
      });
  };

 /* const onChangeSearchGenre = e => {
    const searchGenres = e.target.value;
    setSearchGenre(searchGenres);
    
  };

  const retrieveGenres = () => {
    MovieDataService.getGenres()
      .then(response => {
        console.log(response.data);
        setGenres(["All Genres"].concat(response.data));
        
      })
      .catch(e => {
        console.log(e);
      });
  };*/

  const refreshList = () => {
    retrieveMovies();
  };

  const find = (query, by) => {
    MovieDataService.find(query, by)
      .then(response => {
        console.log(response.data);
        setMovies(response.data.movies);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByTitle = () => {
    find(searchTitle, "title")
  };
  

  const findByGenre = () => {
    if (searchGenres == "All Genres") {
      refreshList();
    } else {
      find(searchGenres, "genres")
    }
  };

  const handleKeyPress = (event) => {
    
    if(event.key === 'Enter'){
      findByTitle();
    }
  }

  return (
    <div>
      <div className="row pb-1">
        <div className="input-group col-lg-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search by Title"
            value={searchTitle}
            onChange={onChangeSearchTitle}
            onKeyPress={handleKeyPress}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByTitle}
              
            >
              Search
            </button>
          </div>
        </div>
        
        <div className="input-group col-lg-4">

      

        </div>
      </div>
      <div className="row">
        {movies.map((movie) => {
          const address = `${movie.imdb.rating}`;
          const genre = [""];
          const cast = [""];
         if(movie.genres != null){
          Object.keys(movie.genres).forEach(key => {
            genre.push(movie.genres[key] + ' ');
           });
          }else{
            genre.push("N/A");
          }
          
          if(movie.cast != null){
            Object.keys(movie.cast).forEach(key => {
              cast.push(movie.cast[key] + ', ');
           });
          }else{
            cast.push("N/A");
          }
          return (
            <div className="col-lg-4 pb-1 container-sm ">
              <div className="card movie border-dark ">
                <div className="card-body">
                  <h5 className="card-title">{movie.title}</h5>
                  <img src={movie.poster} className="poster mx-auto d-block" ></img>
                  <p className="card-text">
                    <strong>Plot: </strong>{movie.plot}<br/>
                    <strong>Year of release: </strong>{movie.year}<br/>
                    <strong>Cast: </strong>{cast}<br/>
                    <strong>Genre: </strong>{genre}<br/>
                    
                    <strong>IMDB RAITNG: </strong>{address}
                  </p>
                  <div className="row">
                  <Link to={"/movies/"+movie._id} className="btn btn-primary col-lg-5 mx-1 mb-1">
                    View Reviews
                  </Link>
                  
                  </div>
                </div>
              </div>
            </div>
          );
        })}


      </div>
    </div>
  );
};

export default MoviesList;