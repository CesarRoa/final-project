import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GlobalStyles from "./GlobalStyles";
import Home from "./Components/Home";
import Header from "./Components/Header";
import Signin from "./Components/Singin"
import { useContext } from "react";
import { UserContext } from "./Components/Context";

const App = () => {
  const {user} = useContext(UserContext)
  return (
    <Router>
      <GlobalStyles/>
      <Header/>
      <div>
        <Routes>
          <Route path = "/" element = {!user? <Signin/> : <Home/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;