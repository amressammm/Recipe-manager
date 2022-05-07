const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const secret = require("../config/keys").secretOrKey;

const RecipeSchema = new Schema({
  title: {
    type: String,
    require: true,
  },

  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    requried: true
  },

  ingredients: [{
    type:String,
    require:true,
  }],

  recipe: {
    type: String,
    require: true,
  },

  imgUrl:
    {
      type:String,
    }

})
  
module.exports = User = mongoose.model("Recipe", RecipeSchema);

