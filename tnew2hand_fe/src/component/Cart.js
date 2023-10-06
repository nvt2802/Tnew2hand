const Cart = () => {
  return(
      <div className="container-fluid mt-5" style={{minHeight: "500px"}}>
          <div className="row px-xl-5">
              <div className="col-lg-8 table-responsive mb-5">
                  <table className="table table-success table-borderless table-hover text-center mb-0">
                      <thead>
                      <tr className="table-success">
                          <th>Product</th>
                          <th>Price (đ)</th>
                          <th>Quantity</th>
                          <th>Total (đ)</th>
                          <th></th>
                      </tr>
                      </thead>
                      <tbody className="align-middle">
                      <tr className="table-light">
                          <td className="align-middle"><img src="./assets/img/product1.jpg" alt=""
                                                            style={{width: "50px",marginRight:"5px" }}/>Áo sơ mi</td>
                          <td className="align-middle">111,111</td>
                          <td className="align-middle">
                              <div className="input-group quantity mx-auto" style={{width: "100px"}}>
                                  <div className="input-group-btn">
                                      <a className="btn btn-sm btn-success btn-minus">
                                          <i className="fa fa-minus"></i>
                                      </a>
                                  </div>
                                  <input type="text" className="form-control form-control-sm border-0 text-center"/>
                                      <div className="input-group-btn">
                                          <a className="btn btn-sm btn-success btn-plus">
                                              <i className="fa fa-plus"></i>
                                          </a>
                                      </div>
                              </div>
                          </td>
                          <td className="align-middle">111,111</td>
                          <td className="align-middle"><a className="btn btn-sm btn-danger"><i
                              className="fa fa-times"></i></a></td>
                      </tr>

                      </tbody>
                  </table>

              </div>
              <div className="col-lg-4">

                  <h5 className="section-title position-relative text-uppercase mb-3"><span
                      className="pr-3">CARD</span></h5>
                  <div className="bg-light p-30 mb-5">

                      <div className="p-3">
                          <div className="d-flex justify-content-between mt-2">
                              <h5>Total</h5>
                              <h5>111,111 đ</h5>
                          </div>
                          <div className="d-flex justify-content-center">
                          <a className=" btn btn-block btn-success font-weight-bold my-3 py-2">Check out</a>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>

  );
}

export default Cart;