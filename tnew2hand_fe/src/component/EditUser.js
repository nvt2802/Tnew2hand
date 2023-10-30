import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from "yup";
import Header from "./Header";
import Footer from "./Footer";
import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {infoAppUserByJwtToken} from "../service/AppUserService";
import {getUserByUserName, updateUser} from "../service/UserService";

const EditUser = () => {
    const navigate=useNavigate();
    const [user, setUser] = useState();
    useEffect(() => {
        loadUser();
    }, [])
    const loadUser = async () => {
        const userName = infoAppUserByJwtToken();
        const res = await getUserByUserName(userName);
        console.log(res)
        setUser(res.data);
    }
    if(!user){
        return null;
    }
    return (
        <>
            <Header/>
            <Formik
                initialValues={{
                    id: user?.id,
                    email: user?.email,
                    name: user?.name,
                    phoneNumber: user?.phoneNumber,
                    dob: user?.dob,
                    address: user?.address,
                    weight: user?.weight,
                    height: user?.height
                }}
                validationSchema={Yup.object({
                    email: Yup.string()
                        .required('Please enter your email')
                        .email('Invalid email format'),
                    name: Yup.string()
                        .required('Please input name')
                        .max(50, 'Too many characters allowed')
                        .matches(/^[\p{L}\s]+$/u, 'The name contains only letter format'),
                    phoneNumber: Yup.string()
                        .required('Please enter the phone number')
                        .max(20)
                        .matches(/^\d{5,10}$/, 'Wrong format'),
                    address: Yup.string()
                        .required('Please enter your address')
                        .max(100, 'The address exceeds the allowed characters'),
                    dob: Yup.date()
                        .max(new Date(Date.now() - 12 * 365 * 24 * 60 * 60 * 1000), 'You must be at least 12 years old')
                        .min(new Date(Date.now() - 100 * 365 * 24 * 60 * 60 * 1000), 'You must be less than 100 years old'),
                    height: Yup.number()
                        .min(1.3, 'Height must be greater than 1.3')
                        .max(2.2, 'Height must be less than 2.2'),
                    weight: Yup.number()
                        .min(30, 'Weight must be greater than 30')
                        .max(100, 'Weight must be less than 100'),
                })}
                onSubmit={async (values) => {
                    await updateUser(values);
                    navigate("/profile");
                }}
            >
                <Form className="d-flex justify-content-center bg-light"
                      style={{paddingBottom: "50px", paddingTop: "50px"}}>
                    <div className="p-3 px-5 border border-2  bg-white shadow col-12"
                         style={{borderRadius: "20px", width: "50%"}}>
                        <h4>Edit information</h4>
                        <label className="fw-bold" htmlFor="name">Name <sup className="text-danger">*</sup></label>
                        <Field name="name" id="name" type="text" className="form-control border-dark"/>
                        <div style={{height: "20px"}}>
                            <ErrorMessage name="name" style={{color: "red", marginLeft: "20px"}}
                                          component={"small"}/>
                        </div>
                        <label className="fw-bold" htmlFor="email">Email <sup className="text-danger">*</sup></label>
                        <Field name="email" id="email" type="text" className="form-control border-dark"/>
                        <div style={{height: "20px"}}>
                            <ErrorMessage name="email" style={{color: "red", marginLeft: "20px"}}
                                          component={"small"}/>
                        </div>
                        <label className="fw-bold" htmlFor="phoneNumber">Phone <sup className="text-danger">*</sup></label>
                        <Field name="phoneNumber" id="phoneNumber" type="text" className="form-control border-dark"/>
                        <div style={{height: "20px"}}>
                            <ErrorMessage name="phoneNumber" style={{color: "red", marginLeft: "20px"}}
                                          component={"small"}/>
                        </div>
                        <label className="fw-bold" htmlFor="dob">Date of birth </label>
                        <Field name="dob" id="dob" type="date" className="form-control border-dark"/>
                        <div style={{height: "20px"}}>
                            <ErrorMessage name="dob" style={{color: "red", marginLeft: "20px"}}
                                          component={"small"}/>
                        </div>
                        <div className="row">
                            <div className="col-lg-6">
                                <label className="fw-bold" htmlFor="weight">Weight(kg)</label>
                                <Field name="weight" id="weight" type="number" className="form-control border-dark" placeholder="50"/>
                                <div style={{height: "20px"}}>
                                    <ErrorMessage name="weight" style={{color: "red", marginLeft: "20px"}}
                                                  component={"small"}/>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <label className="fw-bold" htmlFor="height">Height(m)</label>
                                <Field name="height" id="height" type="number" className="form-control border-dark" placeholder="1,7"/>
                                <div style={{height: "20px"}}>
                                    <ErrorMessage name="height" style={{color: "red", marginLeft: "20px"}}
                                                  component={"small"}/>
                                </div>
                            </div>
                        </div>
                        <label className="fw-bold" htmlFor="address">Address <sup className="text-danger">*</sup></label>
                        <Field name="address" id="address" as="textarea" className="form-control border-dark"/>
                        <div style={{height: "20px"}}>
                            <ErrorMessage name="address" style={{color: "red", marginLeft: "20px"}}
                                          component={"small"}/>
                        </div>
                        <div className="d-flex justify-content-between">
                            <div/>
                            <div>
                                <Link to="/profile" className="btn btn-outline-success">Back</Link>
                                <button type="submit" className="mx-2 btn btn-success">Save</button>
                            </div>
                        </div>
                    </div>
                </Form>
            </Formik>
            <Footer/>
        </>
);

}
export default EditUser;