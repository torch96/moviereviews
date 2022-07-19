import http from "../http-common";

class MovieDataService {
  getAll(page = 0) {
    return http.get(`movies?page=${page}`);
  }

  get(id) {
    console.log(id);
    return http.get(`/id/${id}`);
  }

  find(query, by = "title", page = 0) {
    return http.get(`movies?${by}=${query}&page=${page}`);
  } 

  createReview(data) {
    return http.post("/comments-new", data);
  }

  updateReview(data) {
    return http.put("/comments-edit", data);
  }

  deleteReview(id, userId) {
    return http.delete(`/comments-delete?id=${id}`, {data:{user_id: userId}});
  }

 /* getGenres(id) {
    return http.get(`/genres`);
  }*/

}

export default new MovieDataService();
