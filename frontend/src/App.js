import "./App.css";
import Header  from './components/layout/Header'
import Footer  from './components/layout/Footer'
import Home from "./components/Home";
import  SignIn from './components/auth/SignIn'
import  SignUp from './components/auth/SignUp'
import User from './components/user'
import Admin from './components/admin'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Product from "./components/product";
import { useSelector } from "react-redux";
function App() {
  const { user } = useSelector((state) => state.User);
  return <div className="App">
    <Header/>
    <Router>
      <Routes>
        <Route path="/">
          <Route index element={<Home/>} />
           <Route path="product/:productID" element={<Product />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="signin" element={<SignIn />} /> 
        </Route>
      </Routes>
    </Router>
    <Footer/>
  </div>;
}

export default App;
