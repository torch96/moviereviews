import axios from "axios";

export default axios.create({
  baseURL: "/api/v1/",
  header:{
    "Content-type": "application/json"
  }
});
