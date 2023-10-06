import Header from "./component/Header";
import Footer from "./component/Footer";
import Banner from "./component/Banner";
import Category from "./component/Category";
import NewProduct from "./component/NewProduct";
import Shop from "./component/Shop";
import Cart from "./component/Cart";
import Login from "./component/login/Login";
import Detail from "./component/Detail";
import {BrowserRouter,Routes, Route} from "react-router-dom";
import Home from "./component/login/Home";
import About from "./component/About";


function App() {
  return (
      <BrowserRouter>
          <Header/>
          <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/shop" element={<Shop/>}/>
              <Route path="/detail" element={<Detail/>}/>
              <Route path="/cart" element={<Cart/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/about" element={<About/>}/>
          </Routes>
          <Footer/>
      </BrowserRouter>
  );
}

export default App;
