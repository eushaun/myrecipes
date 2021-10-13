import { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search'
import InputBase from '@material-ui/core/InputBase';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import { useDispatch, useSelector } from "react-redux";
import { logout } from '../actions/auth';
import { deepOrange } from '@material-ui/core/colors';
import AddBoxIcon from '@material-ui/icons/AddBox';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import SubjectIcon from '@material-ui/icons/Subject';
import Tooltip from '@material-ui/core/Tooltip';
import { clearMessage } from "../actions/message";
import { createBrowserHistory } from "history";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    color: 'white',
    textDecoration: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    marginRight: 'auto',
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },

  menu: {
    textDecoration: 0,
    color: 'white',
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
}));

export default function PrimarySearchAppBar() {
  const history = useHistory();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);


  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);

  useEffect(() => {
    createBrowserHistory().listen((location) => {
      dispatch(clearMessage());
    });
  }, [dispatch]);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const logoutUser = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
    dispatch(logout()).then(() => {
      history.push(`/login`);
      window.location.reload();
    });
  }
  const searchRecipes = async (e) => {
    let title = e.target.value.split(" ");
    var text = "";
    text += title.join('+')
    // eslint-disable-next-line no-unused-vars
    if (e.key === 'Enter') {
      history.push(`/search/${text}`);
    }
  }
  const menuId = 'primary-search-account-menu';
  const mobileMenuId = 'primary-search-account-menu-mobile';

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <Typography component={Link} to={'/'} className={classes.title} variant="h6" noWrap>
            My Recipes
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search Recipes..."
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              onKeyDown={searchRecipes}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>

          {user ? (<div className={classes.sectionDesktop}>
            <Link to="/basics" className={classes.menu}>
              <IconButton>
                <MenuItem>
                  <span style={{ color: "white" }}>Basic Recipes</span>
                </MenuItem>
              </IconButton>
            </Link>
            <Link to="/create-recipe">
              <MenuItem>
                <Tooltip title="Create Recipe" arrow>
                  <IconButton>
                    <AddBoxIcon style={{ fill: "white" }} />
                  </IconButton>
                </Tooltip>
              </MenuItem>
            </Link>
            <Link to="/login" style={{ textDecoration: 'none' }}>
              <MenuItem>
                <Tooltip title="Notifications" arrow>
                  <IconButton>
                    <Badge color="secondary" variant="dot">
                      <NotificationsIcon style={{ fill: "white" }} />
                    </Badge>
                  </IconButton>
                </Tooltip>
              </MenuItem>
            </Link>
            <MenuItem>
              <Tooltip title="Account" arrow>
                <Avatar alt={user.firstName} src={user.profilePic}
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  className={classes.orange} >{user.firstName[0]}</Avatar>
              </Tooltip>
            </MenuItem>
          </div>) : (<div className={classes.sectionDesktop}>
            <Link to="/basics" className={classes.menu}>
              <MenuItem>Basic Recipes</MenuItem>
            </Link>
            <Link to="/login" className={classes.menu}>
              <MenuItem onClick={handleMenuClose}>Log In</MenuItem>
            </Link>
            <Link to="/register" className={classes.menu}>
              <MenuItem onClick={handleMenuClose}>Register</MenuItem>
            </Link>
          </div>)}

          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {
        user ? (<Menu
          anchorEl={mobileMoreAnchorEl}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          id={mobileMenuId}
          keepMounted
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={isMobileMenuOpen}
          onClose={handleMobileMenuClose}
        >
          <Link to="/basics" style={{ textDecoration: 'none', color: '#000000' }}>
            <MenuItem>
              <IconButton>
                <SubjectIcon />
              </IconButton>
              <p>Basic Recipes</p>
            </MenuItem>
          </Link>
          <Link to="/login" style={{ textDecoration: 'none', color: '#000000' }}>
            <MenuItem>
              <IconButton>
                <AddBoxIcon />
              </IconButton>
              <p>Create Recipe</p>
            </MenuItem>
          </Link>
          <Link to="/login" style={{ textDecoration: 'none', color: '#000000' }}>
            <MenuItem>
              <IconButton>
                <Badge color="secondary" variant="dot">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <p>Notifications</p>
            </MenuItem>

          </Link>
          {/* <Link to="/login" style={{ textDecoration: 'none', color: '#000000' }}> */}
          <MenuItem onClick={() => { handleMenuClose(); history.push(`/profile/${user.uid}`) }}>
            <IconButton
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <p>Profile</p>
          </MenuItem>
          {/* </Link> */}
          <MenuItem onClick={logoutUser}>
            <IconButton>
              <ExitToAppIcon />
            </IconButton>
            Logout
          </MenuItem>
        </Menu>) : (<Menu
          anchorEl={mobileMoreAnchorEl}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          id={mobileMenuId}
          keepMounted
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={isMobileMenuOpen}
          onClose={handleMobileMenuClose}
        >
          <Link to="/basics" className={classes.menu}>
            <MenuItem>Basic Recipes</MenuItem>
          </Link>
          <Link to="/login" className={classes.menu}>
            <IconButton>
              <VpnKeyIcon />
            </IconButton>
            <MenuItem>Log In</MenuItem>
          </Link>
          <Link to="/register" className={classes.menu}>
            <IconButton>
              <LockOpenIcon />
            </IconButton>
            <MenuItem>Register</MenuItem>
          </Link>
        </Menu>)
      }
      {<Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={menuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        {/* <Link to="/login" style={{ textDecoration: 'none', color: '#000000' }}> */}
        <MenuItem  onClick={() => { handleMenuClose(); history.push(`/profile/${user.uid}`) }}>
          <IconButton
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
        {/* </Link> */}
        <MenuItem onClick={logoutUser}>
          <IconButton>
            <ExitToAppIcon />
          </IconButton>
          Logout
        </MenuItem>
      </Menu>}
    </div>
  );
}
