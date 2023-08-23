import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GlobalStyles from "./GlobalStyles";
import Home from "./Components/Home";
import Header from "./Components/Header";
import Signin from "./Components/Singin";
import Historical from "./Components/Historical";
import Table from "./Components/Table";
import Footer from "./Components/Footer";
import Registration from "./Components/Registration";
import AddTag from "./Components/AddTag";
import DataProcess from "./Components/DataProcess";
import Reset from "./Components/Reset";
import { useContext } from "react";
import { UserContext } from "./Components/Context";
import CreateAccount from "./Components/Login";

const App = () => {
  const {user, setUser} = useContext(UserContext)

  return (
    <Router>
      <GlobalStyles/>
      <Header user = {user} setUser = {setUser}/>
      <>
        <Routes>
          <Route path = "/" element = {!user? <Signin/> : <Home user = {user}/>}/>
          <Route path = "/newAccount" element = {<CreateAccount/>}/>
          <Route path="/:account/historical"  element={<Historical user = {user}/>} />
          <Route path="/:account/table"  element={<Table user = {user}/>} />
          <Route path="/:account/add"  element={<AddTag />} />
          <Route path="/newAccount/:account/registration" element ={<Registration/>} />
          <Route path="/:account/dataProcess" element ={<DataProcess data = {user}/>}/>
          <Route path="/resetPassword" element = {<Reset/>}/>
        </Routes>
      </>
      <Footer/>
    </Router>
  );
}

export default App;
