import React from "react";
import "./Box.css";
import axios from "axios";
const Box = (props) => {
  const handledelete = async () => {
    try {
      const response = await axios.delete(
        `/api/v1/password/deletepassword/${props.id}`
      );
      if (response.data.success) {
        alert("password deleted successfully");
        window.location.reload();
      }
    } catch (error) {
      console.log("error in the delete button" + error);
    }
  };
  return (
    <div className="password-box">
      <div>{props.website}</div>
      <div>{props.username}</div>
      <div>{props.password}</div>
      <div onClick={handledelete}  className="delete-btn">
        DELETE
      </div>
    </div>
  );
};

export default Box;
