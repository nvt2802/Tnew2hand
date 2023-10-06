// import Anh from "../img/shop_01.jpg"
import Anh from "../img/banner_img_05.jpg"
import {Link} from "react-router-dom";

const Shop = () => {
    return (
        <div className="container py-5">
            <div className="row">

                <div className="col-lg-3">
                    <h1 className="h2 pb-4">Categories</h1>
                    <ul className="list-unstyled ">
                        <li className="list-unstyled">
                            <a className="h3 text-dark text-decoration-none mb-3" href="#">All</a>
                        </li>
                        <li className="list-unstyled">
                            <a className="h3 text-dark text-decoration-none mb-3" href="#">Shirt</a>
                        </li>
                        <li className="list-unstyled">
                            <a className="h3 text-dark text-decoration-none" href="#">Trousers</a>
                        </li>
                    </ul>
                </div>

                <div className="col-lg-9">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="d-flex">
                                <select className="form-control">
                                    <option>Featured</option>
                                    <option>A to Z</option>
                                    <option>Item</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-6 pb-4">

                            <div className="input-group mb-2">
                                <input type="text" className="form-control" id="inputModalSearch" name="q"
                                       placeholder="Search ..."/>
                                <button type="submit" className="input-group-text bg-success text-light">
                                    <i className="fa fa-fw fa-search text-white"></i>
                                </button>
                            </div>
                        </div>
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
                    </div>
                    <div className="row">
                        <ul className="pagination pagination-lg justify-content-end">
                            <li className="page-item">
                                <a className="page-link rounded-0 shadow-sm border-top-0 border-left-0 text-dark"
                                   href="#">prev</a>
                            </li>
                            <li className="page-item disabled">
                                <span className="page-link rounded-0 shadow-sm border-top-0 border-left-0 text-dark"
                                  >1/1</span>
                            </li>
                            <li className="page-item">
                                <a className="page-link rounded-0 shadow-sm border-top-0 border-left-0 text-dark"
                                   href="#">next</a>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>
        </div>
);
}

export default Shop;