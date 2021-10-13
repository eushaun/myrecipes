import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../actions/user";
import { Grid, makeStyles, Typography, Button, Box, Avatar, Container } from '@material-ui/core';
import RecipeCard from '../components/RecipeCard';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red'
import { subscribe, unsubscribe } from '../actions/user';
import { useHistory } from 'react-router';
import { getContributorRecipes } from '../actions/recipe';
import Card from '@material-ui/core/Card';
import IconButton from '@material-ui/core/IconButton';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import FavoriteIcon from '@material-ui/icons/Favorite';
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import EditIcon from '@material-ui/icons/Edit';
import EmailIcon from '@material-ui/icons/Email';
import CircularProgress from '@material-ui/core/CircularProgress';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    // border: '1px solid',
    flexWrap: "wrap",
    marginTop: "50px",
    textAlign: 'left'
  },
  ing: {
    width: '99%',
  },
  avatar: {
    backgroundColor: red[500],
    width: 151,
    height: 151,
    borderRadius: "50%",
  },
  like: {
    color: red[500],
  },
  root2: {
    display: 'flex',
    width: '100%',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
    width: '100%',
  },
  cover: {
    width: 151,
    height: 151,
    borderRadius: "50%",
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}));
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#004d40',
    },
    secondary: {
      main: '#ec407a',
    },
  },
});

const Profile = ({ match }) => {
  const history = useHistory();
  const [details, setDetails] = React.useState({});
  const [recipes, setRecipes] = React.useState([]);
  const { params: { uid } } = match;
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  console.log(user);
  // const { message } = useSelector(state => state.message);
  const [subscribed, setSubscribed] = React.useState(false);
  const [self, setSelf] = React.useState(true);
  const [change, setChange] = React.useState(0);
  const [name, setName] = React.useState('');
  const [loadingProfile, setLoadingProfile] = React.useState(false);

  const classes = useStyles();
  const _subscribe = async () => {
    const body = { 'subid': user.uid, 'conid': details.uid };
    dispatch(subscribe(body))
      .then(() => {
        setSubscribed(true);
      })
      .catch((err) => console.log(err));
    // setLoad(() => load + 1);
  }
  const _unsubscribe = async () => {
    dispatch(unsubscribe(user.uid, details.uid))
      .then(() => {
        setSubscribed(false);
      })
      .catch((err) => console.log(err));
  }
  const getDetails = async () => {
    setLoadingProfile(true);
    const body = { "uid": user.uid, 'conid': uid };
    dispatch(getUser(body))
      .then((res) => {
        setDetails(res.response);
        setName(res.response.first_name);
        setSubscribed(res.response.subscribed);
        console.log(res.response);
        setLoadingProfile(false);

      })
      .catch(() => {
        setLoadingProfile(false);

      })
  }
  const getRecipes = async () => {
    const body = { 'uid': user.uid, 'conid': uid };
    dispatch(getContributorRecipes(body))
      .then((res) => {
        setRecipes(res);
      })
      .catch((err) => {
        console.log(err);
      })
  }
  React.useEffect(() => {
    getRecipes();
    getDetails();
    if (user.uid !== uid) {
      setSelf(false);
    }
    else {
      setSelf(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [change, uid]);
  const deletedRecipe = (rec) => {
    setChange(() => change + 1);
  }
  console.log(details);
  return (
    <ThemeProvider theme={theme}>
      {loadingProfile ? (<CircularProgress style={{ "marginTop": "20%" }} color="inherit" size={50} />)
          :(<Container maxWidth="md" className={classes.root} spacing={2}>

        <Card className={classes.root2}>
          <Box m={6} pt={4}>
            <CardMedia>
              <Avatar aria-label="recipe" className={classes.avatar} alt={details.first_name} src={`${details.profile_pic}`}>
                <span style={{ "fontSize": "72px", "marginTop": "20px" }}>{name[0]}</span>
              </Avatar>
            </CardMedia>
          </Box>
          <Box flexGrow={0}>

          </Box>
          <div className={classes.details}>
            <CardContent className={classes.content}>
              <Box m={4} pt={2}>
                <Typography component="h5" variant="h5">
                  <span>{details.first_name} {details.last_name}</span>
                  {self &&
                    <span>
                      <IconButton aria-label="settings" aria-controls="simple-menu" aria-haspopup="true" >
                        <EditIcon fontSize="medium" onClick={() => history.push('/edit-profile')} />
                      </IconButton>
                    </span>

                  }
                  {!self &&
                    <Box style={{ "float": "right", "marginRight": "20px", "marginTop": "-7px" }}>
                      {subscribed
                        ? <Button variant="contained" color='secondary' onClick={_unsubscribe}> Unsubscribe </Button>
                        : <Button variant="contained" color='secondary' onClick={_subscribe}> Subscribe </Button>}
                    </Box>
                  }
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  {details.bio}
                </Typography>

              </Box>

              <Box display="flex" justify="center" alignItems="center" className={`${classes.root} ${classes.ing}`}>
                <Box m={2} pt={0} >
                  <IconButton aria-label="settings" aria-controls="simple-menu" aria-haspopup="true" >
                    <EmailIcon fontSize="large" />
                  </IconButton>
                  {details.email}
                </Box>
                <Box m={0} pt={0}>
                  <IconButton aria-label="settings" aria-controls="simple-menu" aria-haspopup="true" >
                    <FavoriteIcon fontSize="large" style={{ "color": "red" }} />
                    <span style={{ "fontSize": "24px" }}>&nbsp;&nbsp;{details.likes}</span>
                  </IconButton>
                </Box>
                <Box m={1} pt={0}>
                  <IconButton aria-label="settings" aria-controls="simple-menu" aria-haspopup="true" >
                    <SubscriptionsIcon fontSize="large" />
                    <span style={{ "fontSize": "24px" }}>&nbsp;&nbsp;{details.subscribers}</span>
                  </IconButton>
                </Box>
              </Box>
            </CardContent>
            <div className={classes.controls}>
              <IconButton aria-label="previous">
              </IconButton>
              <IconButton aria-label="play/pause">
              </IconButton>
              <IconButton aria-label="next">
              </IconButton>
            </div>
          </div>

        </Card>
      </Container>)}
      {loadingProfile ? ('')
          :(<Container maxWidth="lg" className={classes.root} spacing={2}>
        <Box m={2} pt={1}><hr /></Box>
        <Box m={2} pt={1}> <Typography variant='h4'>Recipes</Typography></Box>
        <Box m={6} pt={1}>
          <Grid item xs={12}>
            <Grid container justifyContent="center" spacing={4}>
              {recipes.map((x, i) => {
                return (
                  <Grid item>
                    <RecipeCard recipe={x} deletedRecipe={deletedRecipe} self={self} />
                  </Grid>)
              })}
            </Grid>
          </Grid>
        </Box>

      </Container>)}
    </ThemeProvider >
  )
}

export default Profile;
