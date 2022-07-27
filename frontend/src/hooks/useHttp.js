import { useState, useEffect } from "react";
import axios from "axios";

export const useHttp = () => {
  const token = localStorage.getItem("jwt");

  const request = axios.create({
    baseURL: "http://localhost:9000",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return request;
};
