import React,{useEffect} from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import NavBar from '../components/NavBar'
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import RecipeCard from '../components/RecipeCard';
import { Link,useNavigate  } from 'react-router-dom';
import { axios } from '../helpers/axios';
import { checkLogin } from '../helpers/constant';

import '../styles/homePage.css'

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  

export const HomePage = () => {
  const navigate = useNavigate();
  const [data, setData] = React.useState([]);


const getRecepies=async()=>{
  let res = await axios.get(`recipe/getRecipes`);
  setData(res.data.data);
  // console.log(res.data.data);
}
  useEffect(() => {

    // setLoading(true);
     let userData = checkLogin();

    
         if (userData) {
           getRecepies();
          //   console.log(res.data);
         }else{
           navigate("/");
        }
        
    
}, [])


  return (
   < React.Fragment>
   
    <CssBaseline />
    <NavBar/>
    <Container className='contain' maxWidth="lg">
    
    <Box sx={{ flexGrow: 1 }}>
    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
      {Array.from(data).map((e) => 
      {
        return(
        <Grid item xs={2} sm={4} md={4} >
          <RecipeCard title={e.title} ingredients={e.ingredients}  id={e._id}/>
        </Grid>
      )})}
    </Grid>
  </Box>
  </Container>
  </React.Fragment>
  )
}
