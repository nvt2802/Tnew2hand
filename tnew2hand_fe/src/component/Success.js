import Header from "./Header";
import Footer from "./Footer";
import './style.css';
import moment from "moment";
import {Link, useLocation} from "react-router-dom";

const Success = () => {
    const location = useLocation();
    return (
        <>
            <Header/>
            <div className="page-content container my-5">
                <div className="page-header text-blue-d2">
                    <h1 className="page-title text-secondary-d1">
                        Invoice
                        <small className="page-info">
                            <i className="fa fa-angle-double-right text-80"/>
                            ID: TN-{location.state.orderId}
                        </small>
                    </h1>
                </div>

                <div className="container px-0">
                    <div className="row mt-4">
                        <div className="col-12 col-lg-12">
                            <div className="row">
                                <div className="col-12">
                                    <div className="text-center text-150">
                                        <Link to="/" className="navbar-brand text-success logo h1 align-self-center">
                                            Tnew
                                        </Link>
                                    </div>
                                </div>
                            </div>


                            <hr className="row brc-default-l1 mx-n1 mb-4"/>

                            <div className="row">
                                <div className="col-sm-6">
                                    <div>
                                        <span className="text-sm text-grey-m2 align-middle">To:</span>
                                        <span
                                            className="text-600 text-110 text-blue align-middle">{location.state.user.name}</span>
                                    </div>
                                    <div className="text-grey-m2">
                                        <div className="my-1">
                                            {location.state.user.address}
                                        </div>

                                        <div className="my-1"><i
    className="fa fa-phone fa-flip-horizontal text-secondary"/> <b
                                            className="text-600">{location.state.user.phoneNumber}</b></div>
                                    </div>
                                </div>


                                <div className="text-95 col-sm-6 align-self-start d-sm-flex justify-content-end">
                                    <hr className="d-sm-none"/>
                                    <div className="text-grey-m2">
                                        <div className="mt-1 mb-2 text-secondary-m1 text-600 text-125">
                                            Invoice
                                        </div>

                                        <div className="my-2"><i className="fa fa-circle text-blue-m2 text-xs mr-1"/>
                                            <span className="text-600 text-90">ID:</span> TN-{location.state.orderId}
                                        </div>

                                        <div className="my-2"><i className="fa fa-circle text-blue-m2 text-xs mr-1"/>
                                            <span
                                                className="text-600 text-90">Issue Date:</span>{ moment(location.state.order.create_time).format("YYYY-MM-DD HH:mm:ss")}
                                        </div>

                                        <div className="my-2"><i className="fa fa-circle text-blue-m2 text-xs mr-1"></i>
                                            <span
                                                className="text-600 text-90">Status:</span>{location.state.order.status}
                                        </div>
                                    </div>

                                </div>

                                <div className="mt-4">
                                    <div className="row text-600 text-white bgc-default-tp1 py-25">
                                        <div className="d-none d-sm-block col-1">#</div>
                                        <div className="col-9 col-sm-5">Product</div>
                                        <div className="d-none d-sm-block col-4 col-sm-2">Qty</div>
                                        <div className="d-none d-sm-block col-sm-2">Unit Price</div>
                                        <div className="col-2">Amount</div>
                                    </div>

                                    <div className="text-95 text-secondary-d3">
                                        {location.state.orderItem.map((item,index)=>{
                                            return(
                                                <div key={index} className="row mb-2 mb-sm-0 py-25 bgc-default-l4">
                                                    <div className="d-none d-sm-block col-1">{index+1}</div>
                                                    <div className="col-9 col-sm-5">{item.product.name}</div>
                                                    <div className="d-none d-sm-block col-2">{item.quantity}</div>
                                                    <div className="d-none d-sm-block col-2 text-95">${item.product.price}</div>
                                                    <div className="col-2 text-secondary-d2">${item.product.price*item.quantity}</div>
                                                </div>
                                            );
                                         })}
                                    </div>

                                    <div className="row border-b-2 brc-default-l2"/>


                                    <div className="row mt-3">
                                        <div className="col-12 col-sm-7 text-grey text-90 order-first order-sm-last"/>
                                        <div className="col-12 col-sm-5 text-grey text-90 order-first order-sm-last">

                                            <div className="row my-2 align-items-center bgc-primary-l3 p-2">
                                                <div className="col-7 text-right">
                                                    Total Amount
                                                </div>
                                                <div className="col-5">
                                                    <span
                                                        className="text-150 text-success-d3 opacity-2">${location.state.totalPrice}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <hr/>

                                    <div>
                                        <span className="text-secondary-d1 text-105">Thank you for your business</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
                <Footer/>
            </>

            )
            }
            export default Success;