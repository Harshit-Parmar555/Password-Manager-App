import React from "react";
import { useForm } from "react-hook-form";
import "../mainpage/Main.css";
import Box from "../box/Box";
import { useSelector } from "react-redux";
import axios from "axios";
import { useState, useEffect } from "react";

const Main = () => {
  const [userpasswords, setuserpasswords] = useState([]);
  const login = localStorage.getItem("loginstate");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const getuserpasswords = async () => {
    try {
      const id = localStorage.getItem("userid");
      const { data } = await axios.get(`/api/v1/password/getpasswords/${id}`);
      setuserpasswords(data.user.passwords);
    } catch (error) {
      console.log("error in the get password function", error);
    }
  };

  useEffect(() => {
    getuserpasswords();
  }, []);

  const onSubmit = async (data) => {
    try {
      const userid = localStorage.getItem("userid");
      const response = await axios.post("/api/v1/password/createpassword", {
        website: data.website,
        websiteusername: data.username,
        websitepassword: data.password,
        user: userid,
      });
      if (response.data.success === true) {
        alert("new password added successfully");
        window.location.reload();
      }
    } catch (error) {
      console.log("error in create password btn" + error);
    }
  };

  return (
    <>
      {login ? (
        <div className="maincontainer">
          <div className="create">
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                className="f"
                type="text"
                placeholder="Enter Your Website URL"
                {...register("website")}
              />
              <input
                className="s"
                type="text"
                placeholder="Enter Your Username"
                {...register("username")}
              />
              <input
                className="s"
                type="text"
                placeholder="Enter Your Password"
                {...register("password")}
              />
              <button className="createbtn" type="submit">
                +CREATE
              </button>
            </form>
          </div>
          <div className="allpasswords">
            {userpasswords.map((index) => (
              <Box
                key={index._id}
                id={index._id}
                website={index.website}
                username={index.websiteusername}
                password={index.websitepassword}
              />
            ))}
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Main;
