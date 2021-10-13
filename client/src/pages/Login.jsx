import React from "react";
import { Button, TextField, Grid, Paper, Typography, } from "@material-ui/core";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/auth";
import "../Login.css";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useHistory } from 'react-router-dom';

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

export default function Login(props) {
  const classes = useStyles();

  const [details, setDetails] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { user } = useSelector(state => state.auth);
  const { message } = useSelector(state => state.message);
  const history = useHistory();
  const handleInput = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    setDetails({ ...details, [field]: value });
  }

  const handleLogin = (e) => {
    e.preventDefault();

    setLoading(true);

    dispatch(login(details.email, details.password))
      .then(() => {
        props.history.push("/dashboard");
        window.location.reload();
      })
      .catch(() => {
        setOpen(true);
        setLoading(false);
        setDetails({ email: "", password: "" });
      });
  };

  const [open, setOpen] = useState(true);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  if (user) {
    history.push("/dashboard");
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
                  Sign In
                </Typography>
              </Grid>
              <Grid item>
                <form onSubmit={handleLogin}>
                  <Grid container direction="column" spacing={2}>
                    <Grid item>
                      <TextField type="email" label="Email" name='email' variant="outlined" value={details.email} onChange={handleInput} required autoFocus />
                    </Grid>
                    <Grid item>
                      <TextField type="password" label="Password" name='password' variant="outlined" value={details.password} onChange={handleInput} required />
                    </Grid>
                    <Grid item>
                      <Link to='#' style={{ textDecoration: 'none', color: 'blue' }} variant="body2">Forgot Password?</Link>
                    </Grid>
                    <Grid item>
                      <Button variant="contained" color="primary" type="submit" className="button-block">{!loading ? ('Sign in') : (<CircularProgress color="inherit" size={25} />)}</Button>
                    </Grid>
                    <Grid item>
                      Not registered? <Link to="/register" style={{ textDecoration: 'none', color: '#0000ff' }} variant="body2">Create Account</Link>
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
