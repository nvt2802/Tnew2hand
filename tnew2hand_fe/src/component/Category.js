import Anh4 from "../img/banner_img_04.jpg"
import Anh5 from "../img/banner_img_05.jpg"
import Anh3 from "../img/category_img_03.jpg"
import {Link} from "react-router-dom";
const Category = () => {
  return(
      <section className="container py-5">
          <div className="row text-center pt-3">
              <div className="col-lg-6 m-auto">
                  <h1 className="h1">Categories of The Month</h1>
                  <p>
                      Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                      deserunt mollit anim id est laborum.
                  </p>
              </div>
          </div>
          <div className="row">
              <div className="col-12 col-md-4 p-5 mt-3">
                  <a href="#"><img src={Anh4}
                                   className="rounded-circle img-fluid border"/></a>
                  <h5 className="text-center mt-3 mb-3">Shirt</h5>
                  <p className="text-center"><Link to="/shop" className="btn btn-success">Go Shop</Link></p>
              </div>
              <div className="col-12 col-md-4 p-5 mt-3">
                  <a href="#"><img src={Anh5}
                                   className="rounded-circle img-fluid border"/></a>
                  <h2 className="h5 text-center mt-3 mb-3">Trousers</h2>
                  <p className="text-center"><Link to="/shop" className="btn btn-success">Go Shop</Link></p>
              </div>
              <div className="col-12 col-md-4 p-5 mt-3">
                  <a href="#"><img src={Anh3}
                                   className="rounded-circle img-fluid border"/></a>
                  <h2 className="h5 text-center mt-3 mb-3">Accessories</h2>
                  <p className="text-center"><Link to="/shop" className="btn btn-success">Go Shop</Link></p>
              </div>
          </div>
      </section>
  );
}
export default Category;