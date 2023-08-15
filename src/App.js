import {BrowserRouter,Routes,Route}from "react-router-dom"
import { LoginPage } from "./pages/loginPage.js";
import { RegisterPage } from "./pages/registerPage.js";
function App() {
  return (
   <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<LoginPage/>} />
      <Route path="/register" element={<RegisterPage/>} />
    </Routes>
   </BrowserRouter>
  );
}

export default App;
