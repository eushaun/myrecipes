import React from 'react';
import { Typography, Button, TextField, Box, ButtonBase, Tooltip } from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import IconButton from '@material-ui/core/IconButton';
import AddBoxIcon from '@material-ui/icons/AddBox';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { deleteRecipeSteps } from '../actions/recipe';
import { useDispatch } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';


const useStyles = makeStyles((theme) => ({
  textField: {
    width: '8ch',
  },
  searchText: {
    background: "#f1f1f1",
    '&:hover': {
      background: "#ec407a",
    },
  }
}));

const Steps = ({ stepsData, inputData, rid, type }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [textArea, setTextArea] = React.useState([{ "instructions": '', "image": '', "timer": '', "step_number": '', "sid": '' }]);
  const [newTextArea, setNewTextArea] = React.useState([{ "instructions": '', "image": '', "timer": '', "step_number": '', "sid": '' }]);
  const [edit, setEdit] = React.useState(false);
  const [imgList, setImgList] = React.useState([]);

  const [loading, setLoading] = React.useState(false);

  const handleTextarea = (i, e, n) => {
    if (n === 1) {
      const temp = [...newTextArea];
      if (e.target.files) {
        temp[i]['image'] = e.target.files[0];
        temp[i]['img_name'] = e.target.files[0].name;

      } else {
        const { name, value } = e.target;
        console.log(name, value, i);
        temp[i][name] = value;
      }
      temp[i]["step_number"] = i + 1;
      setNewTextArea(temp);
    }

    else {
      const temp = [...textArea];
      if (e.target.files) {
        temp[i]['image'] = e.target.files[0];
        temp[i]['img_name'] = e.target.files[0].name;
      } else {
        const { name, value } = e.target;
        temp[i][name] = value;
      }
      temp[i]["step_number"] = i + 1;
      setTextArea(temp);
    }
    console.log(newTextArea);
  }
  const handleAddStep = async () => {
    let imgs = [];
    const ins = [];
    for (let i = 0; i < newTextArea.length; i++) {
      ins.push({ 'instructions': newTextArea[i].instructions, 'image': '', 'timer': newTextArea[i].timer, 'rid': rid });
      console.log(imgs);
    }
    let temp = [...textArea];

    try {
      setLoading(true);
      const data = new FormData();
      for (let i = 0; i < newTextArea.length; i++) {
        const body = { 'instructions': newTextArea[i].instructions, 'image': '', 'timer': newTextArea[i].timer, 'rid': rid };
        const res = await axios.post('http://localhost:3000/recipe/steps', { steps: body });
        console.log(res.data.response[0].sid);
        if (newTextArea[i].image) {
          data.append("myFiles", newTextArea[i].image, `${rid}_${res.data.response[0].sid}_${newTextArea[i].image.name}`)
          imgs.push({ "sid": res.data.response[0].sid, "image": `${rid}_${res.data.response[0].sid}_${newTextArea[i].image.name}` });
        }
        temp.push({ "instructions": newTextArea[i].instructions, "image": newTextArea[i].image, "timer": newTextArea[i].timer, "step_number": newTextArea[i].step_number, "sid": res.data.response[0].sid, 'img_name': newTextArea[i].img_name });
        imgList.push(newTextArea[i].image);
      }
      console.log(temp);
      temp.sort((step1, step2) => (+step2.sid) < (+step1.sid));
      const images = JSON.stringify({ "rid": rid, "steps": imgs });
      data.append('images', images);
      await axios.post('http://localhost:3000/recipe/uploadSteps', data);
      setLoading(false);

      setTextArea(temp);
      setNewTextArea([{ "instructions": '', "image": '', "timer": '', "step_number": '', "sid": '', 'img_name': '' }]);
    }
    catch (err) {
      console.log(err);
      setLoading(false);
    }

  }
  const addStep = (n) => {
    // const steps = [...textArea];
    // steps.push('');
    // setTextArea(steps);
    if (n === 1) {
      setNewTextArea([...newTextArea, { "instructions": '', "image": '', "timer": '', "step_number": '', "sid": '', 'img_name': '' }]);
    }
    else {
      setTextArea([...textArea, { "instructions": '', "image": '', "timer": '', "step_number": '', "sid": '', 'img_name': '' }]);
    }
  }

  const delStep = (x, i, n) => {
    if (type === 'edit') {
      if (n === 1) {
        const l = [...newTextArea];
        l.splice(i, 1);
        setNewTextArea(l);
      }
      else {
        dispatch(deleteRecipeSteps(x.sid))
          .then((res) => {
            const l = [...textArea];
            l.splice(i, 1);
            setTextArea(l);
            const s = [...imgList];
            s.splice(i,1);
            setImgList(s);
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          })
      }
    }
    else {
      const l = [...textArea];
      l.splice(i, 1);
      setTextArea(l);
    }
  }

  const deleteImage = (i, n) => {
    if (n === 1) {
      const l = [...newTextArea];
      l[i]['image'] = '';
      l[i]['img_name'] = '';
      setNewTextArea(l);
    }
    else {
      const l = [...textArea];
      l[i]['image'] = '';
      l[i]['img_name'] = '';
      setTextArea(l);
    }
  }
  const deleteNewImage = (i) => {
    const l = [...textArea];
    l[i]['image'] = imgList[i];
    l[i]['img_name'] = ''
    setTextArea(l);
  }
  if (type !== 'edit') {
    stepsData(textArea);
  }
  React.useEffect(() => {
    if (type === 'edit') {
      setEdit(true);
      setTextArea(inputData);
      let t = []
      for (let i = 0; i < inputData.length; i++) {
        t.push(inputData[i].image);
      }
      setImgList(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputData]);
  return (
    <div>
      {/* <Typography variant="h6" style={{ "textAlign": "left", "fontWeight": 900 }}> */}

      <div>
        <Typography variant="h6" style={{ "textAlign": "left", "fontWeight": 900 }}><Box m={2} pt={1}>Steps</Box></Typography>
        {textArea.map((x, i) => {
          return (
            <Box m={2} pt={1}>
              <div div style={{ "textAlign": "left", "fontWeight": 100 }}>
                <Typography style={{ "marginTop": "20px", "fontWeight": 900 }}>
                  Step {i + 1}
                </Typography>
                <TextField
                  fullWidth multiline='true' variant="outlined" rows='4' label="Enter Instructions"
                  name="instructions" value={x.instructions}
                  onChange={e => handleTextarea(i, e)}
                />
                <Box display="flex" p={1} justify="center" alignItems="center" className={classes.textArea}>
                  <Box p={1} className={classes.textField2}>
                    <TextField
                      size="small" variant="outlined" helperText='Timer' name='timer'
                      className={classes.textField} margin='normal' value={x.timer}
                      onChange={e => handleTextarea(i, e)}
                    />
                  </Box>
                  <Box flexShrink={0}>
                    <Tooltip title="delete step">
                      <ButtonBase>
                        <HighlightOffIcon
                          className={classes.button}
                          onClick={(e) => delStep(x, i)} />
                      </ButtonBase>
                    </Tooltip>
                  </Box>
                </Box>

                <Box style={{ "textAlign": "left" }} pt={1}>
                  <input accept="image/*" className={classes.input} onChange={e => handleTextarea(i, e)} id={"step-button-file" + i} name="stepPic" type="file" style={{ "display": "none" }} />
                  <label htmlFor={"step-button-file" + i}>
                    <IconButton color="primary" aria-label="upload picture" component="span">
                      <PhotoCamera />
                    </IconButton>
                    <span style={{ "fontWeight": 500 }}>
                      Add Image
                    </span>
                  </label>
                  {textArea[i].img_name && (<Box m={2} pt={0}>
                    File Selected: {textArea[i].img_name}
                    <Tooltip title="Remove Image">
                      <ButtonBase>
                        {edit
                          ? <HighlightOffIcon
                            className={classes.button}
                            onClick={() => deleteNewImage(i)} />
                          : <HighlightOffIcon
                            className={classes.button}
                            onClick={() => deleteImage(i)} />
                        }

                      </ButtonBase>
                    </Tooltip>
                  </Box>)}
                </Box>
              </div>
            </Box>
          );
        })}
      </div>
      {edit &&
        <div>
          <Box m={2} pt={1}><hr /></Box>

          <Typography variant="h6" style={{ "textAlign": "left", "fontWeight": 900 }}><Box m={2} pt={1}>Add more Steps</Box></Typography>

          {newTextArea.map((x, i) => {
            return (

              <Box m={2} pt={1}>
                <div div style={{ "textAlign": "left", "fontWeight": 100 }}>
                  <Typography style={{ "marginTop": "20px", "fontWeight": 900 }}>
                    Step {textArea.length + i + 1}
                  </Typography>
                  <TextField
                    fullWidth multiline='true' variant="outlined" rows='4' label="Enter Instructions"
                    name="instructions" value={x.instructions}
                    onChange={e => handleTextarea(i, e, 1)}
                  />
                  <Box display="flex" p={1} justify="center" alignItems="center" className={classes.textArea}>
                    <Box p={1} className={classes.textField2}>
                      <TextField
                        size="small" variant="outlined" helperText='Timer' name='timer'
                        className={classes.textField} margin='normal' value={x.timer}
                        onChange={e => handleTextarea(i, e, 1)}
                      />
                    </Box>

                    <Box flexShrink={0}>
                      <Tooltip title="delete step">
                        <ButtonBase>
                          <HighlightOffIcon
                            className={classes.button}
                            onClick={(e) => delStep(x, i, 1)} />
                        </ButtonBase>
                      </Tooltip>
                    </Box>
                  </Box>
                  <Box style={{ "textAlign": "left" }} pt={1}>
                    <input accept="image/*" className={classes.input} onChange={e => handleTextarea(i, e, 1)} id={"new-step-button-file" + i} name="stepPic" type="file" style={{ "display": "none" }} />
                    <label htmlFor={"new-step-button-file" + i}>
                      <IconButton color="primary" aria-label="upload picture" component="span">
                        <PhotoCamera />
                      </IconButton>
                      <span style={{ "fontWeight": 500 }}>
                        Add Image
                      </span>
                    </label>
                    {newTextArea[i].img_name && (<Box m={2} pt={0}>
                      File Selected: {newTextArea[i].img_name}
                      <Tooltip title="Remove Image">
                        <ButtonBase>
                          <HighlightOffIcon
                            className={classes.button}
                            onClick={() => deleteImage(i, 1)} />
                        </ButtonBase>
                      </Tooltip>
                    </Box>)}
                  </Box>
                </div>
              </Box>
            );
          })}
        </div>
      }

      {edit
        ? <div><Box m={2} pt={1}>
          <Tooltip title={"Create a step"}>
            <IconButton><AddBoxIcon onClick={() => addStep(1)} /></IconButton>
          </Tooltip>
        </Box>
          <Box>
            <Button color='secondary' onClick={handleAddStep} > {!loading ? ('Save New Steps') : (<CircularProgress color="inherit" size={25} />)}</Button>
          </Box>
        </div>
        : <Box m={2} pt={1}>
          <Button color='secondary' onClick={addStep}>Next Step</Button>
        </Box>
      }


      {/* </Typography> */}
    </div >
  )
}
export default Steps;
