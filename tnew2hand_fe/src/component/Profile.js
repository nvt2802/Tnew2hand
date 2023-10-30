import Header from "./Header";
import Footer from "./Footer";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {infoAppUserByJwtToken} from "../service/AppUserService";
import {getUserByUserName} from "../service/UserService";

const Profile = () => {
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

    return (
        <>
            <Header/>
            <div className="bg-light " style={{paddingTop:"100px",paddingBottom:"100px"}}>
                <div className="container">
                    <div className="row">
                        <div className="p-3 border border-2 d-flex bg-white shadow col-lg-5"
                             style={{borderRadius: "20px"}}>
                            <img src="https://dvdn247.net/wp-content/uploads/2020/07/avatar-mac-dinh-1.png" alt=""
                                 style={{borderRadius: "20px"}}/>
                            <div className="ms-3">
                                <span className="d-block fw-bold text-primary">Hi, {user?.name}!</span>
                                <span className="d-block fw-bold text-secondary">{user?.userType?.name} <i
                                    className="fas fa-crown"/></span>
                            </div>
                        </div>
                        <div className="col-lg-7 px-3">
                            <div className="row">
                            <div className="p-3 px-5 border border-2  bg-white shadow col-12"
                                 style={{borderRadius: "20px"}}>
                                <h5 className="text-uppercase">information <Link to="/edit-user"><i className="fas fa-edit"/></Link></h5>
                                <div className="row container-fluid">
                                    <span className="d-block fw-bold col-lg-3">Email </span><span className="col-lg-9">{user?.email}</span>
                                    <span className="d-block fw-bold col-lg-3">Phone number</span><span className="col-lg-9">{user?.phoneNumber}</span>
                                    <span className="d-block fw-bold col-lg-3">Date of birth</span><span className="col-lg-9">{user?.dob}</span>
                                    <span className="d-block fw-bold col-lg-3">Address</span><span className="col-lg-9">{user?.address}</span>
                                    <span className="d-block fw-bold col-lg-3">Weight</span><span className="col-lg-9">{user?.weight} kg</span>
                                    <span className="d-block fw-bold col-lg-3">Height</span><span className="col-lg-9">{user?.height} m</span>
                                </div>
                            </div>
                                <div className="p-3 px-5 border border-2  bg-white shadow col-12"
                                     style={{borderRadius: "20px"}}>
                                    <h5 className="text-uppercase" >Account <Link><i className="fas fa-user-edit"/></Link></h5>
                                    <div className="row container-fluid">
                                        <span className="d-block fw-bold col-lg-3">User Name </span><span className="col-lg-9">{user?.appUser?.userName}</span>
                                        <span className="d-block fw-bold col-lg-3">Password</span><span className="col-lg-9">*********</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
}
export default Profile;