
import axios from "axios";
import { API_BASE_URL } from "../../config/api";
import {api} from "../../config/api"
// import api from "../../config/api";
import {
  Get_PROFILE_FAILURE,
  Get_PROFILE_REQUEST,
  Get_PROFILE_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  UPDATE_PROFILE_FAILURE,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
} from "./auth.actionType";

export const loginUserAction = (loginData) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });
    const response = await axios.post(`${API_BASE_URL}/auth/signin`, loginData.data);

    if (response.data.token) {
      localStorage.setItem("jwt", response.data.token);
    }

    dispatch({ type: LOGIN_SUCCESS, payload: response.data.token });
    return response; // Return the response object
  } catch (error) {
    console.error("Login error", error);
    if (error.response) {
      // Handle specific error cases if needed
    }
    dispatch({ type: LOGIN_FAILURE, payload: error });
    throw error; // Re-throw the error to allow component-level error handling
  }
};


export const registerUserAction = (loginData) => async (dispatch) => {
    dispatch({ type: REGISTER_REQUEST });
    try {
      const { data } = await axios.post(
        `${API_BASE_URL}/auth/users`,
        loginData.data
      );
  
      if (data.token) { // Update this check to match the actual response structure
        localStorage.setItem("jwt", data.token);
      }
      console.log("register success", data);
      dispatch({ type: REGISTER_SUCCESS, payload: data.token }); // Update payload to use data.token
    } catch (error) {
      console.log("-----------", error);
      dispatch({ type: REGISTER_FAILURE, payload: error });
    }
  };
  

export const getProfileAction = (jwt) => async (dispatch) => {
  dispatch({ type: Get_PROFILE_REQUEST });
  try {
    const { data } = await axios.get(`${API_BASE_URL}/api/users/profile`, {
      headers: {
        Authorization: `bearer ${jwt}`,
      },
    });

    console.log("profile --------", data);
    dispatch({ type: Get_PROFILE_SUCCESS, payload: data });
  } catch (error) {
    console.log("-----------", error);
    dispatch({ type: Get_PROFILE_FAILURE, payload: error });
  }
};

export const updateProfileAction = (reqData) => async (dispatch) => {
  dispatch({ type: UPDATE_PROFILE_REQUEST });
  try {
    const { data } = await api.put(`${API_BASE_URL}/api/users`, reqData);

    console.log("update profile --------", data);
    dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data });
  } catch (error) {
    console.log("-----------", error);
    dispatch({ type: UPDATE_PROFILE_FAILURE, payload: error });
  }
};
