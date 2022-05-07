import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {useNavigate  } from 'react-router-dom';


 const RecipeCard = (props) => {
  const navigate = useNavigate();
   
   const Ingredients=(list)=>{
     let output="";
     for( let i=0;i<list.length;i++){
       if(i===list.length-1)
       output+=list[i]
       else{
        output+=list[i]+", "
       }
     }
     return output;
   }

  return (
    <Card sx={{ maxWidth: 345 }}>
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
       {props.title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Ingredients: {Ingredients(props.ingredients)}
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small" onClick={()=>{let a=props.id; navigate("/recipePage",{ state: { a } } )}}>View</Button> 
    </CardActions>
  </Card>
  )
}
export default RecipeCard
