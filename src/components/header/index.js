import { Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { BsFillBriefcaseFill } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import "./index.css";

const Header = () => {
  const navigate = useNavigate();

  const logoutSession = () => {
    Cookies.remove("jobby_jwt_token");
    navigate("/login");
  };

  return (
    <nav className="header-jobby-nav">
      <div className="navbar-main-container">
        <Link to={"/"} className="link-item-icon-nav">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="navbar-website-logo"
          />
        </Link>
        <div className="d-none d-md-block">
          <div className="d-flex align-items-center mr-1 ml-1">
            <Link to={"/"} className="link-items-text-nav mr-3">
              <p className="navbar-items-text">Home</p>
            </Link>
            <Link to={"/jobs"} className="link-items-text-nav ml-3">
              <p className="navbar-items-text">Jobs</p>
            </Link>
          </div>
        </div>
        <div className="d-md-none">
          <div className="d-flex align-items-center mr-1 ml-1">
            <Link to={"/"} className="link-item-icon-nav mr-3">
              <AiFillHome className="items-icon-nav" />
            </Link>
            <Link to={"/jobs"} className="link-item-icon-nav mr-3 ml-1">
              <BsFillBriefcaseFill className="items-icon-nav" />
            </Link>
            <button
              className="button-logout-icon-nav"
              type="button"
              onClick={logoutSession}
            >
              <FiLogOut className="items-icon-nav" />
            </button>
          </div>
        </div>
        <div className="d-none d-md-block mr-1 ml-1">
          <button
            className="logout-button-nav"
            type="button"
            onClick={logoutSession}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
