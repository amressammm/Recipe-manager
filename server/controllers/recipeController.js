const Recipe =require("../models/Recipe");


exports.createRecipe= async(req,res)=>{
    const userId= req.user.id
    const title=req.body.title
    const ingredients=req.body.ingredients
    const recipe= req.body.recipe
    
    if(!title||!ingredients||!recipe||ingredients.length===0){
        return res.send({ error: 'Please fill all data required' })
    }
    
try{
    const recipeOutput =await Recipe.create({title,ingredients,recipe,userId})
    res.send({data:recipeOutput});
}catch(error){
    res.send({ error: error.toString() });
}
}

exports.getRecipeImage=async (req, res) => {
    try {
        const file = await gfs.files.findOne({ filename: req.params.filename });
        const readStream = gfs.createReadStream(file.filename);
        readStream.pipe(res);
    } catch (error) {
        res.send("not found");
    }
}


exports.getRecipes= async(req,res)=>{

  try{ 
      
      const userId= req.user.id
      let a = await Recipe.find({userId,})
       res.send({data:a})
        
    }catch(error){
        res.send({ error: error.toString() });
    }
}

exports.getRecipe= async(req,res)=>{

    try{ 
        const recipieID=req.params.id
      
        const userId= req.user.id
        let a = await Recipe.findOne({userId,_id:recipieID})
         res.send({data:a})
          
      }catch(error){
          res.send({ error: error.toString() });
      }
  }

  exports.editRecipe= async(req,res)=>{

    try{ 
        const recipieID=req.params.id
      
        const userId= req.user.id
        let a = await Recipe.findByIdAndUpdate(recipieID,req.body,{new: true})
         res.send({data:a})
          
      }catch(error){
          res.send({ error: error.toString() });
      }
  }

  exports.delete= async(req,res)=>{

    try{ 
        const recipieID=req.params.id
      
        const userId= req.user.id
        let a = await Recipe.deleteOne({userId,_id:recipieID})
         res.send({data:a})
          
      }catch(error){
          res.send({ error: error.toString() });
      }
  }

