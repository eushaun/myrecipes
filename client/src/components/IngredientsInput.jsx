import React from 'react';
import { Tooltip, Typography, TextField, Box, FormControl, Select, MenuItem, FormHelperText, ButtonBase } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { addRecipeIngredients, deleteRecipeIngredients, getIngredient } from '../actions/ingredient';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

const useStyles = makeStyles((theme) => ({
  textField: {
    width: '6ch',
  },
  textField2: {
    width: '10ch',
  },
  textField3: {
    width: '18ch',
  },
  textArea: {
    width: '40%',
  },
  // grid: {
  //   width: '150ch',
  // },
  searchText: {
    // width: '60ch',
    background: "#f1f1f1",
    '&:hover': {
      background: "#ec407a",
    },
  }
}));

const IngredientsInput = ({ ingredientData, rid, inputData, type }) => {
  const classes = useStyles();
  // eslint-disable-next-line no-unused-vars
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const [ingredientsList, setIngredientsList] = React.useState([]);
  const [newIngredientsList, setNewIngredientsList] = React.useState([]);
  const [search, setSearch] = React.useState([]);
  // eslint-disable-next-line no-unused-vars
  const loading = open && search.length === 0;
  React.useEffect(() => {
    if (type !== 'create') {
      setIngredientsList(inputData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputData]);

  // React.useEffect(() => {
  //   if (!open) {
  //     setSearch([]);
  //   }
  // }, [open]);

  // React.useEffect(() => {
  //   let active = true;

  //   // if (!loading) {
  //   //   return undefined;
  //   // }

  //   (async () => {
  //     const res = await axios.get(`http://localhost:3000/ingredient?ingredient=${query}`);
  //     const result = [...res.data.response];
  //     console.log(result);
  //     let l = [];
  //     let len = 0;
  //     if (result.length > 3) {
  //       len = 3;
  //     }
  //     else {
  //       len = result.length;
  //     }
  //     for (let i = 0; i < len; i++) {
  //       l.push({ "iid": result[i].iid, "name": result[i].name });
  //     }
  //     if (active) {
  //       setSearch(l);
  //     }
  //   })();

  //   return () => {
  //     active = false;
  //   };
  // }, [loading]);
  console.log(ingredientsList);
  const getIngredients = async (e) => {
    const query = e.target.value;
    if (query === '') {
      setSearch([]);
    }
    try {
      dispatch(getIngredient(query))
        .then(res => {
          const result = [...res.response];
          console.log(result);
          let l = [];
          let len = result.length;
          if (result.length > 5) {
            len = 5;
          }
          for (let i = 0; i < len; i++) {
            l.push({ "iid": result[i].iid, "name": result[i].name });
          }
          setSearch(l);
        })
        .catch(() => {
        })

    }
    catch (err) {
      console.log(err);
    }
  }
  const addIngredient = (x) => {
    // const newIngredients = [...ingredientsList];
    // newIngredients.push('');
    if (type !== 'edit') {
      setIngredientsList([...ingredientsList, { name: `${x.name}`, id: `${x.iid}`, quantity: "", unit: "", technique: "" }]);
    }
    else {
      setNewIngredientsList([...newIngredientsList, { name: `${x.name}`, id: `${x.iid}`, quantity: "", unit: "", technique: "", added: false }]);
    }
    setSearch([]);
    // setIngredientsList([...ingredientsList, { ingredient: `${x}`, cut: "", quantity: "", unit: "" }]);
  }

  const handleChange = (id, e, n) => {
    const { name, value } = e.target;

    if (n === 1) {
      const newIngredients = [...newIngredientsList];
      newIngredients[id][name] = value
      setNewIngredientsList(newIngredients);
      // if (type === 'edit') {
      //   addData(newIngredientsList);
      // }
    }
    else {
      const newIngredients = [...ingredientsList];
      newIngredients[id][name] = value;
      setIngredientsList(newIngredients);
    }
    ;
    // ingredientData(ingredientsList);
  }
  console.log(newIngredientsList);
  if (type === 'create') {
    ingredientData(ingredientsList);
  }
  const handleAdd = (i) => {

    const body = [{ "rid": rid, "iid": newIngredientsList[i].id, "quantity": newIngredientsList[i].quantity, "unit": newIngredientsList[i].unit, "technique": newIngredientsList[i].technique }];
    dispatch(addRecipeIngredients({ ingredients: body }))
      .then((res) => {
        console.log(res);
        newIngredientsList[i].added = true;
        delIngredient(newIngredientsList[i], i, 1);
        setIngredientsList([...ingredientsList, { name: newIngredientsList[i].name, id: newIngredientsList[i].iid, quantity: newIngredientsList[i].quantity, unit: newIngredientsList[i].unit, technique: newIngredientsList[i].technique }])
      })
      .catch((err) => {
        console.log(err);
      })
  }
  const delIngredient = (x, i, n) => {
    console.log(x);
    if (type === 'edit') {
      if (n === 1) {
        const l = [...newIngredientsList];
        l.splice(i, 1);
        setNewIngredientsList(l);
      }
      else {
        const body = [{ "rid": rid, "qid": x.qid, "iid": x.iid, "quantity": x.quantity, "unit": x.unit, "technique": x.technique }];
        console.log(body);
        dispatch(deleteRecipeIngredients(x.qid))
          .then((res) => {
            console.log(res);
            const l = [...ingredientsList];
            l.splice(i, 1);
            setIngredientsList(l);
          })
          .catch((err) => {
            console.log(err);
          })
      }
    }

    else {
      const l = [...ingredientsList];
      l.splice(i, 1);
      setIngredientsList(l);
    }
  }

  return (
    <div>
      <Box m={2} pt={1}>
        <Typography variant="h6" style={{ "textAlign": "left", "fontWeight": 900 }}>
          Ingredients
        </Typography>
      </Box>
      <Box m={2} pt={1}>
        <TextField fullWidth label="Search ingredients" name="ingredients" variant="outlined" onChange={getIngredients} />
      </Box>
      {/* <Autocomplete
        id="asynchronous-demo"
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        getOptionSelected={(option) => option.name}
        getOptionLabel={(option) => option.name}
        options={search}
        // loading={loading}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Asynchronous"
            variant="outlined"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {/* {loading ? <CircularProgress color="inherit" size={20} /> : null} */}
      {/* {params.InputProps.endAdornment} */}
      {/* </React.Fragment> */}
      {/* }}
          />
        )}
      /> */}
      {
        search.map((x, i) => {
          return (
            <Box display="flex" justifyContent="flex-start" alignItems="flex-start" className={classes.searchText} onClick={(e) => addIngredient(x)}>
              <ButtonBase>{x.name}</ButtonBase>
            </Box>
          )
        })
      }
      {ingredientsList.map((x, i) => {
        return (
          <Box display="flex" p={1} justify="center" alignItems="center" className={classes.textArea}>
            <Box p={2}>
              <TextField className={classes.textField3}
                helperText='ingredient' size="small" variant="filled" disabled InputLabelProps={{ shrink: true }}
                label='Ingredient' margin='normal' value={x.name}
                onChange={e => handleChange(i, e)} />
            </Box>
            <Box p={2}>
              <TextField
                size="small" variant="outlined" helperText='Cut' name='technique'
                className={classes.textField2} margin='normal' value={x.technique}
                onChange={e => handleChange(i, e)}
              />
            </Box>

            <Box p={2}>
              <TextField
                size="small" variant="outlined" helperText='Qt' name='quantity'
                className={classes.textField} margin='normal' value={x.quantity}
                onChange={e => handleChange(i, e)}
              />
            </Box>
            <Box p={4}>
              <FormControl>
                <Select name='unit' value={x.unit} onChange={e => handleChange(i, e)} className={classes.textField2}>
                  <MenuItem value={'number'}>number</MenuItem>
                  <MenuItem value={'g'}>grams</MenuItem>
                  <MenuItem value={'kg'}>kilograms</MenuItem>
                  <MenuItem value={'ml'}>millilitres</MenuItem>
                  <MenuItem value={'l'}>litres</MenuItem>
                  <MenuItem value={'tbsp'}>tablespoon</MenuItem>
                  <MenuItem value={'tsp'}>teaspoon</MenuItem>
                  <MenuItem value={'cup'}>cup</MenuItem>
                </Select>
                <FormHelperText>Unit</FormHelperText>
              </FormControl>
            </Box>
            <Box p={5}>
              <Tooltip title="remove ingredient">
                <ButtonBase>
                  <HighlightOffIcon
                    className={classes.button} onClick={(e) => delIngredient(x, i)} />
                </ButtonBase>
              </Tooltip>
            </Box>
          </Box>
        );
      })}

      {newIngredientsList.map((x, i) => {
        return (
          <Box display="flex" p={1} justify="center" alignItems="center" className={classes.textArea}>
            <Box p={2}>
              <TextField className={classes.textField3}
                helperText='ingredient' size="small" variant="filled" disabled InputLabelProps={{ shrink: true }}
                label='Ingredient' margin='normal' value={x.name}
                onChange={e => handleChange(i, e, 1)} />
            </Box>
            <Box p={2}>
              <TextField
                size="small" variant="outlined" helperText='Cut' name='technique'
                className={classes.textField2} margin='normal' value={x.technique}
                onChange={e => handleChange(i, e, 1)}
              />
            </Box>

            <Box p={2}>
              <TextField
                size="small" variant="outlined" helperText='Qt' name='quantity'
                className={classes.textField} margin='normal' value={x.quantity}
                onChange={e => handleChange(i, e, 1)}
              />
            </Box>

            <Box p={4}>
              <FormControl>
                <Select name='unit' value={x.unit} onChange={e => handleChange(i, e, 1)} className={classes.textField2}>
                  <MenuItem value={'number'}>number</MenuItem>
                  <MenuItem value={'g'}>grams</MenuItem>
                  <MenuItem value={'kg'}>kilograms</MenuItem>
                  <MenuItem value={'ml'}>millilitres</MenuItem>
                  <MenuItem value={'l'}>litres</MenuItem>
                  <MenuItem value={'tbsp'}>tablespoon</MenuItem>
                  <MenuItem value={'tsp'}>teaspoon</MenuItem>
                  <MenuItem value={'cup'}>cup</MenuItem>
                </Select>
                <FormHelperText>Unit</FormHelperText>
              </FormControl>
            </Box>
            <Box p={5}>
              <Tooltip title="remove ingredient">
                <ButtonBase>
                  <HighlightOffIcon
                    className={classes.button} onClick={(e) => delIngredient(x, i, 1)} />
                </ButtonBase>
              </Tooltip>
            </Box>
            <Box p={1}>

              {!x.added &&
                <Tooltip title="add ingredient">
                  <ButtonBase>
                    <AddCircleOutlineIcon
                      className={classes.button} onClick={(e) => handleAdd(i)} />
                  </ButtonBase>
                </Tooltip>
              }
            </Box>

          </Box>
        );
      })}
    </div>
  )
}

export default IngredientsInput;
