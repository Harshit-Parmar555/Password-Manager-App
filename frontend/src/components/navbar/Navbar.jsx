import React from "react";
import "./Navbar.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "../../redux/store";
const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const login = localStorage.getItem("loginstate");
  const logout = useSelector((state) => state.islogin);
  const handlelogout = () => {
    dispatch(authActions.logout());
    localStorage.removeItem("loginstate");
    navigate("/login");
    alert("User Logout Successfull");
  };
  return (
    <>
      <nav className="navbar">
        <div className="nav-logo">mypassword.com</div>
        {login ? (
          <div onClick={handlelogout} className="logout-btn">
            Logout
          </div>
        ) : (
          ""
        )}
      </nav>
    </>
  );
};

export default Navbar;
