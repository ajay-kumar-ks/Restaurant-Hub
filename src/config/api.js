import axios from "axios";
// import { json } from "react-router-dom";

export const API_BASE_URL="http://localhost:5454";

const jwtToken=localStorage.getItem("jwt")


export const api=axios.create({baseURL:API_BASE_URL,
    headers:{
        "Authorization":`bearer ${jwtToken}`,
        "Content-Type":"application/json"
    }})