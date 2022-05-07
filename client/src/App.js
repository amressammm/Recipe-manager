import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter,
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import { SignIn } from './pages/SignIn';
import {SignUp} from './pages/SignUp'
import {HomePage} from './pages/HomePage'
import {CreateRecipe } from './pages/CreateRecipe';
import {RecipePage} from './pages/RecipePage';
import { EditPage } from './pages/EditPage';
function App() {
  return (
    <BrowserRouter>
    <div>
      <Routes>
        <Route path="/" element={<SignIn />} exact={true}></Route>
        <Route path="/register" element={<SignUp/>} exact={true}></Route>
        <Route path="/homePage" element={<HomePage/>} exact={true}></Route>
        <Route path="/createRecipe" element={<CreateRecipe/>} exact={true}></Route>
        <Route path="/recipePage" element={<RecipePage/>} exact={true}></Route>
        <Route path="/editPage" element={<EditPage/>} exact={true}></Route>

       
      </Routes>
    </div>
  </BrowserRouter>
);

}

export default App;
