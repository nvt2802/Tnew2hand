import Header from "./Header";
import Footer from "./Footer";
import {useEffect, useState} from "react";
import {getOrdersHistory} from "../service/OrderService";
import {infoAppUserByJwtToken} from "../service/AppUserService";
import {Link} from "react-router-dom";

const History = () => {
    const [orders, setOrders]= useState([]);
    const loadHistory = async () => {
        const userName = infoAppUserByJwtToken();
        const res = await getOrdersHistory(userName);
        console.log(res)
        setOrders(res.data)
    }
    useEffect(()=>{
        loadHistory();
    },[])
    if(!orders){
        return null;
    }
    return (
        <>
            <Header/>
            <div className="container-fluid mt-5" style={{minHeight: "500px"}}>
                <h3 className="text-center text-uppercase">history</h3>
                {orders.map((order)=>{
                    let total = 0;
                    return(
                        <div className="border border-1 container rounded-3 shadow bg-light my-3" style={{width:"70%"}}>
                            <div className="container-fluid">
                                <h5 className="mt-2">{order.orderAs}</h5>
                                {order?.orderDetails.map((detail)=>{
                                    total = total + (detail.price * detail.quantity);
                                    return(
                                        <div>
                                            <hr/>
                                        <div className="container-fluid d-flex justify-content-between my-2" >
                                            <div className="d-flex">
                                                <img src={detail.product.img} alt="" style={{height: "110px",width:"150px",borderRadius:"10px",objectFit:"cover"}}/>
                                                <div className="mx-2">
                                                    <Link to={`/detail/${detail.product.id}`} className="d-block fw-bold text-decoration-none">{detail.product.name}</Link>
                                                    <span className="d-block text-secondary">Size: {detail.product.size}</span>
                                                    <span className="d-block">x {detail.quantity}</span>
                                                    <span className="text-danger d-block">${detail.price*detail.quantity}</span>
                                                </div>
                                            </div>
                                            <div >
                                                <button className="btn btn-success mx-1">Repurchase</button>
                                            </div>
                                        </div>
                                        </div>
                                    )
                                })}
                                <div>
                                    <hr/>
                                <div className="container d-flex justify-content-between my-2">
                                    <div/>
                                    <div className="">
                                        <span className="fw-bold ">Total: </span><span className="text-danger fs-4">${total}</span>
                                    </div>
                                </div>
                                </div>
                                <div className="container d-flex justify-content-between my-2">
                                    <div/>
                                    <div className="d-flex">
                                        <Link to={`/detail-history/${order.id}`} className="btn btn-outline-success mx-1">Detail</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
            <Footer/>
        </>
    )
}
export default History;