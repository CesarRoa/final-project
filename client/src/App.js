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
import { useContext, useEffect, useState} from "react";
import { UserContext } from "./Components/Context";
import CreateAccount from "./Components/Login";
import Loading from "./Loading"

const App = () => {
  const [isLoading, setIsLoading] = useState(true)
  const {user, setUser} = useContext(UserContext)


  useEffect(() => {
    const verifyStoredToken = async () => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const response = await fetch("/api/verify", {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = await response.json();
                if (data) {
                    setUser(data); // Update your user context.
                    setIsLoading(false);
                }
            } catch (error) {
                console.error("Failed to verify token:", error);
            }
        }
    };

    verifyStoredToken();
}, []);

  return (
    <Router>
      <GlobalStyles/>
      <Header user = {user} setUser = {setUser}/>
        {isLoading?
        <Loading/>
        :
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
      }
      <Footer/>
    </Router>
  );
}

export default App;
