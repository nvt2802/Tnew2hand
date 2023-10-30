import Header from "../Header";
import {Field, Form, Formik, ErrorMessage} from "formik";
import Footer from "../Footer";
import {Link, useNavigate} from "react-router-dom";
import {signupByUserName} from "../../service/AppUserService";
import * as Yup from "yup";
import Swal from "sweetalert2";
const Signup = () => {
    const navigate = useNavigate();
    const handleSignup = async (appUserSignup, setErrors) => {
        try {
            const res = await signupByUserName(appUserSignup);
            console.log(res)
            // sưeetalert
            Swal.fire(
                'Great!',
                'Signup successfully!',
                'success'
            )
            navigate("/login");
        } catch (err) {
            if (err.response.data) {
                setErrors(err.response.data);
            }
        }
    }

    return (<>
            <Header/>
            <Formik
                initialValues={{
                    userName: "",
                    password: "",
                    confirmPassword: ""
                }}
                validationSchema={Yup.object({
                    userName: Yup.string().required(),
                    password: Yup.string().required(),
                    confirmPassword: Yup.string().required().oneOf([Yup.ref('password'), null], 'Confirm Password must match Password')
                })}
                onSubmit={(values, {setErrors}) => {
                    console.log(values)
                    let cloneValues = {
                        ...values,
                    }
                    handleSignup(cloneValues, setErrors);
                }}
            >
                <Form>
                    <div className="bg-light" style={{minHeight: "600px"}}>
                        <div className="container d-flex justify-content-center ">
                            <div style={{width: "400px", marginTop: "80px"}}
                                 className="bg-white h-auto p-3 border border-2 shadow-lg">
                                <h3 className="text-center text-success">Signup</h3>
                                <div className="mb-2 mt-4">
                                    <Field name="userName" type="text" className="form-control"
                                           placeholder="Enter your username"/>
                                    <div style={{height: "20px"}}>
                                        <ErrorMessage name="userName" style={{color: "red", marginLeft: "20px"}}
                                                      component={"small"}/>
                                    </div>
                                </div>
                                <div className="mb-2 ">
                                    <Field name="password" type="password" className="form-control"
                                           placeholder="Enter your password"/>
                                    <div style={{height: "20px"}}>
                                        <ErrorMessage name="password" style={{color: "red", marginLeft: "20px"}}
                                                      component={"small"}/>
                                    </div>
                                </div>
                                <div>
                                    <Field name="confirmPassword" type="password" className="form-control"
                                           placeholder="Confirm your password"/>
                                    <div style={{height: "20px"}}>
                                        <ErrorMessage name="confirmPassword" style={{color: "red", marginLeft: "20px"}}
                                                      component={"small"}/>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-center mb-4 mt-2">
                                    <button type="submit" className="btn btn-success">Submit</button>
                                </div>
                                <div className="signup">
                        <span className="signup">If you had an account?
                        <Link to="/login" className="text-success text-decoration-none">Login</Link>
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
export default Signup;