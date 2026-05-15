// axios.js

import axios from "axios";

const API = axios.create({
  // baseURL: "http://localhost:12000",
  baseURL: "https://server.mkhomeservice.in",
});

export default API;