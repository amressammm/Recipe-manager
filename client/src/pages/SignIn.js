import React,{useEffect} from 'react'
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import  FormControlLabel from '@mui/material/FormControlLabel';
import  Button from '@mui/material/Button';
import "../styles/signIn.css"
import { Link,useNavigate  } from 'react-router-dom';
import { axios } from '../helpers/axios';
import { checkLogin } from '../helpers/constant';




export const SignIn = () => {
    const navigate = useNavigate();
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState('');

    const submit = async() => {

        

        let res = await axios.post('/user/login', { email, password });
        if(res.data.error){
            
            setError(res.data.error)
            
        }else{
            localStorage.setItem('Recipe-Manager-Token', res.data.data);
           
               
                navigate("/homePage");
           
        }
    }

    useEffect(() => {

        // setLoading(true);
        let userData = checkLogin();

        
            // if (userData) {
                
            //     navigate("/homePage");
            // }
            
        
    }, [])

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
            <TextField label="Email" onChange={(e) => setEmail(e.target.value)}></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField label="Password" type={'password'} onChange={(e) =>{setPassword(e.target.value) }} ></TextField>
          </Grid>
          <Grid item xs={12}>
          <span style = {{ color: 'grey' }}>Don't have an account? </span>
          <Link to = '/register'> SignUp</Link>
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth disabled={!email || !password}  onClick={submit}> Login </Button>
            <p style = {{ color: 'red' }} hidden = {!error}>
            <p>{error}</p> 
            </p>
          </Grid>
        </Grid>
     
    </div>
    </form>
  );
};
  

