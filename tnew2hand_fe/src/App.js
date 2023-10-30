import Shop from "./component/Shop";
import Cart from "./component/Cart";
import Login from "./component/login/Login";
import Detail from "./component/Detail";
import {BrowserRouter,Routes, Route} from "react-router-dom";
import Home from "./component/login/Home";
import About from "./component/About";
import Signup from "./component/signup/Signup";
import Success from "./component/Success";
import History from "./component/History";
import DetailHistory from "./component/DetailHistory";
import Profile from "./component/Profile";
import EditUser from "./component/EditUser";


function App() {
  return (
      <BrowserRouter>

          <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/shop" element={<Shop/>}/>
              <Route path="/detail/:id" element={<Detail/>}/>
              <Route path="/cart" element={<Cart/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/about" element={<About/>}/>
              <Route path="/signup" element={<Signup/>}/>
              <Route path="/success" element={<Success/>}/>
              <Route path="/history" element={<History/>}/>
              <Route path="/profile" element={<Profile/>}/>
              <Route path="/edit-user" element={<EditUser/>}/>
              <Route path="/detail-history/:id" element={<DetailHistory/>}/>
          </Routes>
      </BrowserRouter>
  );
}

export default App;
