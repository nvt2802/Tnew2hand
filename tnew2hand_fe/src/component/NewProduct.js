import Anh1 from "../img/feature_prod_01.jpg"
import Anh2 from "../img/feature_prod_02.jpg"
import Anh3 from "../img/feature_prod_03.jpg"
import {useEffect, useState} from "react";
import {getNewProduct} from "../service/ProductService";
import {Link} from "react-router-dom";

const NewProduct = () => {
    const [listNew,setListNew] = useState([]);
    const loadList = async () => {
      const res = await getNewProduct();
      setListNew(res.data.content)
    }
    useEffect(()=>{
        loadList();
    },[])
  return(
      <section className="bg-light">
          <div className="container py-5">
              <div className="row text-center py-3">
                  <div className="col-lg-6 m-auto">
                      <h1 className="h1 text-uppercase">New product</h1>
                      <p>
                          Reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                          Excepteur sint occaecat cupidatat non proident.
                      </p>
                  </div>
              </div>
              <div className="row">
                  {listNew.map((product,index)=>{
                      return(
                          <div className="col-12 col-md-4 mb-4" key={index}>
                              <div className="card h-100">
                                  <Link to={`/detail/${product.id}`}>
                                      <img src={product.img} className="card-img-top" alt="..." style={{height:"400px",objectFit:"cover"}}/>
                                  </Link>
                                  <div className="card-body">
                                      <ul className="list-unstyled d-flex justify-content-between">
                                          <li>
                                              <i className="text-warning fa fa-star"/>
                                              <i className="text-warning fa fa-star"/>
                                              <i className="text-warning fa fa-star"/>
                                              <i className="text-warning fa fa-star"/>
                                              <i className="text-warning fa fa-star"/>
                                              {/*<i className="text-muted fa fa-star"/>*/}
                                              {/*<i className="text-muted fa fa-star"/>*/}
                                          </li>
                                          <li className="text-muted text-right">${product.price}</li>
                                      </ul>
                                      <Link to={`/detail/${product.id}`} className="h2 text-decoration-none text-dark">{product.name}</Link>
                                      <p className="card-text">
                                          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt in culpa qui officia
                                          deserunt.
                                      </p>
                                  </div>
                              </div>
                          </div>
                      );
                  })}

              </div>
          </div>
      </section>
  );
}
export default NewProduct;