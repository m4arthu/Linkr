import { BrowserRouter, Routes, Route } from "react-router-dom"
import { LoginPage } from "./pages/loginPage.js";
import { RegisterPage } from "./pages/registerPage.js";
import { AuthProvider } from "./contexts/authContext.js";
import axios from "axios";
import HomePage from "./pages/HomePage.js";
import TimelinePage from "./pages/TimelinePage.js";
function App() {
  const  isLoged = () => {
    let token = localStorage.getItem("token")
    if(token){
      axios.defaults.headers.common["Authorization"] = token
      return true
    } else {
      return false
    }
  }
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route exact path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/timeline" element={<TimelinePage />} />
          <Route path="/home" element={<HomePage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
