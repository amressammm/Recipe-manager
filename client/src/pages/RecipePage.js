import React,{useEffect} from 'react'
import { useLocation } from "react-router-dom";
import { checkLogin } from '../helpers/constant';
import { axios } from '../helpers/axios';
import { useNavigate  } from 'react-router-dom';
import NavBar from '../components/NavBar'
import Button from '@mui/material/Button';
import '../styles/recipiePage.css'


export const RecipePage = () => {
    const navigate = useNavigate();
    const [data, setData] = React.useState([]);
    const [ingredients, setIngredients] = React.useState("");
    const { state } = useLocation();

    const getRecepies=async()=>{
        
        let res = await axios.get(`/recipe/getRecipe/${state.a}`);
        setIngredients(Ingredients(res.data.data.ingredients))
        setData(res.data.data);
        // console.log(res.data.data);
      }
    const deleteRecipe=async()=>{

    let res = await axios.delete(`/recipe/deleteRecipe/${state.a}`);
    navigate("/homePage")
    }

    const editRecipe=()=>{
      let x=state.a
      navigate("/editPage",{ state: {x} } )

    }

    const Ingredients=(list)=>{
        let output="";
        if(typeof list==='undefined')
            return
        for( let i=0;i<list.length;i++){
          if(i===list.length-1)
          output+=list[i]
          else{
           output+=list[i]+", "
          }
        }
        return output;
      }

    useEffect(() => {

        
        let userData = checkLogin();

        
        if (userData) {
            getRecepies();
           
          }else{
            navigate("/");
         }
        
    }, [])



  return (<div className='container'>
      <NavBar/>
    <div className='cont'>
    <div className='img'>
    <img src="https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg" alt="Girl in a jacket" width="250" height="260"></img><br/>
    <Button variant="outlined" color="error" onClick={deleteRecipe}>Delete</Button>
    <Button variant="contained" className='edit' onClick={editRecipe} >Edit</Button>

    </div>
    <div className='disc'>
    <h1>{data.title}</h1>
    <br/>
    <p>Ingredients: {ingredients}</p><br/><br/>
    
    <p>Recipe: {data.recipe}</p>

    
    </div>

    
    </div>
    </div>
  )
}
