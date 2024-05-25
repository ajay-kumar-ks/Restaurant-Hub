import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { loginUserAction } from '../../Redux/Auth/auth.action';
import { useDispatch } from 'react-redux';

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [responseError, setResponseError] = useState(null); // State to hold response error
  const [responseData, setResponseData] = useState(null); // State to hold response data

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      console.log("handle submit", data);
      const response = await dispatch(loginUserAction({ data: data }));
      console.log("login Success", response.data);
      setResponseData(response.data); // Set response data to state
      setResponseError(null); // Clear any previous error
      navigate('/');
    } catch (error) {
      console.error("Login error", error);
      if (error.response && error.response.data && error.response.data.message) {
        setResponseError(error.response.data.message); // Set specific error message from response data
      } else {
        setResponseError(error.message); // Set general error message
      }
      setResponseData(null); // Clear any previous data
    }
  };
  

  const [isVisible, setIsVisible] = useState(false); // Initialize isVisible state to false

  useEffect(() => {
    if (responseError || responseData) {
      setIsVisible(true); // Set isVisible to true when there is new data to display
      const timer = setTimeout(() => {
        setIsVisible(false); // Reset isVisible to false after a certain duration
        setResponseError("");
      }, 5000); // 5000 milliseconds = 5 seconds
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false); // Reset isVisible to false when there is no error or response data
    }
  }, [responseError, responseData]); // Re-run effect when responseError or responseData changes
  
  
  

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        maxWidth: '500px',
        margin: 'auto',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        backgroundColor: 'white',
        marginTop: '13%'
      }}
    >

      
      <Typography variant="h5" component="div" sx={{ mb: 2 }}>
        Login Form
        </Typography>
      {responseError &&  <Typography color="error" style={{ display: isVisible ? "flex" : "none" }}>{responseError}</Typography>}
      {responseData &&<Typography color="success" style={{ display: isVisible ? "flex" : "none" }}>{JSON.stringify(responseData)}</Typography>}

      <TextField
        fullWidth
        label="Email"
        {...register('email', {
          required: 'Email is required',
          minLength: {
            value: 3,
            message: 'Email must be at least 3 characters',
          },
        })}
        error={Boolean(errors.username)}
        helperText={errors.username?.message}
        margin="normal"
      />
      <TextField
        fullWidth
        type="password"
        label="Password"
        {...register('password', {
          required: 'Password is required',
          minLength: {
            value: 6,
            message: 'Password must be at least 6 characters',
          },
        })}
        error={Boolean(errors.password)}
        helperText={errors.password?.message}
        margin="normal"
        sx={{ mt: 2 }}
      />
 
      <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
        Login
      </Button>
      <Box sx={{ mt: 2, textAlign: 'center' }}>
        <Link href="#" variant="body2">
          Forgot Password?
        </Link>
        <Box mt={1}>
          <Link sx={{cursor:'pointer'}} onClick={()=>navigate("/register")} variant="body2">
            Don't have an account? Sign Up
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginForm;
