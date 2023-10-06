import Anh from "../img/shop_01.jpg"
import {Link} from "react-router-dom";
const Detail = () => {
  return(
      <>
          <section className="bg-light">
              <div className="container pb-5">
                  <div className="row">
                      <div className="col-lg-5 mt-5">
                          <div className="card mb-3">
                              <img className="card-img img-fluid" src={Anh}
                                   alt="Card image cap" id="product-detail"/>
                          </div>
                      </div>
                      <div className="col-lg-7 mt-5">
                          <div className="card">
                              <div className="card-body">
                                  <h1 className="h2">Active Wear</h1>
                                  <p className="h3 py-2">$25.00</p>
                                  <ul className="list-inline">
                                      <li className="list-inline-item">
                                          <h6>Brand:</h6>
                                      </li>
                                      <li className="list-inline-item">
                                          <p className="text-muted"><strong>Easy Wear</strong></p>
                                      </li>
                                  </ul>

                                  <h6>Description:</h6>
                                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod temp
                                      incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse. Donec
                                      condimentum elementum convallis. Nunc sed orci a diam ultrices aliquet interdum
                                      quis nulla.</p>

                                  <form action="" method="GET">
                                      <input type="hidden" name="product-title" value="Activewear"/>

                                              <div className="col-auto">
                                                  <ul className="list-inline pb-3">
                                                      <li className="list-inline-item">Size :
                                                          <input type="hidden" name="product-size" id="product-size"
                                                                 value="S"/>
                                                      </li>
                                                      <li className="list-inline-item"><span
                                                          >S</span></li>
                                                  </ul>
                                              </div>
                                              <div className="col-auto">
                                                  <ul className="list-inline pb-3">
                                                      <li className="list-inline-item text-right">
                                                          Quantity
                                                          <input type="hidden" name="product-quanity"
                                                                 id="product-quanity" value="1"/>
                                                      </li>
                                                      <li className="list-inline-item"><span className="btn btn-success"
                                                                                             id="btn-minus">-</span>
                                                      </li>
                                                      <li className="list-inline-item"><span
                                                          className="badge bg-secondary" id="var-value">1</span></li>
                                                      <li className="list-inline-item"><span className="btn btn-success"
                                                                                             id="btn-plus">+</span></li>
                                                  </ul>
                                              </div>

                                          <div className="row pb-3">
                                              <div className="col d-grid">
                                                  <button type="submit" className="btn btn-success btn-lg" name="submit"
                                                          value="buy">Buy
                                                  </button>
                                              </div>
                                              <div className="col d-grid">
                                                  <button type="submit" className="btn btn-success btn-lg" name="submit"
                                                          value="addtocard">Add To Cart
                                                  </button>
                                              </div>
                                          </div>
                                  </form>

                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </section>
          <section className="py-5">
              <div className="container">
                  <div className="row text-left p-2 pb-3">
                      <h4>Related Products</h4>
                  </div>

                  <div className="row">
                      <div className="col-md-4">
                          <div className="card mb-4 product-wap rounded-0">
                              <div className="card rounded-0">
                                  <img className="card-img rounded-0 img-fluid" src={Anh} alt="" style={{height:"400px",width:"auto",objectFit:"cover"}}/>
                                  <div
                                      className="card-img-overlay rounded-0 product-overlay d-flex align-items-center justify-content-center">
                                      <ul className="list-unstyled">
                                          {/*<li><a className="btn btn-success text-white" href="#"><i*/}
                                          {/*    className="far fa-heart"/></a></li>*/}
                                          <li><Link to="/detail" className="btn btn-success text-white mt-2"
                                                    href="#"><i className="far fa-eye"/></Link></li>
                                          <li><a className="btn btn-success text-white mt-2"
                                                 href="#"><i className="fas fa-cart-plus"/></a>
                                          </li>
                                      </ul>
                                  </div>
                              </div>
                              <div className="card-body">
                                  <a href="#" className="h3 text-decoration-none">Oupidatat non</a>
                                  <ul className="w-100 list-unstyled d-flex justify-content-between mb-0">
                                      <li>Over size</li>
                                  </ul>
                                  <p className="text-center mb-0">$250.00</p>
                              </div>
                          </div>
                      </div>
                      <div className="col-md-4">
                          <div className="card mb-4 product-wap rounded-0">
                              <div className="card rounded-0">
                                  <img className="card-img rounded-0 img-fluid" src={Anh} alt="" style={{height:"400px",width:"auto",objectFit:"cover"}}/>
                                  <div
                                      className="card-img-overlay rounded-0 product-overlay d-flex align-items-center justify-content-center">
                                      <ul className="list-unstyled">
                                          {/*<li><a className="btn btn-success text-white" href="#"><i*/}
                                          {/*    className="far fa-heart"/></a></li>*/}
                                          <li><Link to="/detail" className="btn btn-success text-white mt-2"
                                                    href="#"><i className="far fa-eye"/></Link></li>
                                          <li><a className="btn btn-success text-white mt-2"
                                                 href="#"><i className="fas fa-cart-plus"/></a>
                                          </li>
                                      </ul>
                                  </div>
                              </div>
                              <div className="card-body">
                                  <a href="#" className="h3 text-decoration-none">Oupidatat non</a>
                                  <ul className="w-100 list-unstyled d-flex justify-content-between mb-0">
                                      <li>Over size</li>
                                  </ul>
                                  <p className="text-center mb-0">$250.00</p>
                              </div>
                          </div>
                      </div>
                      <div className="col-md-4">
                          <div className="card mb-4 product-wap rounded-0">
                              <div className="card rounded-0">
                                  <img className="card-img rounded-0 img-fluid" src={Anh} alt="" style={{height:"400px",width:"auto",objectFit:"cover"}}/>
                                  <div
                                      className="card-img-overlay rounded-0 product-overlay d-flex align-items-center justify-content-center">
                                      <ul className="list-unstyled">
                                          {/*<li><a className="btn btn-success text-white" href="#"><i*/}
                                          {/*    className="far fa-heart"/></a></li>*/}
                                          <li><Link to="/detail" className="btn btn-success text-white mt-2"
                                                    href="#"><i className="far fa-eye"/></Link></li>
                                          <li><a className="btn btn-success text-white mt-2"
                                                 href="#"><i className="fas fa-cart-plus"/></a>
                                          </li>
                                      </ul>
                                  </div>
                              </div>
                              <div className="card-body">
                                  <a href="#" className="h3 text-decoration-none">Oupidatat non</a>
                                  <ul className="w-100 list-unstyled d-flex justify-content-between mb-0">
                                      <li>Over size</li>
                                  </ul>
                                  <p className="text-center mb-0">$250.00</p>
                              </div>
                          </div>
                      </div>
                  </div>

              </div>
          </section>
      </>
  );
}

export default Detail;