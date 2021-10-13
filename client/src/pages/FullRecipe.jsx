import React from 'react';
import axios from 'axios';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import { Grid, TextField, Modal, Fade, Backdrop, makeStyles, Typography, Button, ButtonBase, Box, Checkbox, Avatar, IconButton, Container, Paper, } from '@material-ui/core';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import FlagIcon from '@material-ui/icons/Flag';
import RecipeCard from '../components/RecipeCard';
import red from '@material-ui/core/colors/red'
import { useSelector, useDispatch } from 'react-redux';
import { getFullRecipe } from '../actions/recipe';
import { subscribe, unsubscribe } from '../actions/user';
import { getComments, createComments, editComment, deleteComment, flagComment, unflagComment } from '../actions/comment';
import { useHistory } from 'react-router';
import CircularProgress from '@material-ui/core/CircularProgress';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    border: '1px solid',
    marginTop: '1ch',
  },
  ing: {
    marginLeft: '10px',
    width: '99%',
  },
  avatar: {
    backgroundColor: red[500],

  },
  like: {
    color: red[500],
  },
  comment: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[3],
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    height: 900,
    width: 600
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9,
    border: 'solid 1px'
  },
  paper2: {
    // position: 'absolute',
    width: 600,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  arrow: {
    marginLeft: 'auto',
  }
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
const FullRecipe = (props) => {
  const history = useHistory();
  const rid = props.match.params.rid;
  const uid = props.location.state;
  const classes = useStyles();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const [details, setDetails] = React.useState({});
  const [ingredients, setIngredients] = React.useState([]);
  const [steps, setSteps] = React.useState([]);
  const [name, setName] = React.useState('');
  const [owner, setOwner] = React.useState(false);
  const [comments, setComments] = React.useState([]);
  const [t, setT] = React.useState(0);
  const [newComment, setNewComment] = React.useState('');
  const [subscribed, setSubscribed] = React.useState();
  const [liked, setLiked] = React.useState({});
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [commentDetails, setCommentDetails] = React.useState();
  const [change, setChange] = React.useState(0);
  const [time, setTime] = React.useState(0);
  const [on, setOn] = React.useState(false);
  const [currStep, setCurrStep] = React.useState(0);
  const [start, setStart] = React.useState(false);
  const [videoId, setVideoId] = React.useState('');
  const [recommendedRecipes, setRecommendedRecipes] = React.useState([]);
  const [recLoading, setRecLoading] = React.useState(false);
  const handleOpen = (i) => {
    setCurrStep(i);
    setOpen(true);
  };

  const handleClose = () => {
    onReset();
    setOpen(false);
  };
  const handleOpen2 = (x) => {
    setNewComment(x.comment);
    setCommentDetails(x);
    setOpen2(true);
  };

  const handleClose2 = () => {
    setNewComment('');
    setCommentDetails();
    setOpen2(false);
  };

  const handleComment = (e) => {
    setNewComment(e.target.value);
  }

  const _getComments = async () => {
    let subid = 2;
    if (user) subid = user.uid;
    const body = { uid: subid, rid: rid }
    dispatch(getComments(body))
      .then((res) => {
        setComments(res.response.reverse());
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const _createComment = async (e) => {
    if (e.key === 'Enter') {
      const comment = { uid: user.uid, rid: rid, comment: newComment };
      console.log(comment);
      dispatch(createComments(comment))
        .then((res) => {
          setChange(() => change + 1);
          setNewComment('');
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }

  const _editComment = async (e) => {
    if (e.key === 'Enter') {
      const comment = { cid: commentDetails.cid, comment: newComment };
      dispatch(editComment(comment))
        .then((res) => {
          console.log(res)
          setChange(() => change + 1);
          handleClose2();
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }

  const _flagComment = (cid) => {
    const comment = { cid: cid, uid: user.uid };
    console.log(comment);
    dispatch(flagComment(comment))
      .then((res) => {
        setChange(() => change + 1);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const _unflagComment = (x) => {

    dispatch(unflagComment(x.cid, user.uid))
      .then((res) => {
        setChange(() => change + 1);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const _deleteComment = (cid) => {
    if (comments.length === 1) {
      setComments([]);
    }
    dispatch(deleteComment(cid))
      .then((res) => {
        console.log(res);
        setChange(() => change + 1);
      })
      .catch((err) => {
        console.log(err);
        console.log(err.status);
      })
  }

  const getRecipe = async () => {
    try {
      setRecLoading(true);
      let subid = 2;
      if (user) subid = user.uid;
      const body = { 'subid': subid, 'rid': rid, 'conid': uid };
      const res = await dispatch(getFullRecipe(body));
      setDetails(res[0]);
      setSteps(res[1].sort((step1, step2) => (+step2.sid) < (+step1.sid)));
      console.log(res[1]);
      setIngredients(res[2]);
      setName(res[0].name);
      setLiked({ status: res[0].liked, number: res[0].likes });
      let temp = [0];
      for (let i = 0; i < res[1].length; i++) {
        if (i > 0) {
          temp.push(+temp[i] + (+res[1][i].timer));
        }
        else {
          temp.push(+res[1][i].timer);
        }
        setT(temp);
      }
      console.log(res[0]);
      if (res[0].video) {
        let video_id = res[0].video.split('v=')[1];
        var amp = video_id.indexOf('&');
        if (amp !== -1) {
          video_id = video_id.substring(0, amp);
        }
        setVideoId(video_id);
      }

      setSubscribed(res[0].subscribed);
      console.log(res[0].subscribed);
      if (subid === res[0].uid) {
        setOwner(true);
      }
      const response = await axios.get("http://localhost:3000/recipe/recommended", { params: { 'uid': subid, 'rid': res[0].rid } })
      setRecommendedRecipes(response.data);
      setRecLoading(false);
    } catch (err) {
      console.log(err);
      setRecLoading(false);
    }
  }
  console.log(subscribed);
  React.useEffect(() => {
    getRecipe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    _getComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [change]);

  React.useEffect(() => {
    let interval;

    if (on) {
      interval = setInterval(() => setTime((time) => time + 1), 1000);
      console.log(time, steps[currStep].timer);
    }

    return () => clearInterval(interval);
  }, [on]);

  const manageSteps = () => {
    setTime(0);
    if (currStep < steps.length - 1) {
      setCurrStep(() => currStep + 1);
      setOn(false);
    }
    else {
      setCurrStep(0);
      handleClose();
    }
  }
  React.useEffect(() => {
    setTime(0);
    setOn(false);
  }, [currStep]);
  React.useEffect(() => {
    if (time > 0) {
      console.log(time, steps[currStep].timer);
      if (time === +steps[currStep].timer) {
        manageSteps();
      }
    }
  }, [time])
  const onReset = () => {
    setOn(false);
    setTime(0);
  }
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

  const like = async () => {
    if (user) {
      const body = { 'uid': user.uid, 'rid': rid };
      try {
        const res = await axios.post('http://localhost:3000/recipe/like', body);
        const stat = true;
        const num = +liked.number + 1;
        console.log(num);
        setLiked({ status: stat, number: num });
      }
      catch (err) {
        console.log(err);
      }
    }

  }
  const unlike = async () => {
    if (user) {
      const body = { 'uid': user.uid, 'rid': rid };
      try {
        const res = await axios.delete(`http://localhost:3000/recipe/unlike/${user.uid}/${rid}`, body);
        const stat = false;
        const num = +liked.number - 1;
        console.log(num);
        setLiked({ status: stat, number: num });
      }
      catch (err) {
        console.log(err);
      }
    }

  }
  console.log(time, t);

  return (
    <ThemeProvider theme={theme}>
      {recLoading ? (<CircularProgress style={{ "marginTop": "20%" }} color="inherit" size={50} />) : (
        <Container maxWidth="md" style={{ "textAlign": "left" }}>
          <Box m={2} pt={3}>
            <Paper elevation={0} style={{ "textAlign": "center" }}>
              <img height="400" alt={details.title} src={details.main_image} />
            </Paper>
          </Box>
          <Box m={2} pt={3}>
            <Typography variant='h4'>
              {details.title}
            </Typography>
          </Box>

          <Box m={2} pt={2}>
            {details.description}
          </Box>
          <Box m={2} pt={2}>
            Cuisine: {details.cuisine}
          </Box>
          <Box m={2} pt={2}>
            Meal Type: {details.mealtype}
          </Box>

          <Box display="flex" justify="center" alignItems="center" className={`${classes.root} ${classes.ing}`}>
            <Box p={1} >
              <Avatar aria-label="recipe" alt={details.name} onClick={() => { history.push(`/profile/${details.uid}`) }} className={classes.avatar} src={details.profile_pic}>
                {name[0]}
              </Avatar>
            </Box>
            <Box flexGrow={1}>
              {details.name}
            </Box>
            <Box >
              <IconButton aria-label="settings" aria-controls="simple-menu" aria-haspopup="true" >
                {liked.status
                  ? <FavoriteIcon fontSize="small" onClick={unlike} className={classes.like} />
                  : <FavoriteBorderIcon fontSize="small" onClick={like} />}
                <span style={{ "fontSize": "18px" }}>&nbsp;{liked.number}</span>
              </IconButton>
            </Box>
            <Box >
              {user && !owner &&
                <Box pt={0.5}>
                  {subscribed
                    ? <Button type="button" color='secondary' onClick={_unsubscribe}> Unsubscribe </Button>
                    : <Button type="button" color='secondary' onClick={_subscribe}> Subscribe </Button>
                  }
                </Box>
              }
            </Box>
          </Box>
          <Box m={2} pt={1}><hr /></Box>
          <Box m={2} pt={1}>
            <span style={{ "fontSize": "18px" }}>Ingredients</span>
            <span style={{ "float": "right" }}>Prep time: {details.prep_time} min </span>
          </Box>
          {ingredients.map((x, i) => {
            if (x.unit === 'number') x.unit = '';
            return (
              <Box m={2} pt={0}>
                <Typography variant='body1'>

                  <Checkbox
                    color='primary'
                  />
                  {x.quantity} {x.unit} {x.name} {x.technique}
                </Typography>

              </Box>)
          })}
          <Box m={2} pt={1}><hr /></Box>
          <Box m={2} pt={1}>
            <span style={{ "fontSize": "18px" }}>Steps</span>

            <span style={{ "float": "right" }}>Cook time: {details.cook_time} min</span>
            <Box m={2} pt={0}></Box>
            <div><Button variant='contained' color='secondary' onClick={() => handleOpen(0)}>Interactive Mode!</Button></div>

          </Box>
          {steps.map((x, i) => {
            return (
              <Box m={3} pt={2}>

                Step {i + 1}

                <span style={{ "float": "right" }}>
                  {x.timer ?
                    (<ButtonBase onClick={() => handleOpen(i)}><IconButton aria-label="settings" aria-controls="simple-menu" aria-haspopup="true" >
                      <AccessAlarmIcon />

                    </IconButton> {x.timer} min </ButtonBase>) : ''}
                </span>
                <Box m={2} pt={1} bgcolor="background.paper">
                  <Box pt={1} flexGrow={1} >
                    {x.instructions}
                  </Box>
                  <Box pt={1} >

                    <Box m={2} pt={3} style={{ "textAlign": "left" }}>
                      <Paper elevation={0} style={{ "textAlign": "left" }}>
                        <img height="300" alt={x.sid} src={x.image} />
                      </Paper>
                    </Box>
                    <Modal
                      aria-labelledby="transition-modal-title"
                      aria-describedby="transition-modal-description"
                      className={classes.modal}
                      open={open}
                      onClose={handleClose}
                      closeAfterTransition
                      BackdropComponent={Backdrop}
                      BackdropProps={{
                        timeout: 500,
                      }}
                    >
                      <Fade in={open}>
                        <div className={classes.paper}>
                          <Card >
                            <CardHeader
                              title={<div>Step {currStep + 1}</div>}
                              action={
                                <Box>
                                  {x.timer &&
                                    <div>
                                      {on
                                        ? <Button color='secondary' onClick={() => setOn(false)}>Pause</Button>
                                        : <Button color='secondary' onClick={() => setOn(true)}>Start</Button>
                                      }
                                    </div>
                                  }
                                </Box>
                              }
                              subheader={<div><div>Total Steps: {steps.length}</div> {x.timer ? <div><div>Total Time:{steps[currStep].timer}  min</div><div>Timer: {time} s </div></div> : <div> One or more steps do not have time so use the buttons to navigate! </div>}</div>}
                            />

                            {(videoId && x.timer) ? (

                              <CardMedia >

                                <iframe title='1'
                                  id="video"
                                  width="600"
                                  height="300"
                                  src={`https://www.youtube.com/embed/${videoId}?start=${t[currStep] * 60};rel=0&amp;showinfo=0`}
                                  frameBorder="0"
                                  allow="accelerometer, autoplay; encrypted-media; gyroscope; picture-in-picture"
                                  allowFullScreen
                                />

                              </CardMedia>)
                              : (<CardMedia className={classes.media} image={steps[currStep].image}
                                title={steps[currStep].title} >
                              </CardMedia>)}
                            <CardContent CardContent style={{ width: "auto" }}>
                              <Typography variant='h5'> Instruction </Typography>
                              <Box pt={3}
                                overflow="hidden"
                                whiteSpace="pre-line"
                                textOverflow="ellipsis"
                                height={180}
                                noWrap
                              >
                                <Typography variant="body1" component="p" style={{ wordWrap: "break-word" }} textOverflow="ellipsis" >
                                  <span >{steps[currStep].instructions}</span>
                                </Typography>
                              </Box>
                            </CardContent>
                            <CardActions>
                              <Box justify="center" alignItems="center" disply='flex' >

                                <Box flexGrow={1}>
                                  {currStep > 0 &&
                                    <IconButton color='secondary' onClick={() => setCurrStep(() => currStep - 1)}>
                                      <ArrowBackIcon />
                                    </IconButton>}
                                  {currStep < steps.length - 1 &&
                                    < IconButton color='secondary' onClick={() => setCurrStep(() => currStep + 1)}>
                                      <ArrowForwardIcon />
                                    </IconButton>}
                                </Box>
                                <Box >
                                  <Button color='secondary' onClick={handleClose}> Exit Interactive mode!</Button>

                                </Box>
                              </Box>
                            </CardActions>
                          </Card>
                        </div>
                      </Fade>
                    </Modal>
                  </Box>

                </Box>
              </Box>
            )
          })}
          <Box m={2} pt={1}><hr /></Box>
          {recommendedRecipes.length > 0 && (<div><Box m={6}>
            <Typography variant='h6'>
              Recommended For You
            </Typography>
            <Box m={2} pt={1}></Box>
            <Grid item xs={12}>
              <Grid container spacing={10}>
                {recommendedRecipes.map((x, i) => {
                  return (
                    <Grid item key={x.rid}>
                      <div >
                        <RecipeCard recipe={x} i={i} deletedRecipe={null} self={false} />
                      </div>
                    </Grid>)
                })}
              </Grid>
            </Grid>
          </Box>
            <Box m={2} pt={1}><hr /></Box></div>)}
          <Box m={2} pt={1}>
            <Typography variant='h6'>
              Comments
            </Typography>
            <Box m={2} pt={1}>
              <TextField variant='outlined' label='Add new comment...' name='comment' value={newComment} onChange={handleComment} onKeyDown={_createComment} fullWidth />
            </Box>
            {comments.length > 0
              ? <div>{comments.map((x, i) => {
                return (
                  <div >
                    <Box m={2} p={2} display="flex" justify="center" alignItems="center" className={classes.comment}>
                      <Box m={1}>
                        <Avatar aria-label="recipe" alt={details.name} className={classes.avatar} onClick={() => { history.push(`/profile/${x.uid}`) }} src={x.profile_pic}>
                          {x.first_name[0]}
                        </Avatar>
                      </Box>
                      <Box m={1}>
                        {x.first_name} {x.last_name} <span style={{ "fontStyle": "italic", "fontSize": "12px" }}>{x.cdate.substring(0, x.cdate.indexOf('T'))} {x.ctime.substring(0, x.ctime.indexOf(':', x.ctime.indexOf(':') + 1))}</span>
                      </Box>
                      <Box p={1} flexGrow={1} >{x.comment}</Box>
                      {user && (user.uid === x.uid)
                        ? <Box > <IconButton onClick={() => handleOpen2(x)}><EditIcon /></IconButton>
                          <IconButton onClick={() => _deleteComment(x.cid)} ><DeleteIcon /></IconButton></Box>
                        : <Box> <IconButton>{x.flagged ? <FlagIcon className={classes.like} onClick={() => _unflagComment(x)} /> : <FlagIcon onClick={() => _flagComment(x.cid)} />}</IconButton></Box>
                      }
                      <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        className={classes.modal}
                        open={open2}
                        onClose={handleClose2}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                          timeout: 500,
                        }}
                      >
                        <Fade in={open2}>
                          <div className={classes.paper2} >
                            <h2 id="transition-modal-title">Edit Comment</h2>
                            <TextField fullWidth variant='outlined' value={newComment} onChange={handleComment} onKeyDown={(e) => _editComment(e, x)}></TextField>
                          </div>
                        </Fade>
                      </Modal>
                    </Box>

                  </div>
                )
              })}</div>
              : <Box m={2} p={2}><Typography variant='h6' > No comments found here! </Typography></Box>
            }


          </Box>
        </Container>)}
    </ThemeProvider >
  )
}

export default FullRecipe;
