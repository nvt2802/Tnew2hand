import {Link, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getNewProduct, getProduct} from "../service/ProductService";
import Header from "./Header";
import Footer from "./Footer";
import {addToCart} from "../service/CartService";
import {infoAppUserByJwtToken} from "../service/AppUserService";
import Swal from "sweetalert2";
import {ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const Detail = () => {
    const param = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [listNew,setListNew] = useState([]);
    const loadList = async () => {
        const res = await getNewProduct();
        setListNew(res.data.content)
    }
    useEffect(()=>{
        loadList();
    },[])
    const loadProduct = async (id) => {
        const res = await getProduct(id);
        setProduct(res.data);
    }
    useEffect(() => {
        window.scrollTo(0, 0);
        loadProduct(param.id)
    }, [param])
    const handleAddToCard = async () => {
        const userName = infoAppUserByJwtToken();
        if(userName===undefined){
            Swal.fire('Please login before shopping!')
            navigate("/login");
        }else {
            try {
                const res = await addToCart(userName, param.id, quantity);
                toast("Added to cart")
                navigate(`/detail/${param.id}`);
            }catch (e) {
                Swal.fire(`${e.response.data}`, "", "error");
            }
        }
    }
    const handleAddToCard2 = async (productId) => {
        const userName = infoAppUserByJwtToken();
        if (userName === undefined) {
            console.log("Vui long dang nhap");

        } else {
            try {
                const res = await addToCart(userName, productId, 1);
                toast(`${res.data}`);
                navigate(`/detail/${param.id}`);
            } catch (e) {
                Swal.fire(`${e.response.data}`, "", "error");
            }
        }
    }
    if(product===null){
        return null;
    }
    return (
        <>
            <Header/>
            <ToastContainer/>
            <div className="bg-light">
                <div className="container pb-5">
                    <div className="row">
                        <div className="col-lg-5 mt-5">
                            <div className="card mb-3">
                                <img className="card-img img-fluid" src={product.img}
                                     alt="Card image cap" id="product-detail"/>
                            </div>
                        </div>
                        <div className="col-lg-7 mt-5">
                            <div className="card">
                                <div className="card-body">
                                    <h1 className="h2">{product.name}</h1>
                                    <p className="h3 py-2">${product.price}</p>
                                    <ul className="list-inline">
                                        <li className="list-inline-item">
                                            <h6>Category:</h6>
                                        </li>
                                        <li className="list-inline-item">
                                            {(product.category) ? <p className="text-muted"><strong>{product.category.name}</strong></p>:null}
                                        </li>
                                    </ul>

                                    <h6>Description:</h6>
                                    <p>{product.description}</p>

                                        <input type="hidden" name="product-title" value="Activewear"/>

                                        <div className="col-auto">
                                            <ul className="list-inline pb-3">
                                                <li className="list-inline-item">Size :
                                                    {/*<input type="hidden" name="product-size" id="product-size"*/}
                                                    {/*       value={}/>*/}
                                                </li>
                                                <li className="list-inline-item"><span
                                                >{product.size}</span></li>
                                            </ul>
                                        </div>
                                        <div className="col-auto">
                                            <ul className="list-inline pb-3">
                                                <li className="list-inline-item text-right">
                                                    Quantity
                                                    <input type="hidden" name="product-quanity"
                                                           id="product-quanity" value="1"/>
                                                </li>
                                                {!(quantity > 1) ?
                                                    <li className="list-inline-item"><span className="btn btn-success"
                                                                                           >-</span>
                                                    </li> :
                                                    <li className="list-inline-item">
                                                        <button className="btn btn-success"
                                                               onClick={()=>setQuantity((prev)=>prev-1)} >-
                                                        </button>
                                                    </li>
                                                }

                                                <li className="list-inline-item"><span
                                                    className="badge bg-secondary"
                                                    id="var-value">{quantity}/{product.quantity}</span></li>
                                                {!(quantity < product.quantity) ?
                                                    <li className="list-inline-item"><span
                                                        className="btn btn-success"
                                                        id="btn-plus">+</span></li> :
                                                    <li className="list-inline-item">
                                                        <button className="btn btn-success"
                                                                onClick={()=>setQuantity((prev)=>prev+1)} >+
                                                        </button>
                                                    </li>}

                                            </ul>
                                        </div>
                                        <div className="row pb-3">
                                            <div className="col d-grid">
                                                <button type="submit" className="btn btn-success btn-lg"
                                                    onClick={()=>handleAddToCard()}
                                                >Add To Cart
                                                </button>
                                            </div>
                                        </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="py-5">
                <div className="container">
                    <div className="row text-left p-2 pb-3">
                        <h4>Related Products</h4>
                    </div>

                    <div className="row">
                        {listNew.map((product,index)=>{
                            return(
                                <div className="col-md-4">
                                    <div className="card mb-4 product-wap rounded-0">
                                        <div className="card rounded-0">
                                            <img className="card-img rounded-0 img-fluid" src={product.img} alt=""
                                                 style={{height: "400px", width: "auto", objectFit: "cover"}}/>
                                            <div
                                                className="card-img-overlay rounded-0 product-overlay d-flex align-items-center justify-content-center">
                                                <ul className="list-unstyled">
                                                    {/*<li><a className="btn btn-success text-white" href="#"><i*/}
                                                    {/*    className="far fa-heart"/></a></li>*/}
                                                    <li><Link to={`/detail/${product.id}`} className="btn btn-success text-white mt-2"
                                                              ><i className="far fa-eye"/></Link></li>
                                                    <li><button onClick={()=>handleAddToCard2(product.id)} className="btn btn-success text-white mt-2"
                                                           ><i className="fas fa-cart-plus"/></button>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <Link to={`/detail/${product.id}`} className="h3 text-decoration-none">${product.name}</Link>
                                            <ul className="w-100 list-unstyled d-flex justify-content-between mb-0">
                                                <li>{product.size}</li>
                                            </ul>
                                            <p className="text-center mb-0">${product.price}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                </div>
            </div>
            <Footer/>
        </>
    );
}

export default Detail;