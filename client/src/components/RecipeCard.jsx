import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import { Box, Menu, MenuItem, ButtonBase, Tooltip } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MoreVertIcon from '@material-ui/icons/MoreVert';
// import { useSelector } from 'react-redux';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import CommentIcon from '@material-ui/icons/Comment';
import { useHistory } from 'react-router';
import axios from 'axios';


const useStyles = makeStyles((theme) => ({
  root: {
    width: 345,
    height: 420,
    textAlign: 'left'
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    marginLeft: 'auto',
  },
  avatar: {
    backgroundColor: red[500],
  },
  head: {
    height: "20px",
    whiteSpace: 'nowrap',
    marginRight: '5px'
  },

}));

export default function RecipeReviewCard({ recipe, deletedRecipe, self }) {
  const history = useHistory();
  const classes = useStyles();
  const [anchorEl3, setAnchorEl3] = React.useState(null);
  // if (self) {
  //   setEditOptions(true);
  // }
  const handleAnchor3 = (e) => {
    // const a = [...anchorEl3];
    // a[i] = e.currentTarget;
    setAnchorEl3(e.currentTarget);
  }

  const closeAnchor = () => {
    // const a = [...anchorEl3];
    // a[i] = null;
    setAnchorEl3(null);
  }

  const handleDelete = async (rid) => {
    closeAnchor();
    try {
      await axios.delete(`http://localhost:3000/recipe/${rid}`);
      deletedRecipe(rid);
    }
    catch (err) {
      console.log(err);
    }
  }

  const handleEdit = (rid, uid) => {
    closeAnchor();
    history.push(`/edit-recipe/${rid}`);
  }
  // const { user } = useSelector(state => state.auth);
  console.log(recipe.title);

  const openRecipe = (rid, uid) => {
    history.push(`/recipe/${rid}`, uid);
    window.location.reload();
  }
  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Tooltip title={recipe.first_name + ' ' + recipe.last_name}>
            <Avatar aria-label="recipe" alt={recipe.first_name[0]} onClick={() => {history.push(`/profile/${recipe.uid}`)}} className={classes.avatar} src={recipe.profile_pic}>
              {recipe.first_name[0]}
            </Avatar>
          </Tooltip>
        }
        action={
          <div>
            {self
              &&
              <div>
                <IconButton aria-label="settings" aria-controls="simple-menu" aria-haspopup="true" onClick={e => handleAnchor3(e)}>
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl3}
                  keepMounted
                  open={Boolean(anchorEl3)}
                  onClose={closeAnchor}
                >
                  <MenuItem onClick={() => handleEdit(recipe.rid, recipe.uid)}>Edit</MenuItem>
                  <MenuItem onClick={() => handleDelete(recipe.rid)}>Delete</MenuItem>
                </Menu>
              </div>

            }
          </div>
        }
        title={
          <ButtonBase onClick={() => openRecipe(recipe.rid, recipe.uid)}>
            <Typography variant="body1" style={{ "textAlign": "left", "height": "45px" }}>{recipe.title}
            </Typography>
          </ButtonBase>}
        subheader={<span style={{ "fontStyle": "italic", "fontSize": "12px" }}>{recipe.rdate.substring(0, recipe.rdate.indexOf('T'))} {recipe.rtime.substring(0, recipe.rtime.indexOf(':', recipe.rtime.indexOf(':') + 1))}</span>}
      />
      <CardMedia className={classes.media} image={recipe.image}
        title={recipe.title} onClick={() => openRecipe(recipe.rid, recipe.uid)}>
      </CardMedia>

      <CardContent style={{ width: "auto" }}>
        <Box
          overflow="hidden"
          whiteSpace="pre-line"
          height={40}
        >
          <Typography variant="body2" color="textSecondary" component="p" style={{ wordWrap: "break-word" }}  >
            <span >{recipe.description}</span>
          </Typography>
        </Box>
      </CardContent>
      <CardActions disableSpacing className={classes.foot}>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon fontSize="small" />
          <span style={{ "fontSize": "16px" }}>
            {recipe.likes}</span>
        </IconButton>
        <IconButton aria-label="share">
          <CommentIcon fontSize="small" />
          <span style={{ "fontSize": "16px" }}>
            {recipe.comments}</span>
        </IconButton>
        <Tooltip title="Prep + Cook Time">
          <IconButton
            className={clsx(classes.expand)}
            aria-label="show more"
          >
            <span style={{ "fontSize": "16px" }}>{recipe.prep_time} + {recipe.cook_time}</span>
            <AccessTimeIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
}
