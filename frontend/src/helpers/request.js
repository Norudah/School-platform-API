import axios from "axios";

const token = localStorage.getItem("jwt");

const request = axios.create({
  baseURL: "http://localhost:9000",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});

export default request;
