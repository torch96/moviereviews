import React, { useState } from "react";
import MovieDataService from "../services/movie";
import { Link } from "react-router-dom";
import loginDataService from "../services/loginAuth";

const AddReview = props => {
  let initialReviewState = ""

  let editing = false;

  if (props.location.state && props.location.state.currentReview) {
    editing = true;
    initialReviewState = props.location.state.currentReview.text
  }
  
  const [review, setReview] = useState(initialReviewState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    setReview(event.target.value);
  };
  const user = loginDataService.getUser();
  const handleKeyPress = (event) => {
    
    if(event.key === 'Enter'){
      saveReview();
    }
  }
  const saveReview = () => {
    
    var data = {
      jwt: loginDataService.getJwt(),
      text: review,
      name: user.name,
      review_id: "",
      movie_id: props.match.params.id
    };
    
    if (editing) {
      data.review_id = props.location.state.currentReview._id
      
      MovieDataService.updateReview(data)
        .then(response => {
          setSubmitted(true);
          
        })
        .catch(e => {
          console.log(e);
        });
    } else {
      MovieDataService.createReview(data)
        .then(response => {
          setSubmitted(true);
          
        })
        .catch(e => {
          console.log(e);
        });
    }

  };

  return (
    <div>
      {(user.email != "") ? (
      <div className="submit-form">
        {submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <Link to={"/movies/" + props.match.params.id} className="btn btn-success">
              Back to Movie
            </Link>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="description">{ editing ? "Edit" : "Create" } Review</label>
              <input
                type="text"
                className="form-control"
                id="text"
                required
                value={review}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                name="text"
              />
            </div>
            <button onClick={saveReview} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>

      ) : (
      <div>
        Please log in.
      </div>
      )}

    </div>
  );
};

export default AddReview;