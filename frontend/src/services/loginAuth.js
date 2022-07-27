import http from "../http-common";
import jwt_decode from "jwt-decode";


class loginDataService {
  login(email, password) {
    const {data:jwt } = http.post("/login", { email, password });
    localStorage.setItem("jwt", jwt);
  }

  logout() {
    localStorage.removeItem("jwt");
    }


  getJwt() {
    return localStorage.getItem("jwt");
  }
  
  getUser() {
    try {
      const jwt = this.getJwt();
      const decoded = jwt_decode(jwt);
      return decoded;
    } catch(e) {
      return null;
    }

  }
}