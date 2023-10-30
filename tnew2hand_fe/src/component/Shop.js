import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {getAllCategory, getAllProduct} from "../service/ProductService";
import {Formik, Form, Field} from "formik";
import * as Yup from "yup";
import Header from "./Header";
import Footer from "./Footer";
import {addToCart} from "../service/CartService";
import {infoAppUserByJwtToken} from "../service/AppUserService";
import {ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Swal from "sweetalert2";

const Shop = () => {
    const [products, setProduct] = useState([]);
    const [categories, setCategories] = useState([]);
    const [categorySearch, setCategorySearch] = useState(0);
    const [optionSort, setOptionSort] = useState("");
    const [page, setPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const [searchName, setSearchName] = useState("");
    const navigate = useNavigate();
    const loadProduct = async (page, sortBy, searchName, categorySearch) => {
        const res = await getAllProduct(page, sortBy, searchName, categorySearch);
        setProduct(res.data.content);
        setPage(res.data.pageable.pageNumber);
        setTotalPage(res.data.totalPages);
    }
    const loadCategory = async () => {
        const categoryTmp = await getAllCategory();
        setCategories(categoryTmp.data);
    }
    useEffect(() => {
        loadCategory();
    }, [])
    useEffect(() => {
        loadProduct(page, optionSort, searchName, categorySearch);
    }, [optionSort, page, searchName, categorySearch]);
    const handleSelectSort = (value) => {
        setOptionSort(value);
    }
    const handleResetSearch = () => {
        setCategorySearch(0);
        setOptionSort("");
        setSearchName("");
        setPage(0);
    }
    const handleAddToCard = async (productId) => {
        const userName = infoAppUserByJwtToken();
        if (!userName) {
            Swal.fire({
                title: "Please login before get cart!",
                icon: "error",
            });
            navigate("/login");
        } else {
            try {
                const res = await addToCart(userName, productId, 1);
                toast(`${res.data}`);
                navigate("/shop");
            } catch (e) {
                Swal.fire(`${e.response.data}`, "", "error");
            }
        }
    }
    return (
        <>
            <Header/>
            <div className="container py-5">
                <div className="row">

                    <div className="col-lg-3">
                        <h1 className="h2 pb-4">Categories</h1>
                        <ul className="list-unstyled ">
                            <li className="list-unstyled">
                                <a className="h3 text-dark text-decoration-none mb-3" href="#"
                                   onClick={() => setCategorySearch(0)}>All</a>
                            </li>
                            {categories.map((category) => {
                                return (
                                    <li className="list-unstyled">
                                        <a className="h3 text-dark text-decoration-none mb-3" href="#"
                                           onClick={() => setCategorySearch(category.id)}>{category.name}</a>
                                    </li>
                                )
                            })}
                            {/*<li className="list-unstyled">*/}
                            {/*    <a className="h3 text-dark text-decoration-none mb-3" >Shirt</a>*/}
                            {/*</li>*/}
                            {/*<li className="list-unstyled">*/}
                            {/*    <a className="h3 text-dark text-decoration-none" >Trousers</a>*/}
                            {/*</li>*/}
                        </ul>
                    </div>

                    <div className="col-lg-9">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="d-flex">
                                    <select onClick={(event) => handleSelectSort(event.target.value)}
                                            className="form-select">
                                        <option value="">Default</option>
                                        <option value="new">New</option>
                                        <option value="nameDecrease">A to Z</option>
                                        <option value="nameIncrease">Z to A</option>
                                        <option value="priceDecrease">prices decrease</option>
                                        <option value="priceIncrease">prices increase</option>
                                        <option value="sizeDecrease">Size decrease</option>
                                        <option value="sizeIncrease">Size increase</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-6 pb-4">
                                <Formik
                                    initialValues={{
                                        searchName: ""
                                    }}
                                    validationSchema={Yup.object({})}
                                    onSubmit={(values) => {
                                        setPage(0);
                                        setSearchName(values.searchName);
                                    }}
                                >
                                    <Form>
                                        <div className="input-group mb-2">
                                            <Field type="text" className="form-control" id="inputModalSearch"
                                                   name="searchName"
                                                   placeholder="Search ..."/>
                                            <button type="submit" className="input-group-text bg-success text-light">
                                                <i className="fa fa-fw fa-search text-white"/>
                                            </button>
                                            <button type="reset" className="input-group-text bg-success text-light"
                                                    onClick={() => handleResetSearch()}><i
                                                className="fas fa-sync-alt text-white"/></button>
                                        </div>
                                    </Form>
                                </Formik>
                            </div>
                        </div>
                        <div className="row">
                            {products.length === 0 ? <h3>No product found</h3> : products.map((product, index) => {
                                return (
                                    <div className="col-md-4" key={index}>
                                        <div className="card mb-4 product-wap rounded-0">
                                            <div className="card rounded-0">
                                                <img className="card-img rounded-0 img-fluid" src={product.img} alt=""
                                                     style={{height: "400px", width: "auto", objectFit: "cover"}}/>
                                                <div
                                                    className="card-img-overlay rounded-0 product-overlay d-flex align-items-center justify-content-center">
                                                    <ul className="list-unstyled">
                                                        {/*<li><a className="btn btn-success text-white" href="#"><i*/}
                                                        {/*    className="far fa-heart"/></a></li>*/}
                                                        <li><Link className="btn btn-success text-white mt-2"
                                                                  to={`/detail/${product.id}`}><i
                                                            className="far fa-eye"/></Link></li>
                                                        <li>
                                                            <button className="btn btn-success text-white mt-2"
                                                                    onClick={() => handleAddToCard(product.id)}><i
                                                                className="fas fa-cart-plus"/></button>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="card-body">
                                                <a href="#"
                                                   className="h3 text-decoration-none "><b>{product.name.length > 20 ? `${product.name.slice(0, 20)}...` : product.name}
                                                </b> </a>
                                                <ul className="w-100 list-unstyled d-flex justify-content-between mb-0">
                                                    <li>{product.size}</li>
                                                </ul>
                                                <p className="text-center mb-0">${product.price}</p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}

                        </div>
                        <div className="row">
                            <ul className="pagination pagination-lg justify-content-end">
                                <li className="page-item">
                                    {page > 0 ? <button
                                            className="page-link rounded-0 shadow-sm border-top-0 border-left-0 text-dark"
                                            onClick={() => setPage(page - 1)}>Prev</button> :
                                        <button
                                            className="page-link disabled rounded-0 shadow-sm border-top-0 border-left-0 text-dark"
                                        >Prev</button>}

                                </li>
                                <li className="page-item disabled">
                                <span className="page-link rounded-0 shadow-sm border-top-0 border-left-0 text-dark"
                                >{page + 1}/{totalPage}</span>
                                </li>
                                <li className="page-item">
                                    {page + 1 < totalPage ? <button
                                            className="page-link rounded-0 shadow-sm border-top-0 border-left-0 text-dark"
                                            onClick={() => setPage(page + 1)}>Next</button> :
                                        <button
                                            className="page-link rounded-0 shadow-sm border-top-0 border-left-0 text-dark"
                                        >Next</button>}
                                </li>
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
            <ToastContainer/>
            <Footer/>
        </>
    );
}

export default Shop;