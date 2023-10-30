import Header from "./Header";
import Footer from "./Footer";
import React, {useEffect, useRef, useState} from "react";
import {addToCart, deleteCartItem, getAllCart} from "../service/CartService";
import {infoAppUserByJwtToken} from "../service/AppUserService";
import Swal from "sweetalert2";
import {Link, useNavigate} from "react-router-dom";
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from "yup";
import {createOrder} from "../service/OrderService";
import {getUserByUserName} from "../service/UserService";

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [checkout, setCheckOut] = useState(true);
    const [user, setUser] = useState();
    const total = cartItems.reduce((accumulator, currentObject) => {
        return accumulator + (currentObject.product.price * currentObject.quantity);
    }, 0);
    const navigate = useNavigate();
    const loadCartItems = async () => {
        const userName = await infoAppUserByJwtToken();
        const res = await getAllCart(userName);
        setCartItems(res.data);
    }
    const loadUser = async () => {
        const userName = infoAppUserByJwtToken();
        try{
        const res = await getUserByUserName(userName);
        console.log(res);
        setUser(res.data);
        }catch (e) {
            console.log(e);
        }
    }
    useEffect(() => {
        loadCartItems()
    }, [])
    useEffect(() => {
        loadUser();
    }, [])
    const handleDeleteCartItem = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await deleteCartItem(id);
                    loadCartItems();
                    navigate("/cart");
                } catch (e) {
                    console.log(e);
                }
                Swal.fire(
                    'Deleted!',
                    'Your item has been deleted.',
                    'success'
                )
            }
        })
    }
    const handleSetQuantity = async (productId, quantity) => {
        const userName = await infoAppUserByJwtToken();
        await addToCart(userName, productId, quantity);
        loadCartItems();
    }
    //paypal
    const paypal = useRef();
    // const [transactionStatus, setTransactionStatus] = useState(null);
    const renderButton = (user) => {
        if (cartItems.length < 1) {
            Swal.fire({
                icon: 'error',
                title: 'Nothing in cart',
            })
        } else {
            setCheckOut(false);
            if (window.paypal) {
                window.paypal.Buttons().close();
            }
            window.paypal
                .Buttons({
                    createOrder: (data, actions, err) => {
                        return actions.order.create({
                            intent: "CAPTURE",
                            purchase_units: [
                                {
                                    description: "MacBook Laptop",
                                    amount: {
                                        currency_code: "USD",
                                        value: total,
                                    },
                                },
                            ],
                        });
                    },
                    onApprove: async (data, actions) => {
                        const order = await actions.order.capture();
                        const totalPrice = total;
                        const orderItem = cartItems;
                        console.log(totalPrice);
                        console.log(orderItem);
                        const userName = infoAppUserByJwtToken();
                        const res = await createOrder(userName, user)
                        console.log("success", order);
                        navigate("/success",{
                            state: {
                                orderItem:orderItem,
                                orderId:res.data,
                                totalPrice: totalPrice,
                                user: user,
                                order:order
                            },
                        });
                        // setTransactionStatus("success");
                    },
                    onError: (err) => {
                        console.log(err);
                        // setTransactionStatus("failure");
                        Swal.fire("Payment failed!", "", "error");
                    },
                })
                .render(paypal.current);
        }
    }
    return (
        <>
            <Header/>
            <div className="container-fluid mt-5" style={{minHeight: "500px"}}>
                <h1 className="text-center">CART</h1>
                <div className="row px-xl-5">
                    <div className="col-lg-7 table-responsive mb-5">
                        <table className="table table-success table-borderless table-hover text-center mb-0">
                            <thead>
                            <tr className="table-success">
                                <th style={{width: "340px"}}>Product</th>
                                <th>Price($)</th>
                                <th>Quantity</th>
                                <th>Amout($)</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody className="align-middle">
                            {!(cartItems.length<1)?cartItems.map((cartItem, index) => {
                                return (
                                    <tr key={index} className={cartItem.quantity > cartItem.product.quantity ? `table-danger` : `table-light`}>
                                        <td className="d-flex justify-content-start align-items-center"><Link to={`/detail/${cartItem.product.id}`} className="text-dark text-decoration-none"><img
                                            src={cartItem.product.img} alt=""
                                            style={{
                                                width: "50px",
                                                marginRight: "5px"
                                            }}/><span >{cartItem.product.name.length > 20 ?
                                            `${cartItem.product.name.slice(0, 20)}...` : cartItem.product.name}</span></Link>
                                        </td>
                                        <td className="align-middle">{cartItem.product.price}</td>
                                        <td className="align-middle">
                                            <div className="input-group quantity mx-auto" style={{width: "120px"}}>
                                                <div className="input-group-btn">
                                                    {(cartItem.quantity > 1) ?
                                                        <button className="btn btn-sm btn-success btn-minus"
                                                                onClick={() => handleSetQuantity(cartItem.product.id, -1)}>
                                                            <i className="fa fa-minus"/></button> :
                                                        <button className="btn btn-sm btn-secondary btn-minus disabled">
                                                            <i className="fa fa-minus"/></button>}
                                                </div>
                                                <p className=" border-0 text-center mx-1">{cartItem.quantity + "/" + cartItem.product.quantity}</p>
                                                {/*+`/`+cartItem.product.quantity*/}
                                                <div className="input-group-btn">
                                                    {(cartItem.quantity < cartItem.product.quantity) ?
                                                        <button className="btn btn-sm btn-success btn-plus"
                                                                onClick={() => handleSetQuantity(cartItem.product.id, 1)}>
                                                            <i className="fa fa-plus"/>
                                                        </button> :
                                                        <button className="btn btn-sm btn-secondary btn-plus disabled">
                                                            <i className="fa fa-plus"/>
                                                        </button>}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="align-middle">{cartItem.quantity * cartItem.product.price}</td>
                                        <td className="align-middle">
                                            <button className="btn btn-sm btn-danger"
                                                    onClick={() => handleDeleteCartItem(cartItem.id)}><i
                                                className="fa fa-times"/></button>
                                        </td>
                                    </tr>
                                )
                            }):<tr><td colSpan="5">Nothing in cart</td></tr>}
                            </tbody>
                        </table>
                    </div>
                    <div className="col-lg-5">
                        <div className="row">
                            {/*<h5 className="section-title position-relative text-uppercase mb-3"><span*/}
                            {/*    className="pr-3">CARD</span></h5>*/}
                            <div className="bg-light p-30 mb-5">

                                <div className="p-3">
                                    <div className="d-flex justify-content-between mt-2">
                                        <h5>Total</h5>
                                        <h5>${total}</h5>
                                    </div>
                                    {/*<div className="d-flex justify-content-center">*/}
                                    {/*    <a className=" btn btn-block btn-success font-weight-bold my-3 py-2">Check*/}
                                    {/*        out</a>*/}
                                    {/*</div>*/}
                                </div>
                            </div>
                        </div>
                        {!(cartItems.length<1)?<div className="row">
                            <Formik
                                initialValues={{
                                    name: user?.name,
                                    phoneNumber: user?.phoneNumber,
                                    address: user?.address,
                                    note: ""
                                }}
                                validationSchema={Yup.object({
                                    name: Yup.string().required("Please input name")
                                        .max(50,"Too many characters allowed")
                                        .matches(/^[\p{L}\s]+$/u,"The name contains only letter format"),
                                    phoneNumber: Yup.string().required("Please enter your address")
                                        .max(20)
                                        .matches(/^\d{5,10}$/u,"Wrong format"),
                                    address: Yup.string().required("Please enter the phone number")
                                        .max(100,"The address exceeds the allowed characters"),
                                })}
                                onSubmit={(value) => {
                                    renderButton(value);
                                }}
                            >
                                <Form>
                                    <h5 className="section-title position-relative text-uppercase mb-3"><span
                                        className="pr-3">info</span></h5>
                                    <div className="bg-light p-30 mb-5">

                                        <div className="p-3">
                                            <div className="d-flex ">
                                                <div className="col-3">
                                                    <label htmlFor="name" className="mt-1">Full name:</label>
                                                </div>
                                                <div className="col-9">
                                                    <Field name="name" id="name" type="text"
                                                           className="form-control w-100"/>
                                                    <div style={{height: "25px"}}>
                                                        <ErrorMessage name="name"
                                                                      style={{color: "red", marginLeft: "20px"}}
                                                                      component={"small"}/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="d-flex">
                                                <div className="col-3">
                                                    <label htmlFor="phone" className="mt-1">Phone number:</label>
                                                </div>
                                                <div className="col-9">
                                                    <Field name="phoneNumber" id="phone" type="text"
                                                           className="form-control w-100"/>
                                                    <div style={{height: "25px"}}>
                                                        <ErrorMessage name="phoneNumber"
                                                                      style={{color: "red", marginLeft: "20px"}}
                                                                      component={"small"}/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="d-flex">
                                                <div className="col-3">
                                                    <label htmlFor="address" className="mt-1">Address:</label>
                                                </div>
                                                <div className="col-9">
                                                    <Field name="address" id="address" type="text"
                                                           className="form-control w-100"/>
                                                    <div style={{height: "25px"}}>
                                                        <ErrorMessage name="address"
                                                                      style={{color: "red", marginLeft: "20px"}}
                                                                      component={"small"}/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="d-flex">
                                                <div className="col-3">
                                                    <label htmlFor="Note" className="mt-1">Note:</label>
                                                </div>
                                                <div className="col-9">
                                                    <textarea id="Note" className="form-control w-100"/>
                                                </div>
                                            </div>
                                            <Link to="/edit-user" className="text-decoration-none text-success text-center"><small>Edit default information</small></Link>
                                            <h5>Payments</h5>
                                            {checkout ? <div className="d-flex justify-content-center">
                                                <button type="submit"
                                                        className=" btn btn-block btn-success font-weight-bold my-3 py-2">Check
                                                    out
                                                </button>
                                            </div> : null}
                                            <div>
                                                <div ref={paypal}/>
                                            </div>
                                        </div>
                                    </div>
                                </Form>
                            </Formik>
                        </div>:null}
                    </div>
                </div>
            </div>
            <Footer/>
        </>

    );
}

export default Cart;