import { Route, Routes } from "react-router-dom";
import "./App.css";
import Hero from "./component/Hero/Hero";
import Element from "./Element";
import Products from "./component/Products/Products";
import Orders from "./component/Orders/Orders";
import About from "./component/About/About";
import Home from "./component/Home/Home";
import SignIn from "./component/SignIn/SignIn";
import SignUp from "./component/SignUp/SignUp";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Element />}>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
          <Route />
        </Route>
      </Routes>
      
    </>
  );
}

export default App;
