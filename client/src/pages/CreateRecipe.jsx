import React from 'react';
import { useState } from "react";
import { Typography, Button, TextField, Box, ButtonBase, Tooltip } from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import IngredientsInput from '../components/IngredientsInput';
import Steps from '../components/Step';
import { useDispatch, useSelector } from 'react-redux';
import { createRecipe } from '../actions/recipe';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import axios from "axios";



function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },

}));

const CreateRecipe = (props) => {
  const classes = useStyles();
  const history = useHistory();

  const dispatch = useDispatch();

  const { user } = useSelector(state => state.auth);
  const [loading, setLoading] = useState(false);
  const { message } = useSelector(state => state.message);
  const [open, setOpen] = useState(true);

  const [selectFile, setFile] = useState(null);

  if (!user) {
    history.push(`/login`);
    window.location.reload();
  }
  const [recipe, setRecipe] = useState({
    "title": '', "description": '', "cuisine": '',
    "mealtype": '', "prep_time": null, "cook_time": null,
    "video": '', "uid": user.uid, "image": '', "method": ''
  });
  const [ingredientsList, setIngredientsList] = useState([]);

  const [textArea, setTextArea] = useState([]);

  const handleRecipeInput = (e) => {
    const { name, value } = e.target;
    setRecipe({ ...recipe, [name]: value });
  }

  const ingredientData = (ingredients) => {
    setIngredientsList(ingredients);
  }

  const stepsData = (step) => {
    setTextArea(step);
  }

  const changeFile = (event) => {
    setFile(event.target.files[0])
  }

  const deleteImage = () => {
    setFile(null);
  }

  const create = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(textArea);
    const ins = [];
    let imgs = [];

    for (let i = 0; i < textArea.length; i++) {
      ins.push({ 'instructions': textArea[i].instructions, 'image': '', 'timer': textArea[i].timer });
      if (textArea[i].image) imgs.push(textArea[i].image);
    }
    const instructions = JSON.stringify(ins);

    const ingredients = [];

    for (let i = 0; i < ingredientsList.length; i++) {
      ingredients.push({ "iid": ingredientsList[i].id, "quantity": ingredientsList[i].quantity, "unit": ingredientsList[i].unit, "technique": ingredientsList[i].technique });
    }
    const quantities = JSON.stringify(ingredients);


    const body = { "recipe": recipe, "instructions": instructions, "quantities": quantities };

    try {
      const res = await dispatch(createRecipe(body))
      let recipeData = res.data.response;
      let rid = recipeData[0]['rid'];
      let sid = recipeData.map(item => {
        return item['sid']
      })

      if (selectFile) {
        const data = new FormData();
        data.append(
          "myFile",
          selectFile,
          `${rid}_main_${selectFile.name}`
        );
        const images = JSON.stringify({ "rid": rid, "main_image": `${rid}_main_${selectFile.name}` })
        data.append('images', images)
        await axios.post('http://localhost:3000/recipe/upload', data);
      }

      if (imgs) {
        const data = new FormData();
        let stepImages = []
        for (let x = 0; x < imgs.length; x++) {
          data.append('myFiles', imgs[x], `${rid}_${sid[x]}_${imgs[x].name}`);
          stepImages.push({ "sid": sid[x], "image": `${rid}_${sid[x]}_${imgs[x].name}` });
        }
        const images = JSON.stringify({ "rid": rid, "steps": stepImages });
        data.append('images', images);
        await axios.post('http://localhost:3000/recipe/uploadSteps', data);
      }

      history.push(`/profile/${user.uid}`);
      window.location.reload();
    } catch (err) {
      console.log(err);
      setOpen(true);
      setLoading(false);
    }
  }
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };


  return (
    <form onSubmit={create}>
      <Container maxWidth="sm">
        <Typography variant="h6" style={{ "marginTop": "20px", "fontWeight": 900 }}>
          Create A Recipe
        </Typography>
        <Box m={2} pt={3}>
          <TextField fullWidth label="Title" name="title" value={recipe.title} onChange={handleRecipeInput} required />
        </Box>
        <Box style={{ "textAlign": "left" }} pt={1}>
          <input accept="image/*" className={classes.input} onChange={changeFile} id="icon-button-file" name="profilePic" type="file" style={{ "display": "none" }} />
          <label htmlFor="icon-button-file">
            <IconButton color="primary" aria-label="upload picture" component="span">
              <PhotoCamera />
            </IconButton>
            <span style={{ "fontWeight": 500 }}>
              Main Image
            </span>
          </label>
          {selectFile && (<Box m={2} pt={0}>
            File Selected: {selectFile.name}
            <Tooltip title="Remove Image">
              <ButtonBase>
                <HighlightOffIcon
                  className={classes.button}
                  onClick={deleteImage} />
              </ButtonBase>
            </Tooltip>
          </Box>)}
        </Box>
        <Box m={2}>
          <TextField fullWidth label="Cuisine" name="cuisine" value={recipe.cuisine} onChange={handleRecipeInput} required />
        </Box>
        <Box m={2} pt={3}>
          <TextField fullWidth label="Meal Type" name="mealtype" value={recipe.mealtype} onChange={handleRecipeInput} required />
        </Box>
        <Box m={2} pt={3}>
          <TextField fullWidth label="Prep Time" name="prep_time" value={recipe.prep_time} onChange={handleRecipeInput} required />
        </Box>
        <Box m={2} pt={3}>
          <TextField fullWidth label="Cook Time" name="cook_time" value={recipe.cook_time} onChange={handleRecipeInput} required />
        </Box>
        <Box m={2} pt={3}>
          <TextField fullWidth label="Cooking Method" name="method" value={recipe.method} onChange={handleRecipeInput} required />
        </Box>
        <Box m={2} pt={3}>
          <TextField fullWidth label="Youtube Link" name="video" value={recipe.video} onChange={handleRecipeInput} />
        </Box>
        <Box m={2} pt={3}>
          <TextField
            id="outlined-multiline-static"
            multiline
            fullWidth
            rows={4}
            label="Description"
            name="description"
            value={recipe.description}
            onChange={handleRecipeInput}
            variant="outlined"
            required
          />
        </Box>
        <Box m={2} pt={1}><hr /></Box>
        <IngredientsInput ingredientData={ingredientData} inputData={[]} type={'create'} />
        <Box m={2} pt={1}><hr /></Box>
        <Steps stepsData={stepsData} />
        <Box m={2} pt={0}><hr /></Box>
        <Box m={2} pt={1}>
          <Button variant="contained" color='primary' type='submit'>{!loading ? ('Create Recipe!') : (<CircularProgress color="inherit" size={25} />)}</Button>
        </Box>
      </Container>
      {message && (
        <div className={classes.root}>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={message.severity}>
              {message.text}
            </Alert>
          </Snackbar>
        </div>
      )}
    </form>
  )
}

export default CreateRecipe;
