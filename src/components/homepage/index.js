import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import Header from "../header";
import "./index.css";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const jwtJobbyToken = Cookies.get("jobby_jwt_token");
    if (jwtJobbyToken === undefined) {
      navigate("/login");
    }
    //eslint-disable-next-line
  }, []);

  return (
    <>
      <Header />
      <div className="home-jobby-bg-container">
        <h1 className="home-main-heading">Find The Job That Fits Your Life</h1>
        <p className="home-description">
          Millions of people are searching for jobs, salary information, company
          reviews. Find the job that fits your abilities and potential.
        </p>
        <button
          className="home-find-jobs-button"
          type="button"
          onClick={() => navigate("/jobs")}
        >
          Find Jobs
        </button>
      </div>
    </>
  );
};

export default Home;
