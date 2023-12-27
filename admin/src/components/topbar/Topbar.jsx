import React from "react";
import "./topbar.css";
import { NotificationsNone, Language, Settings } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/userRedux";

export default function Topbar() {
  const dispatch = useDispatch()
  function logoutHandler(){
dispatch(logout())
  }
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">DASHBOARD</span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer" onClick={logoutHandler}>
            Logout
          </div>
          <img src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" className="topAvatar" />
        </div>
      </div>
    </div>
  );
}
