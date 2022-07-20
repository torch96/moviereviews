import React, { useState, useEffect } from "react";
import MovieDataService from "../services/movie";
import { Link } from "react-router-dom";

const Movie = props => {
  const initialMovieState = {
    id: null,
    title: "",
    poster: "",
    fullplot: "",
    imdb: {},
    genres: {},
    cast:{},
    num_mflix_comments: 0,
    comments: []
  };
  const [movie, setMovie] = useState(initialMovieState);

  const getMovie = id => {
    MovieDataService.get(id)
      .then(response => {
        setMovie(response.data);
        console.log(response.data);
        console.log(id);
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
          <img src={movie.poster} className="poster" ></img>
          <p>
            <strong>Plot: </strong>{movie.fullplot}<br/>
            <strong>imdb: </strong>
          </p>


            
          <Link to={"/movies/" + props.match.params.id + "/review"} className="btn btn-primary">
            Add Review
          </Link>
          <h4> Reviews </h4>
          <div className="row">
            {movie.num_mflix_comments
            > 0 ? (
             movie.comments.map((comment, index) => {
               return (
                 <div className="col-lg-4 pb-1" key={index}>
                   <div className="card">
                     <div className="card-body">
                       <p className="card-text">
                         {comment.text}<br/>
                         <strong>User: </strong>{comment.name}<br/>
                         <strong>Date: </strong>{comment.date}
                       </p>
                       {props.user && props.user.id === comment.user_id &&
                          <div className="row">
                            <a onClick={() => deleteReview(comment._id, index)} className="btn btn-primary col-lg-5 mx-1 mb-1">Delete</a>
                            <Link to={{
                              pathname: "/movies/" + props.match.params.id + "/review",
                              state: {
                                currentReview: comment
                              }
                            }} className="btn btn-primary col-lg-5 mx-1 mb-1">Edit</Link>
                          </div>                   
                       }
                     </div>
                   </div>
                 </div>
               );
             })
             ) : (
              <div className="col-sm-4">
                <p>No reviews yet.</p>
              </div>
              )}
            </div>
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