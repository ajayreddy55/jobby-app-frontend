import { Link } from "react-router-dom";
import "./index.css";
import { AiFillStar } from "react-icons/ai";
import { HiLocationMarker } from "react-icons/hi";
import { BiSolidBriefcaseAlt2 } from "react-icons/bi";

const SimilarJobsCard = (props) => {
  const { similarJobDetails } = props;
  const {
    _id,
    title,
    companyLogoUrl,
    rating,
    location,
    employmentType,
    jobDescription,
  } = similarJobDetails;

  return (
    <li className="similar-list-item col-12 col-md-4 p-0 mt-3 mb-3">
      <Link className="similar-link-item-container mr-4" to={`/jobs/${_id}`}>
        <div className="d-flex align-items-center mt-2 mb-3">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="similar-jobs-website-logo"
          />
          <div className="d-flex flex-column ml-2">
            <h3 className="similar-jobs-title">{title}</h3>
            <div className="d-flex align-items-center mt-2">
              <AiFillStar className="similar-jobs-star-icon" />
              <p className="similar-jobs-rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="d-flex flex-column mt-3 mb-2">
          <h3 className="similar-jobs-description-heading">Description</h3>
          <p className="similar-jobs-description">{jobDescription}</p>
        </div>
        <div className="d-flex align-items-center flex-wrap mt-3 mb-3">
          <div className="d-flex align-items-center mr-4 mt-2 mb-2">
            <HiLocationMarker className="similar-jobs-location-icon" />
            <p className="similar-jobs-location-text">{location}</p>
          </div>
          <div className="d-flex align-items-center mt-2 mb-2">
            <BiSolidBriefcaseAlt2 className="similar-jobs-location-icon" />
            <p className="similar-jobs-location-text">{employmentType}</p>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default SimilarJobsCard;
