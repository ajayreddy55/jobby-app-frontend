import { Link } from "react-router-dom";
import "./index.css";
import { AiFillStar } from "react-icons/ai";
import { HiLocationMarker } from "react-icons/hi";
import { BiSolidBriefcaseAlt2 } from "react-icons/bi";

const JobListItem = (props) => {
  const { jobItem } = props;
  const {
    _id,
    title,
    companyLogoUrl,
    rating,
    location,
    packagePerAnnum,
    jobDescription,
    employmentType,
  } = jobItem;

  return (
    <Link className="jobs-link-item-container" to={`/jobs/${_id}`}>
      <li className="jobs-list-item-container">
        <div className="d-flex align-items-center mt-2 mb-2">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="jobs-page-company-logo"
          />
          <div className="d-flex flex-column justify-content-center ml-2">
            <h3 className="jobs-page-title-text">{title}</h3>
            <div className="d-flex align-items-center mt-1">
              <AiFillStar className="jobs-page-star-icon" />
              <p className="jobs-page-rating-text">{rating}</p>
            </div>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-between flex-wrap mt-2 mb-2">
          <div className="d-flex align-items-center mr-1">
            <div className="d-flex align-items-center mr-2">
              <HiLocationMarker className="jobs-page-location-icon" />
              <p className="jobs-page-locaion">{location}</p>
            </div>
            <div className="d-flex align-items-center ml-3">
              <BiSolidBriefcaseAlt2 className="jobs-page-location-icon" />
              <p className="jobs-page-locaion">{employmentType}</p>
            </div>
          </div>
          <p className="jobs-page-package-text">{packagePerAnnum}</p>
        </div>
        <hr className="jobs-page-item-hr-line" />
        <h3 className="jobs-list-item-description-heading">Description</h3>
        <p className="jobs-list-item-description">{jobDescription}</p>
      </li>
    </Link>
  );
};

export default JobListItem;
