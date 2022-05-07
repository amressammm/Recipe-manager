import React,{useEffect} from 'react'
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import  FormControlLabel from '@mui/material/FormControlLabel';
import  Button from '@mui/material/Button';
import "../styles/signIn.css"
import {useNavigate  } from 'react-router-dom';
import { axios } from '../helpers/axios';


export const SignUp = () => {
    const navigate = useNavigate();
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState('');

    const submit = async() => {

        let res = await axios.post('/user/register', {name, email, password });
        if(res.data.error){
            
            setError(res.data.error)
            
        }else{
            localStorage.setItem('Recipe-Manager-Token', res.data.data);
           
               
                navigate("/homePage");
           
        }
    }

  return (
    <form className="form">
    <h1 className='title'>Welcome !!</h1>
    <div style={{ padding: 30 }}>
      
        <Grid
          container
          spacing={3}
          direction={'column'}
          justify={'center'}
          alignItems={'center'}
        >
        <Grid item xs={12}>
        <TextField label="Name" onChange={(e) =>{setName(e.target.value) }} ></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField label="Email" onChange={(e) => setEmail(e.target.value)}></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField label="Password" type={'password'} onChange={(e) =>{setPassword(e.target.value) }} ></TextField>
          </Grid>
          
          <Grid item xs={12}>
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth disabled={!email || !password||!name}  onClick={submit}> SignUp </Button>
            <p style = {{ color: 'red' }} hidden = {!error}>
            <p>{error}</p> 
            </p>
          </Grid>
        </Grid>
     
    </div>
    </form>
  )
}

