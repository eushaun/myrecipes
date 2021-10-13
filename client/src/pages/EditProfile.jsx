import React from "react";
import { Button, TextField, Grid, Paper, Typography, ButtonBase, Tooltip, } from "@material-ui/core";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser, editUser } from "../actions/user";
import "../Login.css";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

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

export default function EditProfile(props) {
  const classes = useStyles();

  const form = useRef(null);

  const [details, setDetails] = useState({ email: '', first_name: '', last_name: '', bio: '', password: null, profile_pic: '' });
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { user } = useSelector(state => state.auth);
  const { message } = useSelector(state => state.message);
  const [selectFile, setFile] = useState(null);

  const handleInput = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    setDetails({ ...details, [field]: value });
  }

  const changeFile = (event) => {
    setFile(event.target.files[0])
  }

  const body = { "uid": user.uid, "conid": user.uid }
  const getDetails = async () => {
    dispatch(getUser(body))
      .then((res) => {
        setDetails(res.response);
        console.log(res.response)
      })
      .catch(() => {

      })
  }

  React.useEffect(() => {
    getDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteImage = () => {
    setFile(null);
  }

  const _editUser = (e) => {
    e.preventDefault();

    setLoading(true);

    const data = new FormData();

    if (selectFile) {
      data.append(
        "myFile",
        selectFile,
        `${user.uid}_${selectFile.name}`
      );

      data.append("profilePic", `${user.uid}_${selectFile.name}`);
    } else {
      data.append("profilePic", details.profile_pic);
    }

    data.append("uid", user.uid);
    data.append("firstName", details.first_name);
    data.append("lastName", details.last_name);
    data.append("email", details.email);
    data.append("bio", details.bio);
    data.append("password", details.password);

    dispatch(editUser(data))
      .then((res) => {
        setLoading(false);
        props.history.push(`/profile/${user.uid}`);
        window.location.reload();
      })
      .catch(() => {
        setOpen(true);
        setLoading(false);
      });
  };

  const [open, setOpen] = useState(true);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  // const cancel = () => {
  //   props.history.push(`/profile/${user.uid}`);
  //   window.location.reload();
  // }

  if (!user) {
    props.history.push("/login");
    window.location.reload();
  }

  return (
    <div>
      <Grid container spacing={0} justify="center" direction="row">
        <Grid item>
          <Grid container direction="column" justify="center" spacing={2} className="login-form">
            <Paper variant="elevation" elevation={2} className="login-background">
              <Grid item>
                <Typography component="h1" variant="h5" gutterBottom>
                  Edit Profile
                </Typography>
              </Grid>
              <Grid item>
                <form ref={form} onSubmit={_editUser} method="put" enctype="multipart/form-data">
                  <Grid container direction="column" spacing={2}>
                    <Grid item>
                      <TextField type="text" label="First Name" name='first_name' variant="outlined" value={details.first_name} InputLabelProps={{ shrink: true }} onChange={handleInput} required autoFocus />
                    </Grid>
                    <Grid item>
                      <TextField type="text" label="Last Name" name='last_name' variant="outlined" value={details.last_name} InputLabelProps={{ shrink: true }} onChange={handleInput} required />
                    </Grid>
                    <Grid item>
                      <TextField type="email" label="Email" name='email' variant="outlined" value={details.email} InputLabelProps={{ shrink: true }} onChange={handleInput} required />
                    </Grid>
                    <Grid item>
                      <TextField type="password" label="Password" name='password' variant="outlined" value={details.password} onChange={handleInput} />
                    </Grid>
                    <Grid item>
                      <TextField type="text" multiline rows={3} label="Bio" name='bio' variant="outlined" value={details.bio} InputLabelProps={{ shrink: true }} onChange={handleInput} />
                    </Grid>
                    <Grid item>
                      <input accept="image/*" className={classes.input} onChange={changeFile} id="icon-button-file" name="profilePic" type="file" style={{ "display": "none" }} />
                      <label htmlFor="icon-button-file">
                        <IconButton color="primary" aria-label="upload picture" component="span">
                          <PhotoCamera />
                        </IconButton>
                        Profile Picture
                      </label>
                    </Grid>
                    {selectFile && (<Grid item>
                      File Selected: {selectFile.name}
                      <Tooltip title="Remove Image">
                        <ButtonBase>
                          <HighlightOffIcon
                            className={classes.button}
                            onClick={deleteImage} />
                        </ButtonBase>
                      </Tooltip>
                    </Grid>)}
                    <Grid item>
                      {/* <Button variant="contained" color="primary" className="button-block" onClick={cancel}>Cancel</Button> */}
                      <Button variant="contained" color="primary" type="submit" className="button-block">{!loading ? ('Save') : (<CircularProgress color="inherit" size={25} />)}</Button>
                    </Grid>
                  </Grid>
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
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
