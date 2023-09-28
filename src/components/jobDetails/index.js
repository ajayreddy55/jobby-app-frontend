import { AiFillStar } from "react-icons/ai";
import Header from "../header";
import "./index.css";
import { HiLocationMarker } from "react-icons/hi";
import { BiSolidBriefcaseAlt2 } from "react-icons/bi";
import { BsBoxArrowUpRight } from "react-icons/bs";
import SkillsCard from "../skillcard";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { Watch } from "react-loader-spinner";

const apiResponseConstants = {
  initial: "INITIAL",
  inProgress: "INPROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
};

const JobDetailsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [jobDetails, setJobDetails] = useState({});
  const [similarJobs, setSimilarJobs] = useState([]);
  const [jobDetailsResStatus, setJobDetailsResStatus] = useState(
    apiResponseConstants.initial
  );

  useEffect(() => {
    const jwtJobbyToken = Cookies.get("jobby_jwt_token");
    if (jwtJobbyToken === undefined) {
      navigate("/login");
    }
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    getJobDetails();
    //eslint-disable-next-line
  }, []);

  const getJobDetails = async () => {
    setJobDetailsResStatus(apiResponseConstants.inProgress);

    const jwtJobbyToken = Cookies.get("jobby_jwt_token");
    const url = `http://localhost:3005/api/jobs/${id}`;
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtJobbyToken}`,
      },
    };
    const jobDetailsRes = await fetch(url, options);

    if (jobDetailsRes.ok) {
      const jobDetailsResJson = await jobDetailsRes.json();
      setJobDetails(jobDetailsResJson.jobDetails);
      setSimilarJobs(jobDetailsResJson.similarJobs);
      setJobDetailsResStatus(apiResponseConstants.success);
    } else {
      setJobDetailsResStatus(apiResponseConstants.failure);
    }
  };

  const renderJobsDetailsView = () => {
    return (
      <div className="job-details-inner-container mt-3 mb-3">
        <div className="job-details-card">
          <div className="job-details-card-container">
            <div className="d-flex align-items-center mt-2 mb-2">
              <img
                src={jobDetails.companyLogoUrl}
                alt="website logo"
                className="job-details-website-logo"
              />
              <div className="d-flex flex-column ml-2">
                <h3 className="job-details-title">{jobDetails.title}</h3>
                <div className="d-flex align-items-center mt-1">
                  <AiFillStar className="job-details-star-icon" />
                  <p className="job-details-rating">{jobDetails.rating}</p>
                </div>
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-between flex-wrap mt-2 mb-2">
              <div className="d-flex align-items-center mr-1">
                <div className="d-flex align-items-center mr-2">
                  <HiLocationMarker className="job-details-location-icon" />
                  <p className="job-details-location-text">
                    {jobDetails.location}
                  </p>
                </div>
                <div className="d-flex align-items-center ml-3">
                  <BiSolidBriefcaseAlt2 className="job-details-location-icon" />
                  <p className="job-details-location-text">
                    {jobDetails.employmentType}
                  </p>
                </div>
              </div>
              <p className="job-details-package-text">
                {jobDetails.packagePerAnnum}
              </p>
            </div>
            <button className="job-details-applied-button" type="button">
              Apply
            </button>
            <hr className="job-details-hr-line" />
            <div className="d-flex flex-column mt-3 mb-3">
              <div className="d-flex align-items-center justify-content-between mb-1">
                <h3 className="job-details-description-heading">Description</h3>
                <a
                  className="job-details-visit-anchor"
                  href={jobDetails.companyWebsiteUrl}
                  target="__blank"
                >
                  Visit
                  <BsBoxArrowUpRight className="job-details-visit-arrow" />
                </a>
              </div>
              <p className="job-details-description">
                {jobDetails.jobDescription}
              </p>
            </div>
            <div className="d-flex flex-column mt-3 mb-1">
              <h3 className="job-details-skills-heading">Skills</h3>
              <div className="container-fluid">
                <ul className="job-details-skills-list-container row d-flex align-items-stretch">
                  {jobDetails.skills.map((eachSkill) => (
                    <SkillsCard key={eachSkill._id} skillDetails={eachSkill} />
                  ))}
                </ul>
              </div>
            </div>
            <div className="container-fluid mt-2 mb-3">
              <div className="row">
                <h3 className="jobs-details-life-at-company-heading col-12 p-0">
                  Life At Company
                </h3>
                <div className="col-12 col-md-8 order-2 order-md-1 p-0 pr-md-4 mt-3">
                  <p className="job-details-life-at-company-des">
                    {jobDetails.lifeAtCompany.description}
                  </p>
                </div>
                <div className="col-12 col-md-4 order-1 order-md-2 p-0 mt-3">
                  <img
                    src={jobDetails.lifeAtCompany.imageUrl}
                    alt="lifeAtCompany"
                    className="job-details-life-company-image"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderJobsDetailsLoader = () => {
    return (
      <div className="jobs-details-loader-container">
        <Watch
          height="100"
          width="100"
          radius="48"
          color="#ffffff"
          ariaLabel="watch-loading"
          wrapperStyle={{}}
          wrapperClassName=""
          visible={true}
        />
      </div>
    );
  };

  const renderJobsDetailsFailueView = () => {
    return (
      <div className="jobs-details-failure-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="failure view"
          className="jobs-details-failure-image"
        />
        <h2 className="job-details-failure-heading">
          Oops! Something Went Wrong
        </h2>
        <p className="job-details-failure-description">
          We cannot seem to find the page you are looking for.
        </p>
        <button
          type="button"
          className="failure-job-details-retry-button"
          onClick={getJobDetails}
        >
          Retry
        </button>
      </div>
    );
  };

  const displayJobsDetailsOrLoaderView = () => {
    switch (jobDetailsResStatus) {
      case apiResponseConstants.success:
        return renderJobsDetailsView();

      case apiResponseConstants.inProgress:
        return renderJobsDetailsLoader();

      case apiResponseConstants.failure:
        return renderJobsDetailsFailueView();

      default:
        return null;
    }
  };

  return (
    <>
      <Header />
      <div className="job-details-main-container">
        {displayJobsDetailsOrLoaderView()}
      </div>
    </>
  );
};

export default JobDetailsPage;
