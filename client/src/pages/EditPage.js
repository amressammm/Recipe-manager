import React, { useEffect } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

import Button from "@mui/material/Button";
import "../styles/signIn.css";
import { axios } from "../helpers/axios";
import { checkLogin } from "../helpers/constant";
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export const EditPage = () => {
  const navigate = useNavigate();

  const [title, setTitle] = React.useState("");
  const [recipe, setRecipe] = React.useState("");
  const [ingredients, setIngredients] = React.useState([]);
  const [error, setError] = React.useState("");
  const { state } = useLocation();

  const ingredientsHandler = () => {
    return ingredients.split(",");
  };

  const handle = async () => {
    let o = {};
    if (title !== "") o.title = title;
    if (ingredients.length !== 0) o.ingredients = ingredientsHandler();
    if (recipe !== "") o.recipe = recipe;

    let res = await axios.patch(`/recipe/editRecipe/${state.x}`, o);

    if (res.data.error) {
      setError(res.data.error);
    } else {
      let a = state.x;

      navigate("/recipePage", { state: { a } });
    }
  };

  useEffect(() => {
    let userData = checkLogin();

    if (!userData) {
      navigate("/");
    }
  }, []);
  return (
    <div>
      <NavBar />

      <form className="form">
        <h1 className="title">Edit recipe !</h1>
        <div style={{ padding: 30 }}>
          <Grid
            container
            spacing={3}
            direction={"column"}
            justify={"center"}
            alignItems={"center"}
          >
            <Grid item xs={12}>
              <TextField
                label="Title"
                onChange={(e) => setTitle(e.target.value)}
              ></TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Ingredients seperated by ,"
                onChange={(e) => {
                  setIngredients(e.target.value);
                }}
              ></TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Recipe"
                onChange={(e) => {
                  setRecipe(e.target.value);
                }}
              ></TextField>
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                disabled={
                  (title === "") & (recipe === "") & (ingredients.length === 0)
                }
                onClick={handle}
              >
                {" "}
                Edit{" "}
              </Button>
              <p style={{ color: "red" }} hidden={!error}>
                <p>{error}</p>
              </p>
            </Grid>
          </Grid>
        </div>
      </form>
    </div>
  );
};
