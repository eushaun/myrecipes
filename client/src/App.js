// import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateRecipe from "./pages/CreateRecipe";
import Recipes from "./pages/Recipes";
import FullRecipe from "./pages/FullRecipe";
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import EditRecipe from './pages/EditRecipe';
import BasicsPage from './pages/BasicsPage';
import Boiling from './pages/basics/Boiling';
import Knife from './pages/basics/Knife';
import Kitchen from './pages/basics/Kitchen';
import Storage from './pages/basics/Storage';

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Recipes} />
          <Route key="feed" path="/dashboard/" component={Recipes} />

          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />

          <Route path="/create-recipe" component={CreateRecipe} />

          <Route key="search" path='/search/:key' component={Recipes} />

          <Route path="/recipe/:rid" component={FullRecipe} />
          <Route path='/edit-recipe/:rid' component={EditRecipe} />

          <Route exact path='/profile/:uid' component={Profile} />
          <Route exact path='/edit-profile' component={EditProfile} />

          <Route exact path='/basics' component={BasicsPage} />
          <Route path='/basics/boiling-tips' component={Boiling} />
          <Route path='/basics/knife-skills' component={Knife} />
          <Route path='/basics/kitchen-hygiene' component={Kitchen} />
          <Route path='/basics/ingredient-storage' component={Storage} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};
