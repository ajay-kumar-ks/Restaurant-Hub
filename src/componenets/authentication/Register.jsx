import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { registerUserAction } from '../../Redux/Auth/auth.action';
import CustomAlert from '../CustomAlert';

const Register = () => {

  const dispatch=useDispatch();
  const navigate=useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
   
  
    try {
      console.log("handle submit", data);
      await dispatch(registerUserAction({ data: data }));
       alert("register success");
      navigate('/login'); 
    } catch (error) {
      console.error("Register error", error);
    }
  };
  
const item=false;

  return (
    <>
    <CustomAlert item={item}/>
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
        marginTop:'10%'

      }}
    >
      
      <Typography variant="h5" component="div" sx={{ mb: 2 }}>
         Registration Form
      </Typography>
      <TextField
        fullWidth
        label="Name"
        {...register('firstname', {
          required: 'Username is required',
          minLength: {
            value: 3,
            message: 'Username must be at least 3 characters',
          },
        })}
        error={Boolean(errors.username)}
        helperText={errors.username?.message}
        margin="normal"
      />
      
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
  error={Boolean(errors.Email)}
  helperText={errors.Email?.message}
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
        <Box mt={1}>
          <Link sx={{cursor:'pointer'}} onClick={()=>navigate("/Login")} variant="body2">
            Allready have an account just Login
          </Link>
        </Box>
      </Box>
    </Box>
    </>
  );
};

export default Register;