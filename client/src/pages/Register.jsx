import React from "react";
import { Button, TextField, Grid, Paper, Typography, } from "@material-ui/core";
import { useState } from "react";
import "../Login.css"
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from '@material-ui/core/CircularProgress';
import { register } from "../actions/auth";
import { useHistory } from 'react-router-dom';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import { makeStyles } from '@material-ui/core/styles';

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


export default function Register(props) {
  const classes = useStyles();
  const [details, setDetails] = useState({ firstName: "", lastName: "", email: "", password: "", confirmPassword: "" });
  const [loading, setLoading] = useState(false);
  const { user } = useSelector(state => state.auth);
  //let { message } = useSelector(state => state.message);
  const history = useHistory();
  const [m, setMessage] = useState({});

  const dispatch = useDispatch();

  const handleInput = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    setDetails({ ...details, [field]: value });
  }
  const handleRegister = async (e) => {
    e.preventDefault();

    setLoading(true);

    if (details.password !== details.confirmPassword) {
      setMessage({"text": "Passwords do not match!", "severity": "error"});
      setOpen(true);
      setLoading(false);
      return;
    }

    dispatch(register(details.firstName, details.lastName, details.email, details.password))
      .then(() => {
        props.history.push("/dashboard");
        window.location.reload();
      })
      .catch((err) => {
        setMessage({"text": err, "severity": "error"});
        setOpen(true);
        setLoading(false);
        setDetails({ firstName: details.firstName, lastName: details.lastName, email: details.email, password: "", confirmPassword: "" });
      });
  };

  const [open, setOpen] = useState(true);

  const handleClose = (event, reason) => {
    setOpen(false);

    if (reason === 'clickaway') {
      return;
    }
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
                  Join Today!
                </Typography>
              </Grid>
              <Grid item>
                <form form onSubmit={handleRegister}>
                  <Grid container direction="column" spacing={2}>
                    <Grid item>
                      <TextField type="text" label="First Name" name='firstName' variant="outlined" value={details.firstName} onChange={handleInput} required autoFocus />
                    </Grid>
                    <Grid item>
                      <TextField type="text" label="Last Name" name='lastName' variant="outlined" value={details.lastName} onChange={handleInput} required />
                    </Grid>
                    <Grid item>
                      <TextField type="email" label="Email" name='email' variant="outlined" value={details.email} onChange={handleInput} required />
                    </Grid>
                    <Grid item>
                      <TextField type="password" label="Password" name='password' variant="outlined" value={details.password} onChange={handleInput} required />
                    </Grid>
                    <Grid item>
                      <TextField type="password" label="Confirm Password" name='confirmPassword' variant="outlined" value={details.confirmPassword} onChange={handleInput} required />
                    </Grid>
                    <Grid item>
                      <Button variant="contained" color="primary" type="submit" className="button-block">{!loading ? ('Register') : (<CircularProgress color="inherit" size={25} />)}</Button>
                    </Grid>
                    <Grid item>
                      Have an account? <Link to="/login" style={{ textDecoration: 'none', color: '#0000ff' }} variant="body2">Log In</Link>
                    </Grid>
                  </Grid>
                  {m && (
                    <div className={classes.root}>
                      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity={m.severity}>
                          {m.text}
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
