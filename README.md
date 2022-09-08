# Movie Reviews

The purpose of this website is to help users to find movies and review them. Once a user creates an account, they will be able to leave a review and then be able to update or delete it.



# api endpoints
#### Movies

- `GET /api/v1/movies/search/:query` - searchs all movies containing query string.
- `GET /api/v1/movies/id/:id` - searches for a movie by it's id. It returns a movie and all of the user reviews.
- `POST /api/v1/movies/reviews` - Creates a review.
- `PUT /api/v1/movies/reviews` - Updates a review.
- `DELETE /api/v1/movies/reviews` - Deletes a review.

#### Users
- `POST /api/v1/users/register` - Registers a user and checks that email has not been registrated yet.
- `POST /api/v1/users/signin` - Creates a JSON web token and inserts it into sessions database.
- `POST /api/v1/users/logout` - Removes JSON Web token from sessions database.
