import http from "../http-common";
const URL = "/api/v1";
class MovieDataService {
  async getAll(page = 0) {
 /* / const x =  await fetch(`/api/v1/movies?page=${page}`,{
      method: 'GET',
      mode: "cors",
      headers: {
        'Content-Type': 'application/json',
      },
   });
    return await x.json();*/
    return http.get(`movies?page=${page}`);
  }

  get(id) {
    
    return http.get(`/id/${id}`);
  }

  find(query, by = "title", page = 0) {
    return http.get(`movies?${by}=${query}&page=${page}`);
  } 

  async createReview(data) {
    return await fetch(URL + '/comments', {
      method: 'POST',
      mode: "cors",
      headers: {
        Authorization: `Bearer ${data.jwt}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        movie_id: data.movie_id,
        name: data.name,
        text: data.text,
      }),
    })
    
  }

  async updateReview(data) {
    return await fetch(URL + '/comments', {
      method: 'PUT',
      mode: "cors",
      headers: {
        Authorization: `Bearer ${data.jwt}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        review_id: data.review_id,
        name: data.name,
        text: data.text,
      }),
    })
    
  }

  async deleteReview(id, jwt ) {
    
    return await fetch(URL + '/comments', {
    method: 'DELETE',
      mode: "cors",
      headers: {
        Authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        comment_id : id,
      }),
    })
  }

 /* getGenres(id) {
    return http.get(`/genres`);
  }*/

}

export default new MovieDataService();
