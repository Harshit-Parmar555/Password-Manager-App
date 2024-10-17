import React from "react";
import "./page.css";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { authActions } from "../../redux/store";

const Login = () => {
  const islogin = useSelector((state) => state.islogin);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const logindata = await axios.post("https://password-manager-app-3yo3.onrender.com/api/v1/user/userlogin", {
        email: data.email,
        password: data.password,
      });
      if (logindata.data.success === true) {
        localStorage.setItem("userid", logindata.data.user._id);
        alert("user login successfully");
        dispatch(authActions.login());
        localStorage.setItem("loginstate", islogin);
        navigate("/main");
      } else if (logindata.data.success === false) {
        alert(logindata.data.message);
      } else if ((logindata.data.success = "passwordincorrect")) {
        alert(logindata.data.message);
      }
    } catch (error) {
      console.log("error in login submit", error);
    }
  };
  return (
    <>
      <div className="container">
        <div className="box login">
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              required
              type="email"
              {...register("email")}
              placeholder="Enter Your Email"
            />
            <input
              required
              type="text"
              {...register("password")}
              placeholder="Enter Your Password"
            />
            <button type="submit">Submit</button>
            <div className="account">
              <Link to="/">Want to Create Account ?</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
