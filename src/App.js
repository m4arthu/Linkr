import { BrowserRouter, Routes, Route } from "react-router-dom"
import { LoginPage } from "./pages/loginPage.js";
import { RegisterPage } from "./pages/registerPage.js";
import { AuthProvider } from "./contexts/authContext.js";
import axios from "axios";
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
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
