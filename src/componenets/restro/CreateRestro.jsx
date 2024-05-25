import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import Textarea from '@mui/joy/Textarea';
import { useDispatch } from 'react-redux';
import { createRestroAction } from '../../Redux/restro/restro.action';

const CreateRestro = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      restroName: "",
      location: "",
      city: "",
    },
  });

  const onSubmit = (values) => {
    console.log('Registered Restro -', values);
    dispatch(createRestroAction({ data: values }));
  };

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
        marginTop: '13%',
      }}
    >
      <Typography variant="h5" component="div" sx={{ mb: 2 }}>
        Register your Restaurent
      </Typography>
      <TextField
        
        label="Restaurent Name"
        {...register('restroName', {
          required: 'Name is required',
          minLength: {
            value: 3,
            message: 'Name must be at least 3 characters',
          },
        })}
        error={Boolean(errors.username)}
        helperText={errors.username?.message}
        margin="normal"
      /> 
      <Textarea
        
        type="text"
        placeholder="Discription about your restaurent"
        {...register('discription')}
        margin="normal"
        sx={{ mt: 2 }}
      />

<TextField
        
        label="City"
        {...register('city', {
          required: 'city is required',
          minLength: {
            value: 3,
            message: 'city must be at least 3 characters',
          },
        })}
        error={Boolean(errors.username)}
        helperText={errors.username?.message}
        margin="normal"
      />

<TextField
        
        label="Location as Google map link"
        {...register('location', {
          required: 'location is required',
          minLength: {
            value: 3,
            message: 'location must be at least 3 characters',
          },
        })}
        error={Boolean(errors.username)}
        helperText={errors.username?.message}
        margin="normal"
      />
      <TextField
        
        label="Address"
        {...register('adress', {
          required: 'Address is required',
          minLength: {
            value: 3,
            message: 'address must be at least 3 characters',
          },
        })}
        error={Boolean(errors.username)}
        helperText={errors.username?.message}
        margin="normal"
      />
 
      <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
       Register
      </Button>
    </Box>
  );
};

export default CreateRestro;
