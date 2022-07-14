import React, { useState, useEffect } from "react";
import MovieDataService from "../services/movie";
import { Link } from "react-router-dom";

const Movie = props => {
  const initialMovieState = {
    id: null,
    title: "",
    poster: "",
    plot: "",
    imdb: {},
    genres: {},
    cast:{},
    text: []
  };
  const [movie, setMovie] = useState(initialMovieState);

  const getMovie = id => {
    MovieDataService.get(id)
      .then(response => {
        setMovie(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e,id);
      });
  };

  useEffect(() => {
    getMovie(props.match.params.id);
  }, [props.match.params.id]);

  const deleteReview = (commentsId, index) => {
    MovieDataService.deleteReview(commentsId, props.user.id)
      .then(response => {
        setMovie((prevState) => {
          prevState.commentss.splice(index, 1)
          return({
            ...prevState
          })
        })
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {movie ? (
        <div>
          <h5>{movie.title}</h5>
          <p>
            <strong>Plot: </strong>{movie.plot}<br/>
            <strong>imdb: </strong>
          </p>
          <Link to={"/movies/" + props.match.params.id + "/review"} className="btn btn-primary">
            Add Review
          </Link>
          <h4> Reviews </h4>
          

        </div>
      ) : (
        <div>
          <br />
          <p>No movie selected.</p>
        </div>
      )}
    </div>
  );
};

export default Movie;