import React from 'react';
import { Typography, Container, Box, Button, TextField } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { editRecipeDetails, editRecipeSteps, getFullRecipeToEdit } from '../actions/recipe';
import IngredientsInput from '../components/IngredientsInput';
import Steps from '../components/Step';
import { editRecipeIngredients } from '../actions/ingredient';
import axios from "axios";
import CircularProgress from '@material-ui/core/CircularProgress';


// const useStyles = makeStyles((theme) => ({
//   root: {
//     '& > *': {
//       margin: theme.spacing(1),
//       width: '25ch',
//     },
//   },
// }));
const EditRecipe = ({ match }) => {
  const { user } = useSelector(state => state.auth);
  // const classes = useStyles();
  const { params: { rid } } = match;
  const [details, setDetails] = React.useState({});
  const dispatch = useDispatch();
  const [ingredients, setIngredients] = React.useState([]);
  const [step, setStep] = React.useState([]);
  const [addIng, setAddIng] = React.useState([]);
  const [delIng, setDelIng] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [loadingDetails, setLoadingDetails] = React.useState(false);
  const [loadingIng, setLoadingIng] = React.useState(false);


  const getRecipe = async () => {
    const body = { 'uid': user.uid, 'rid': rid };
    dispatch(getFullRecipeToEdit(body))
      .then((res) => {
        console.log(res);
        const d = {
          'title': res[0].title, 'description': res[0].description, 'mealtype': res[0].mealtype, 'cuisine': res[0].cuisine,
          'prep_time': res[0].prep_time, 'cook_time': res[0].cook_time, 'image': res[0].main_image, 'video': res[0].video, 'method': res[0].method, rid: rid
        };
        setDetails(d);
        setIngredients(res[2]);
        console.log(res[1]);

        setStep(res[1].sort((step1, step2) => (+step2.sid) < (+step1.sid)));
      })
  }
  const addData = (ingredients) => {
    const l = [...addIng];
    l.push(ingredients);
    setAddIng(l);
  }

  const delData = (ingredients) => {
    setDelIng.push(ingredients);
  }
  React.useEffect(() => {
    getRecipe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRecipeInput = (e) => {
    const { name, value } = e.target;
    setDetails({ ...details, [name]: value });
  }

  const editDetails = async () => {
    setLoadingDetails(true);

    console.log(details);
    dispatch(editRecipeDetails({ recipe: details }))
      .then((res) => {
        console.log(details);
        // setDetails(details);
        console.log(res);
        setLoadingDetails(false);

      })
      .catch((err) => {
        console.log(err);
        setLoadingDetails(false);
      })

  }

  const editIngredients = async () => {
    let body = [];
    setLoadingIng(true);

    for (let i = 0; i < ingredients.length; i++) {
      body.push({ iid: ingredients[i].iid, quantity: ingredients[i].quantity, qid: ingredients[i].qid, unit: ingredients[i].unit, technique: ingredients[i].technique, rid: rid });
    }
    console.log(body);

    const recipe = { 'ingredients': body };
    console.log(recipe);
    dispatch(editRecipeIngredients(recipe))
      .then((res) => {
        setLoadingIng(false);
        console.log(res);
      })
      .catch((err) => {
        setLoadingIng(false);

        console.log(err);
      })
  }
  const editSteps = async () => {
    setLoading(true);
    let body = [];
    let imgs = [];
    const data = new FormData();
    try {
      for (let i = 0; i < step.length; i++) {
        if (step[i].image && typeof step[i].image === 'object') {
          body.push({ sid: step[i].sid, instructions: step[i].instructions, image: '', timer: step[i].timer, rid: rid });
          data.append("myFiles", step[i].image, `${rid}_${step[i].sid}_${step[i].image.name}`)
          imgs.push({ "sid": step[i].sid, "image": `${rid}_${step[i].sid}_${step[i].image.name}` });
        } else {
          body.push({ sid: step[i].sid, instructions: step[i].instructions, image: step[i].image, timer: step[i].timer, rid: rid });
        }
      }
      console.log(imgs);
      console.log(body);
      const recipe = { "steps": body };
      const res = await dispatch(editRecipeSteps(recipe));
      console.log(res);
      const images = JSON.stringify({ "rid": rid, "steps": imgs });
      data.append('images', images);
      await axios.post('http://localhost:3000/recipe/uploadSteps', data);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }


  }
  console.log(addIng);

  return (
    <div>
      <Container maxWidth="sm">
        <Typography variant='h6'>
          Edit Recipe
        </Typography>
        <Box m={2} pt={3}>
          <TextField fullWidth label="Title" name="title" value={details.title} margin='normal' InputLabelProps={{ shrink: true }} onChange={handleRecipeInput} />
        </Box>
        <Box m={2} pt={3}>
          <TextField fullWidth label="Cuisine" name="cuisine" value={details.cuisine} margin='normal' InputLabelProps={{ shrink: true }} onChange={handleRecipeInput} />
        </Box>
        <Box m={2} pt={3}>
          <TextField fullWidth label="Meal Type" name="mealtype" value={details.mealtype} margin='normal' InputLabelProps={{ shrink: true }} onChange={handleRecipeInput} />
        </Box>
        <Box m={2} pt={3}>
          <TextField fullWidth label="Prep time" name="prep_time" value={details.prep_time} margin='normal' InputLabelProps={{ shrink: true }} onChange={handleRecipeInput} />
        </Box>
        <Box m={2} pt={3}>
          <TextField fullWidth label="Cook time" name="cook_time" value={details.cook_time} margin='normal' InputLabelProps={{ shrink: true }} onChange={handleRecipeInput} />
        </Box>
        <Box m={2} pt={3}>
          <TextField fullWidth label="Cooking Method" name="method" value={details.method} InputLabelProps={{ shrink: true }} onChange={handleRecipeInput} />
        </Box>
        <Box m={2} pt={3}>
          <TextField fullWidth label="Youtube Link" name="video" value={details.video} InputLabelProps={{ shrink: true }} onChange={handleRecipeInput} />
        </Box>
        <Box m={2} pt={3}>
          <TextField fullWidth multiline rows={4} variant="outlined" label="Description" name="description" value={details.description} margin='normal' InputLabelProps={{ shrink: true }} onChange={handleRecipeInput} />
        </Box>
        <Box m={2} pt={3}>
          <Button onClick={editDetails} color='secondary'> {!loadingDetails ? ('Edit Details') : (<CircularProgress color="inherit" size={25} />)} </Button>
        </Box>
        <Box m={2} pt={1}><hr /></Box>
        <IngredientsInput inputData={ingredients} addData={addData} delData={delData} rid={rid} type={'edit'} />

        <Button onClick={editIngredients} color='secondary' > {!loadingIng ? ('Edit Existing Ingredients') : (<CircularProgress color="inherit" size={25} />)}</Button>
        <Box m={2} pt={1}><hr /></Box>
        <Steps inputData={step} rid={rid} type={'edit'} />
        <Box m={2} pt={0}><hr /></Box>
        <Button color='secondary' onClick={editSteps}> {!loading ? ('Edit Existing Steps') : (<CircularProgress color="inherit" size={25} />)}</Button>

      </Container>
    </div>
  )
}

export default EditRecipe
