import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Footer, Navbar } from "../components";
import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCerdentials } from "../redux/features/auth/authSlice";
import { useLoginMutation } from "../redux/features/auth/authApiSlice";

const Login = () => {
  const emailRef = useRef();
  const errRef = useRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading: loading }] = useLoginMutation();

  useEffect(() => {
    emailRef.current.focus();
  },[]);

  useEffect(() => {
    setError('');
  },[email, password]);

  const hanleLogin = async (e) => {
    e.preventDefault();
    try {
      const farmerData = await login({ email, password }).unwrap()
        dispatch(setCerdentials({ ...farmerData, email }));
        setEmail("");
        setPassword("");
        navigate("/addproduct");
    } catch (err) {
      if(!err?.reponse) {
        setError('Network Error');
      } else if (err.response?.status === 401) {
        setError("Invalid Credentials");
      } else if (err.response?.status === 404) {
        setError("User not found");
      } else if (err.response?.status === 400) {
        setError("Missing email or password");
      } else {
        setError("Something went wrong");
      }
      errRef.current.focus();
    }
    
  };
  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Farmer Login</h1>
        <hr />
        <p className="text-center text-danger" ref={errRef}>{error}</p>
        <div class="row my-4 h-100">
          <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
            <form>
              <div class="my-3">
                <label for="display-4">Email address</label>
                <input
                  ref={emailRef}
                  type="email"
                  class="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div class="my-3">
                <label for="floatingPassword display-4">Password</label>
                <input
                  type="password"
                  class="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="my-3">
                <p>New Here? <Link to="/register" className="text-decoration-underline text-info">Register</Link> </p>
              </div>
              <div className="text-center">
                <button class="my-2 mx-auto btn btn-dark" type="submit" onClick={hanleLogin} disabled={loading}>
                  {loading? ( <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>) : "Login"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
