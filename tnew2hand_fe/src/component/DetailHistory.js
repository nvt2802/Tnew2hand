import Header from "./Header";
import Footer from "./Footer";
import {Link, useParams} from "react-router-dom";
import {getOrder} from "../service/OrderService";
import {useEffect, useState} from "react";
import {infoAppUserByJwtToken} from "../service/AppUserService";

const DetailHistory = () => {
    const param= useParams();
    const [order,setOrder]=useState();
    let total=0;
    const loadOrder = async (id) => {
        const userName = infoAppUserByJwtToken();
        const res = await getOrder(id,userName);
        console.log(res)
        setOrder(res.data);
    }
    useEffect(()=>{
        loadOrder(param.id)
    },[param])
    return (
        <>
            <Header/>
            <div className="container-fluid mt-5">
                <h3 className="text-center text-uppercase">Detail History</h3>
                <div className="container" style={{marginBottom:"70px"}}>
                    <div className="px-5">
                        <h5 className="text-uppercase">purchase information </h5>
                        <span className="d-block ms-3"><span className="fw-bold">Recipient name</span>: <span className="text-primary">{order?.recipientName}</span></span>
                        <span className="d-block ms-3"><span className="fw-bold">Phone number</span>: {order?.phoneNumber}</span>
                        <span className="d-block ms-3"><span className="fw-bold">Address</span>: {order?.address}</span>
                        <span className="d-block ms-3"><span className="fw-bold">Order as</span>: {order?.orderAs}</span>
                    </div>
                    <div >
                        <table className="table table-success table-striped">
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Product</th>
                                    <th>Price</th>
                                    <th>Qty</th>
                                    <th>Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                            {order?.orderDetails.map((detail,index)=>{
                                total +=detail.quantity*detail.price;
                                return(
                                    <tr key={index}>
                                        <td className="align-middle">{index+1}</td>
                                        <td className="align-middle"><img src={detail.product?.img} alt="" style={{height:"70px",width:"50px",objectFit:"cover"}}/><span>{detail.product.name}</span></td>
                                        <td className="align-middle">${detail.price}</td>
                                        <td className="align-middle">{detail.quantity}</td>
                                        <td className="align-middle">${detail.quantity*detail.price}</td>
                                    </tr>
                                );
                            })}
                            <tr>
                                <td colSpan="3"/>
                                <td className="fw-bold align-middle">Total</td>
                                <td className="text-danger fs-4">${total}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <Link to="/history" className="btn btn-success float-end">Back</Link>
                </div>
            </div>
            <Footer/>
        </>
    );
}
export default DetailHistory;