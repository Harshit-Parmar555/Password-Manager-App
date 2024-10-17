import React from "react";
import "./page.css";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const registerdata = await axios.post("https://password-manager-app-3yo3.onrender.com/api/v1/user/userregister", {
        username: data.username,
        email: data.email,
        password: data.password,
      });
      if (registerdata.data.success === true) {
        alert("user register successfully");
        navigate("/login");
      } else if (registerdata.data.success === false) {
        alert(registerdata.data.message);
      }
    } catch (error) {
      console.log("error in login submit", error);
    }
  };
  return (
    <>
      <div className="container">
        <div className="box register" >
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              {...register("username")}
              placeholder="Enter Your username"
            />
            <input
              type="email"
              {...register("email")}
              placeholder="Enter Your email"
            />
            <input
              type="text"
              {...register("password")}
              placeholder="Enter Your Password"
            />
            <button type="submit">Submit</button>
            <div className="account">
              <Link to="/login">Already have an Account ? </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
