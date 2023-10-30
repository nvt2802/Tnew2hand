import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {infoAppUserByJwtToken} from "../service/AppUserService";
import Swal from "sweetalert2";
import {getQuantity} from "../service/CartService";

const Header = (re) => {
    const navigate =useNavigate();
    // const [JwtToken, setJwtToken] = useState(localStorage.getItem("JWT"));
    const [userName, setUsername] = useState("");
    const [quantity, setQuantity] = useState(0);
    const getUsername = async () => {
        const response = await infoAppUserByJwtToken();
        setUsername(response);
    };
    const loadQuantity = async (username) => {
      const res = await getQuantity(username);
      setQuantity(res.data);
    }
    useEffect(() => {
        getUsername();
        loadQuantity(userName);
    }, [userName,re]);
    const handleLogout = () => {
        localStorage.removeItem("JWT");
        setUsername(undefined);
        // setJwtToken(undefined);
        Swal.fire({
            title: "Logout successfully!",
            icon: "success",
        });
        navigate("/");
    }
    const handleToCart = () => {
        if(!userName){
            Swal.fire({
                title: "Please login before get cart!",
                icon: "error",
            });
            navigate("/login");
        }else{
            navigate("/cart")
        }
    }
    return(
        <>
            <nav className="navbar navbar-expand-lg navbar-light shadow">
                <div className="container d-flex justify-content-between align-items-center">

                    <Link to="/" className="navbar-brand text-success logo h1 align-self-center" >
                        Tnew
                    </Link>

                    <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse"
                            data-bs-target="#templatemo_main_nav" aria-controls="navbarSupportedContent" aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"/>
                    </button>

                    <div className="align-self-center collapse navbar-collapse flex-fill  d-lg-flex justify-content-lg-between"
                         id="templatemo_main_nav">
                        <div className="flex-fill">
                            <ul className="nav navbar-nav d-flex justify-content-between mx-lg-auto">
                                <li className="nav-item">
                                    <Link to="/" className="nav-link" >Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/about" className="nav-link">About</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/shop" className="nav-link" >Shop</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/" className="nav-link">Contact</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="navbar align-self-center d-flex">
                            <div className="d-lg-none flex-sm-fill mt-3 mb-4 col-7 col-sm-auto pr-3">
                                <div className="input-group">
                                    <input type="text" className="form-control" id="inputMobileSearch" placeholder="Search ..."/>
                                    <div className="input-group-text">
                                        <i className="fa fa-fw fa-search"/>
                                    </div>
                                </div>
                            </div>
                            {/*<a className="nav-icon d-none d-lg-inline" href="#" data-bs-toggle="modal"*/}
                            {/*   data-bs-target="#templatemo_search">*/}
                            {/*    <i className="fa fa-fw fa-search text-dark mr-2"></i>*/}
                            {/*</a>*/}
                            <a className="nav-icon position-relative text-decoration-none" href="#" onClick={()=>handleToCart()}>
                                <i className="fa fa-fw fa-cart-arrow-down text-dark mr-1"/>
                                {!(quantity<1)?<span
                                    className="position-absolute top-0 left-100 translate-middle badge rounded-pill bg-light text-dark">{quantity}</span>:null}

                            </a>
                            <div className="btn-group">
                                <a type="button" className="nav-icon position-relative text-decoration-none dropdown-toggle"
                                        data-bs-toggle="dropdown" aria-expanded="false">
                                    <i className="fa fa-fw fa-user text-dark mr-3"/>
                                </a>
                                {!userName ?<ul className="dropdown-menu">

                                        <li><Link to="/login" className="dropdown-item" >Login</Link></li>
                                        <li><Link to="/signup" className="dropdown-item" >Signup</Link></li>
                                    </ul>
                                        :
                                    <ul className="dropdown-menu">

                                        <li><span className="dropdown-item" >{userName}</span></li>
                                        <li><Link to="/profile" className="dropdown-item" >Profile</Link></li>
                                        <li><Link to="/history" className="dropdown-item" href="#">Purchase history</Link></li>
                                        <li>
                                            <hr className="dropdown-divider"/>
                                        </li>
                                        <li><a className="dropdown-item" href="#" onClick={()=>handleLogout()}>Logout</a></li>
                                    </ul>
                                }

                            </div>
                        </div>
                    </div>

                </div>
            </nav>
        </>
    );
}

export default Header