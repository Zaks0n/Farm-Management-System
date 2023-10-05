import React from 'react'
import { useState } from "react";
import { Footer, Navbar } from "../components";
import { Link } from 'react-router-dom';
import { registerFarmer } from '../redux/features/farmers/apiCalls';
import { useDispatch, useSelector } from 'react-redux';

const Register = () => {
    const [fullName, setfullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    const [address, setAddress] = useState("");
    const [farmName, setFarmName] = useState("");
    const [farmSize, setFarmSize] = useState("");
    const [farmLocation, setFarmLocation] = useState("");
    const dispatch = useDispatch();
    //const navigate = useNavigate();
    const { loading, error} = useSelector((state) => state.faRegister);

    const handleReg = (e) => {
        e.preventDefault();
        registerFarmer({ fullName, email, password, phoneNo, address, farmName, farmSize, farmLocation }, dispatch);
        //navigate("/login");

    };
    return (
        <>
            <Navbar />
            <div className="container my-3 py-3">
                <h1 className="text-center">Farmer Register</h1>
                <hr />
                <div class="row my-4 h-100">
                    <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
                        <form>
                            <div class="form my-3">
                                <label for="fullName">Full Name</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    id="fullName"
                                    placeholder="Enter Your Name"
                                    onChange={(e) => setfullName(e.target.value)}
                                />
                            </div>
                            <div class="form my-3">
                                <label for="Email">Email address</label>
                                <input
                                    type="email"
                                    class="form-control"
                                    id="Email"
                                    placeholder="name@example.com"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div class="form  my-3">
                                <label for="Password">Password</label>
                                <input
                                    type="password"
                                    class="form-control"
                                    id="Password"
                                    placeholder="Password"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div class="form  my-3">
                                <label for="phone">Phone Number</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    id="phoneNo"
                                    placeholder="phone"
                                    onChange={(e) => setPhoneNo(e.target.value)}
                                />
                            </div>
                            <hr />
                            <div class="form  my-3">
                                <label for="address">Address</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    id="address"
                                    placeholder="address"
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </div>
                            <div class="form  my-3">
                                <label for="farmName">Farm Name</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    id="farmName"
                                    placeholder="farmName"
                                    onChange={(e) => setFarmName(e.target.value)}
                                />
                            </div>
                            <div class="form  my-3">
                                <label for="farmSize">Farm Size</label>
                                <input
                                    type="number"
                                    class="form-control"
                                    id="farmSize"
                                    placeholder="farmSize"
                                    onChange={(e) => setFarmSize(e.target.value)}
                                />
                            </div>
                            <div class="form  my-3">
                                <label for="farmLocation">Farm Location</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    id="farmLocation"
                                    placeholder="farmLocation"
                                    onChange={(e) => setFarmLocation(e.target.value)}
                                />
                            </div>
                            <div className="my-3">
                                <p>Already has an account? <Link to="/login" className="text-decoration-underline text-info">Login</Link> </p>
                            </div>
                            <div className="text-center">
                                <button class="my-2 mx-auto btn btn-dark" type="submit" onClick={handleReg} >
                                    {loading && (
                                        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                        )}
                                    Register
                                </button>
                                {error && <p className="text-danger">Something went wrong</p>}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Register