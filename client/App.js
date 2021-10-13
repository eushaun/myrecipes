import Button from '@material-ui/core/Button';
import FoodIcon from '@material-ui/icons/Fastfood';
import Knife from '@material-ui/icons/Restaurant';
import Kitchen from '@material-ui/icons/Kitchen';
import Water from '@material-ui/icons/Opacity';
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import 'fontsource-roboto';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Typography variant="h2" size="large">
          Welcome to the Basics!
        </Typography>
        <Typography variant="h6">
          From learning the bet way to chop an onion, to perfectly cooking rice,
          these are some basic tips and tricks to get you started
        </Typography>
        <br></br>
        <br></br>
        <br></br>
        <Grid container spacing={5} justify="center">
          <Grid item>
            <Button
              startIcon={<Kitchen />}
              href="ingredient-storage"
              size="large"
              style={{
                fontSize: 21
              }}
              variant="contained"
              color='secondary'>
              Ingredient Storage
            </Button>
          </Grid>


          <Grid item>
            <Button
              startIcon={<Knife />}
              href="knife-skills"
              size="large"
              style={{
                fontSize: 21
              }}
              //onClick= {() => alert('hello')}
              variant="contained"
              color='secondary'>
              Knife Skills
            </Button>
          </Grid>

          <Grid item>
            <Button
              startIcon={<Water />}
              href="boiling-tips"
              size="large"
              style={{
                fontSize: 21
              }}
              //onClick= {() => alert('hello')}
              variant="contained"
              color='secondary'>
              Boiling Tips
            </Button>
          </Grid>

          <Grid item>
            <Button
              startIcon={<FoodIcon />}
              href="kitchen-hygiene"
              size="large"
              style={{
                fontSize: 21
              }}
              //onClick= {() => alert('hello')}
              variant="contained"
              color='secondary'>
              Kitchen Hygiene
            </Button>
          </Grid>
        </Grid>
      </header>
    </div>
  );
}

export default App;
