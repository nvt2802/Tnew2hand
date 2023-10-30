import "./login.module.css"
import {Formik,Form,Field} from "formik";
import {addJwtTokenToLocalStorage, loginByUserName} from "../../service/AppUserService";
import {Link, useNavigate} from "react-router-dom";
import Swal from "sweetalert2";
import Header from "../Header";
import Footer from "../Footer";
import {useState} from "react";
const Login = () => {
    const navigate = useNavigate();
    const [submit,setSubmit] = useState(false);
    const loginByUser = async (appUser) => {
        try {
            const jwt = await loginByUserName(appUser);
            addJwtTokenToLocalStorage(jwt.data.jwtToken);
            navigate("/");
        }catch (e) {
            Swal.fire({
                icon: 'error',
                title: e.response.data,
            })
            setSubmit(false);
        }
    }
    return (<>
<Header/>
        <Formik
        initialValues={{
            userName:"",
            password:""
        }}
        onSubmit={(values, { setSubmitting }) => {
            setSubmitting(false);
            setSubmit(true);
            let cloneValues = {
                ...values,

            }
            loginByUser(cloneValues);
        }}
        >
            <Form>
                <div className="bg-light" style={{minHeight:"500px"}}>
                    <div className="container d-flex justify-content-center ">
                        <div style={{width:"400px",marginTop:"80px"}} className="bg-white h-auto p-3 border border-2 shadow-lg">
                            <h3 className="text-center text-success">Login</h3>
                                <div className=" my-4">
                                    <Field name="userName" type="text" className="form-control" placeholder="Enter your username"/>
                                </div>
                                <div className=" my-4">
                                    <Field name="password" type="password" className="form-control" placeholder="Enter your password"/>
                                </div>
                                <div className="d-flex justify-content-center my-4">
                                    {submit?<div className="spinner-border text-success" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>:<button type="submit" className="btn btn-success" >Login</button>
                                    }

                                </div>
                            <div className="signup">
                        <span className="signup">Don't have an account?
                        <Link to="/signup" className="text-success text-decoration-none">Signup</Link>
                        </span>
                            </div>
                        </div>
                    </div>
                </div>
            </Form>
        </Formik>
<Footer/>
        </>
    );
}
export default Login;