import * as React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import { FormControl, FormHelperText, FormLabel, Input } from '@mui/material';
import { useForm } from 'react-hook-form';


export default function Login() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  
  const{handleSubmit,register}=useForm();

  const onSummit = (data) => {
    setIsSubmitting(true);
    axios
      .post(`${baseUrl()}/users/login/`, data)
      .then((response) => {
        saveLogin(response.data.data);
        navigate("/new-reports");
      })
      .catch((data) => {
        toast({
          title: `${data.response.data.errors[0]}`,
          status: "error",
          isClosable: true,
        });
        setIsSubmitting(false);
      });
  }


  return (
   <form onSubmit={handleSubmit(onSummit)}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
            <FormControl>
              <FormLabel>Usuario</FormLabel>
              <Input 
                type='text'
                id="username"
                label="Usuario"
                name="username"
                autoComplete="username"
                {...register("username", {
                  required: "Usuario requerido",
                  minLength: { value: 4, message: "El usuario debe tener 4 caracteres como minimo" },
                })}
              />
            </FormControl>
            <FormHelperText></FormHelperText>
           
            <FormControl>
              <FormLabel>Contraseña</FormLabel>
              <Input
                name="password"
                label="Contraseña"
                type= "password"
                id="password"
                autoComplete="current-password"
                {...register("password", {
                  required: "Clave requerida",
                  minLength: { value: 4, message: "La clave debe tener 4 caracteres como minimo" },
                })}
              />
            </FormControl>
             <FormHelperText> </FormHelperText>

            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Recordar"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, }}
              onClick={onSummit}
            >
              Ingresar
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  olvidaste tu contraseña?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"No tienes cuenta?  Registrate"}
                </Link>
              </Grid>
            </Grid>
        </Box>
      </Container>
   </form>
    
   
  );
}