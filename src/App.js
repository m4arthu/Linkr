import { BrowserRouter, Routes, Route } from "react-router-dom"
import { LoginPage } from "./pages/loginPage.js";
import { RegisterPage } from "./pages/registerPage.js";
import { AuthProvider } from "./contexts/authContext.js";
/* import axios from "axios"; */
import HomePage from "./pages/HomePage.js";
import TrendPage from "./pages/TrendPage.js";
import UserPage from "./pages/UserPage.js";
import { useState } from "react";
function App() {
  /* const  isLoged = () => {
    let token = localStorage.getItem("token")
    if(token){
      axios.defaults.headers.common["Authorization"] = token
      return true
    } else {
      return false
    }
  } */
  let [click, setClick] = useState(false);

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route exact path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/home" element={<HomePage click={click} setClick={setClick}/>} />
          <Route path="/hashtag/:hashtag" element={<TrendPage click={click} setClick={setClick}/>} />
          <Route path="/user/:id" element={<UserPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;