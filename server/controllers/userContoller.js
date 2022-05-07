const User = require("../models/User");
const bcrypt = require("bcryptjs");
const passport = require('passport');
const { findOne } = require("../models/User");



exports.register = async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  let password = req.body.password;
  try {
    if (!name || !email || !password) {
      return res.send({ error: "Data is missing" });
    }
    password = await bcrypt.hash(req.body.password, 12);

    const user = await User.create({ name, email, password });

    const token = await user.generateAuthToken();

    return res.send({ data: `Bearer ${token}`, data2: user });
  } catch (error) {
    if(error.errors)
    return res.send({error:error.errors.email.message})

    if(error.driver)
    return res.send({error:"This email already exists"})

    res.send({ error});
  }
};

exports.login = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  passport.authenticate("emailLogin", async function (err, user, message) {
    if (err) return next(err);

    if (!user) return res.send({error:message.message});

    req.login(user, async function (err) {
      try {
        if (err) return next(err);

        const token = await user.generateAuthToken();
        return res.send({ data: `Bearer ${token}`, data2: user });
      } catch (error) {
        res.send({error});
      }
    });
  })(req, res, next);
};

exports.addToWatchList=async(req,res)=>{
  const movieID=req.body.id
  const image=req.body.image
  const title=req.body.title
  const user=req.user

  
  
  try {

    for(let i=0;i<user.watchLaterList.length;i++){
      if(movieID===user.watchLaterList[i].movieID)
      throw new Error("movie already exists")
    }

    user.watchLaterList.push({movieID,title,image})
    
    await User.findByIdAndUpdate(user._id,user)
    
    return res.send({data:user})
    
  } catch (error) {
    res.send({error:error.toString()})
    
  }
}

exports.removeFromWatchLater=async(req,res)=>{
  const movieID=req.body.id
  const user=req.user
  let list =user.watchLaterList

  for(let i=0;i<list.length;i++){
      if(movieID===list[i].movieID){
        
      list.splice(i,1)
      break}
  }
  
  
  try {
    
    await User.findByIdAndUpdate(user._id,{watchLaterList:list})
    
    return res.send({data:user})
    
  } catch (error) {
    res.send({error:error.toString()})
    
  }
}

exports.getWatchLaterList=async(req,res)=>{
const user=req.user
const list=user.watchLaterList

return res.send({data:list})


}