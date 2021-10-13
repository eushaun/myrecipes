/* eslint-disable no-unused-vars */
import React from 'react';
import axios from 'axios';
import { Grid, Typography, Button, Box, Card, CardContent, CardHeader, Menu, MenuItem, ButtonBase, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { useHistory } from 'react-router-dom';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import { useDispatch, useSelector } from 'react-redux';
import RecipeCard from '../components/RecipeCard';
import { getRecipes } from '../actions/recipe';
import { search } from '../actions/recipe';
import CircularProgress from '@material-ui/core/CircularProgress';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: "50px",
  },
}));

const Recipes = ({ match }) => {
  // const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const { params: { key } } = match;
  const [change, setChange] = React.useState(0);
  const [feedLoading, setFeedLoading] = React.useState(false);
  const [recipes, setRecipes] = React.useState([]);
  const [recipesFeed, setRecipesFeed] = React.useState([]);
  // const [keyType, setKeyType] = React.useState();

  const [anchorEl3, setAnchorEl3] = React.useState([null, null]);
  const handleAnchor3 = (i, e) => {
    const a = [...anchorEl3];
    a[i] = e.currentTarget;
    setAnchorEl3(a);
  }

  const closeAnchor = (i) => {
    const a = [...anchorEl3];
    a[i] = null;
    setAnchorEl3(a);
  }

  // const handleDelete = async (i, rid) => {
  //   closeAnchor(i);
  //   try {
  //     await axios.delete(`http://localhost:3000/recipe/${rid}`);
  //     setChange(change + 1);
  //   }
  //   catch (err) {
  //     console.log(err);
  //   }
  // }

  // const handleEdit = (i, rid) => {
  //   closeAnchor(i);
  //   history.push(`/${uid}/recipes/${rid}/edit`);
  // }
  const _getRecommendedRecipes = async () => {
    if (user) {
      try {
        setFeedLoading(true);
        const body = { "uid": user.uid };
        const res = await axios.get('http://localhost:3000/recipe/recommended-feed', { params: body });
        console.log(res);
        setRecipesFeed(res.data);
        setFeedLoading(false);
      } catch (err) {
        console.log(err);
        setFeedLoading(false);
      }

    }
  }

  const _getRecipes = async () => {
    try {
      if (key) {
        let uid = 2;
        if (user) uid = user.uid;
        let body = { 'q': key.split("+"), 'uid': uid };
        dispatch(search(body))
          .then(res => {
            setRecipes(res.response);
            console.log(res.response);
          })
          .catch((err) => {
            console.log(err);
          })
      }
      else {
        let uid = 2;
        if (user) uid = user.uid;
        const body = { 'uid': uid };
        dispatch(getRecipes(body))
          .then((res) => {
            setRecipes(res.response);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
    catch (err) {
      console.log(err);
    }
  }
  const deletedRecipe = (rec) => {
    setChange(() => change + 1);
  }
  React.useEffect(() => {
    _getRecipes();
    _getRecommendedRecipes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [change, key]);


  return (
    <div>
      {user && !key && feedLoading ? (<CircularProgress style={{ "marginTop": "10%" }} color="inherit" size={25} />)
      : user && !key && recipes.length > 0 ?
      (<Container container className={classes.root} spacing={2}>
        <Box m={2} pt={1}> <Typography style={{ "textAlign": "left" }} variant='h4'>Recommended For You</Typography></Box>
           <Grid item xs={12}>
            <Grid container spacing={3}>
              {recipesFeed.filter((x, i) => i < 6).map((x, i) => {

                return (
                  <Grid item key={x.rid}>
                    <RecipeCard recipe={x} i={i} deletedRecipe={deletedRecipe} self={false} />
                  </Grid>
              )})}
            </Grid>
          </Grid>
        <Box m={2} pt={2} style={{ "width": "85%" }}><hr style={{ "width": "85%" }} /></Box>

      </Container>): ''}

      <Container container className={classes.root} spacing={2}>

        <Grid item xs={12}>
          <Grid container spacing={3}>
            {recipes.map((x, i) => {
              return (
                <Grid item key={x.rid}>
                  <RecipeCard recipe={x} i={i} deletedRecipe={deletedRecipe} self={false} />
                </Grid>)
            })}
          </Grid>
        </Grid>
      </Container>
    </div >
  )
}

export default Recipes;
