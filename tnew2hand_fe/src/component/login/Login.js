import "./login.module.css"

const Login = () => {
    return (
        <div className="bg-light" style={{minHeight:"500px"}}>
            <div className="container d-flex justify-content-center ">
                <div style={{width:"400px",marginTop:"80px"}} className="bg-white h-auto p-3 border border-2 shadow-lg">
                    <h3 className="text-center text-success">Login</h3>
                    <form action="#">
                        <div className=" my-4">
                        <input type="text" className="form-control" placeholder="Enter your email"/>
                        </div>
                        <div className=" my-4">
                        <input type="password" className="form-control" placeholder="Enter your password"/>
                        </div>
                        <div className="d-flex justify-content-center my-4">
                            <button className="btn btn-success">Login</button>
                        </div>
                    </form>
                    <div className="signup">
                        <span className="signup">Don't have an account?
                        <a href={"#"} className="text-dark text-decoration-none">Signup</a>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Login;