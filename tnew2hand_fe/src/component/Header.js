import {Link} from "react-router-dom";

const Header = () => {
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
                        <span className="navbar-toggler-icon"></span>
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
                                        <i className="fa fa-fw fa-search"></i>
                                    </div>
                                </div>
                            </div>
                            {/*<a className="nav-icon d-none d-lg-inline" href="#" data-bs-toggle="modal"*/}
                            {/*   data-bs-target="#templatemo_search">*/}
                            {/*    <i className="fa fa-fw fa-search text-dark mr-2"></i>*/}
                            {/*</a>*/}
                            <Link className="nav-icon position-relative text-decoration-none" to="/cart">
                                <i className="fa fa-fw fa-cart-arrow-down text-dark mr-1"></i>
                                <span
                                    className="position-absolute top-0 left-100 translate-middle badge rounded-pill bg-light text-dark">7</span>
                            </Link>
                            <div className="btn-group">
                                <a type="button" className="nav-icon position-relative text-decoration-none dropdown-toggle"
                                        data-bs-toggle="dropdown" aria-expanded="false">
                                    <i className="fa fa-fw fa-user text-dark mr-3"/>
                                    <span
                                        className="position-absolute top-0 left-100 translate-middle badge rounded-pill bg-light text-dark">+99</span>

                                </a>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="#">Login</a></li>
                                    <li><a className="dropdown-item" href="#">Signup</a></li>
                                    <li><a className="dropdown-item" href="#">Profile</a></li>
                                    <li>
                                        <hr className="dropdown-divider"/>
                                    </li>
                                    <li><a className="dropdown-item" href="#">Logout</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>

                </div>
            </nav>
        </>
    );
}

export default Header