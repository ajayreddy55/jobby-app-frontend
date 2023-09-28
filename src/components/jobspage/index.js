import EmploymentTypeItem from "../employmentType";
import Header from "../header";
import SalaryRangeItem from "../salaryrange";
import { BsSearch } from "react-icons/bs";
import "./index.css";
import JobListItem from "../jobitem";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Watch } from "react-loader-spinner";

const employmentTypeList = [
  {
    id: "Full Time",
    label: "Full Time",
  },
  {
    id: "Part Time",
    label: "Part Time",
  },
  {
    id: "Internship",
    label: "Internship",
  },
  {
    id: "Freelance",
    label: "Freelance",
  },
];

const minimunPackageList = [
  {
    id: "10",
    label: "10 LPA and above",
  },
  {
    id: "20",
    label: "20 LPA and above",
  },
  {
    id: "30",
    label: "30 LPA and above",
  },
  {
    id: "40",
    label: "40 LPA and above",
  },
];

const apiResponseConstants = {
  initial: "INITIAL",
  inProgress: "INPROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
};

const JobsPage = () => {
  const navigate = useNavigate();

  const [jobsList, setJobsList] = useState([]);
  const [jobsResponseStatusApi, setJobsResponseStatusApi] = useState(
    apiResponseConstants.initial
  );
  const [profileDetailsObject, setProfileDetailsObject] = useState({});
  const [profileResponseStatus, setProfileResponseStatus] = useState(
    apiResponseConstants.initial
  );
  const [selectedEmpolymentTypes, setSelectedEmploymentTypes] = useState([]);
  const [selectedMinimunPackage, setSelectedMinimumPackage] = useState("");
  const [jobsSearchInput, setJobsSearchInput] = useState("");

  useEffect(() => {
    const jwtJobbyToken = Cookies.get("jobby_jwt_token");
    if (jwtJobbyToken === undefined) {
      navigate("/login");
    }
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    getProfileDetails();
    //eslint-disable-next-line
  }, []);

  const getProfileDetails = async () => {
    setProfileResponseStatus(apiResponseConstants.inProgress);

    const url = "http://localhost:3005/auth/profile";
    const jwtJobbyToken = Cookies.get("jobby_jwt_token");
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtJobbyToken}`,
      },
    };

    const profileResponse = await fetch(url, options);

    if (profileResponse.ok === true) {
      const profileResJson = await profileResponse.json();
      setProfileDetailsObject(profileResJson);
      setProfileResponseStatus(apiResponseConstants.success);
    } else {
      const profileResJson = await profileResponse.json();
      setProfileDetailsObject(profileResJson);
      setProfileResponseStatus(apiResponseConstants.failure);
    }
  };

  useEffect(() => {
    getJobsList();
    //eslint-disable-next-line
  }, [selectedEmpolymentTypes, selectedMinimunPackage]);

  const getJobsList = async () => {
    setJobsResponseStatusApi(apiResponseConstants.inProgress);

    const employmentTypeString = selectedEmpolymentTypes.join(",");

    const url = `http://localhost:3005/api/filterjobs?employment_type=${employmentTypeString}&minimum_package=${selectedMinimunPackage}&search=${jobsSearchInput}`;
    const jwtJobbyToken = Cookies.get("jobby_jwt_token");
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtJobbyToken}`,
      },
    };

    const jobsResponse = await fetch(url, options);

    if (jobsResponse.status === 200) {
      const jobsResponseJson = await jobsResponse.json();
      setJobsList(jobsResponseJson.filteredJobs);
      setJobsResponseStatusApi(apiResponseConstants.success);
    } else {
      setJobsResponseStatusApi(apiResponseConstants.failure);
    }
  };

  const checkboxSelectedFun = (id) => {
    const isCheckedIdIncludes = selectedEmpolymentTypes.includes(id);
    if (!isCheckedIdIncludes) {
      setSelectedEmploymentTypes((prevState) => [...prevState, id]);
    }
  };

  const checkboxUnselectedFun = (id) => {
    const isUnCheckedIdIncludes = selectedEmpolymentTypes.includes(id);
    if (isUnCheckedIdIncludes) {
      setSelectedEmploymentTypes((prevState) =>
        prevState.filter((eachId) => eachId !== id)
      );
    }
  };

  const salaryRangeItemSelectedFun = (id) => {
    setSelectedMinimumPackage(id);
  };

  const changeSearchInput = (event) => {
    setJobsSearchInput(event.target.value);
  };

  const keyDownRequestData = (event) => {
    if (event.key === "Enter" && jobsSearchInput !== "") {
      getJobsList();
    }
  };

  const onclickRequestData = () => {
    getJobsList();
  };

  const renderJobsLoaderView = () => {
    return (
      <div className="jobs-loader-container">
        <Watch
          height="80"
          width="80"
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

  const renderJobsList = () => {
    if (jobsList.length === 0) {
      return (
        <div className="no-jobs-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
            alt="no jobs"
            className="no-jobs-image"
          />
          <h2 className="no-jobs-heading">No Jobs Found</h2>
          <p className="no-jobs-text">
            We could not find any jobs. Try other filters.
          </p>
        </div>
      );
    } else {
      return (
        <ul className="jobs-list-container">
          {jobsList.map((eachJob) => (
            <JobListItem key={eachJob._id} jobItem={eachJob} />
          ))}
        </ul>
      );
    }
  };

  const renderJobsFailureVeiw = () => {
    return (
      <div className="jobs-failure-view-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="failure view"
          className="jobs-failure-view-image"
        />
        <h2 className="jobs-failure-view-heading">
          Oops! Something Went Wrong
        </h2>
        <p className="jobs-failure-view-description">
          We cannot seem to find the page you are looking for.
        </p>
        <button
          type="button"
          className="failure-view-jobs-retry-button"
          onClick={getJobsList}
        >
          Retry
        </button>
      </div>
    );
  };

  const displayingTheLoaderOrJobs = () => {
    switch (jobsResponseStatusApi) {
      case apiResponseConstants.inProgress:
        return renderJobsLoaderView();

      case apiResponseConstants.success:
        return renderJobsList();

      case apiResponseConstants.failure:
        return renderJobsFailureVeiw();

      default:
        return null;
    }
  };

  const renderProfileLoaderView = () => {
    return (
      <div className="profile-jobs-loader-view-container">
        <Watch
          height="60"
          width="60"
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

  const renderProfileSuccessView = () => {
    return (
      <div className="jobs-page-profile-card mb-2">
        <img
          src="https://cdn-icons-png.flaticon.com/512/6915/6915987.png"
          alt="profile"
          className="jobs-page-profile-icon"
        />
        <h3 className="jobs-page-profile-name">{profileDetailsObject.name}</h3>
        <p className="jobs-page-role">Associate Software Developer</p>
      </div>
    );
  };

  const renderProfileFailureView = () => {
    return (
      <div className="profile-jobs-failure-view">
        <button
          className="profile-failure-view-button"
          type="button"
          onClick={getProfileDetails}
        >
          Retry
        </button>
      </div>
    );
  };

  const displayingTheLoaderOrProfileView = () => {
    switch (profileResponseStatus) {
      case apiResponseConstants.inProgress:
        return renderProfileLoaderView();

      case apiResponseConstants.success:
        return renderProfileSuccessView();

      case apiResponseConstants.failure:
        return renderProfileFailureView();

      default:
        return null;
    }
  };

  return (
    <div className="jobs-page-main-parent-container">
      <Header />
      <div className="jobs-page-bg-container">
        <div className="container-fluid mt-3">
          <div className="row">
            <div className="col-12 col-md-4 profile-jobs-page-filters-main-container">
              <div className="d-flex flex-column p-2 profile-jobs-page-filters-container">
                {displayingTheLoaderOrProfileView()}
                <hr className="jobs-page-profile-hr-line" />
                <div className="d-flex flex-column mt-1 mb-1">
                  <h3 className="type-of-employment-heading">
                    Type of Employment
                  </h3>
                  <ul className="jobs-page-employment-type-list-container">
                    {employmentTypeList.map((eachType) => (
                      <EmploymentTypeItem
                        key={eachType.id}
                        typeItem={eachType}
                        checkboxSelectedFun={checkboxSelectedFun}
                        checkboxUnselectedFun={checkboxUnselectedFun}
                      />
                    ))}
                  </ul>
                </div>
                <hr className="jobs-page-profile-hr-line-2" />
                <div className="d-flex flex-column mt-1 mb-1">
                  <h3 className="type-of-employment-heading">Salary Range</h3>
                  <ul className="jobs-page-employment-type-list-container">
                    {minimunPackageList.map((eachPackage) => (
                      <SalaryRangeItem
                        key={eachPackage.id}
                        packageItem={eachPackage}
                        salaryRangeItemSelectedFun={salaryRangeItemSelectedFun}
                      />
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-12 d-md-none">
              <hr className="jobs-page-profile-hr-line-2" />
            </div>
            <div className="col-12 col-md-8">
              <div className="jobs-page-jobs-main-container p-2">
                <div className="jobs-searchbar-container">
                  <input
                    type="search"
                    className="jobs-search-bar"
                    placeholder="Search"
                    value={jobsSearchInput}
                    onChange={changeSearchInput}
                    onKeyDown={keyDownRequestData}
                  />
                  <div className="search-bar-button-container">
                    <button
                      type="button"
                      className="search-bar-icon-button"
                      onClick={onclickRequestData}
                    >
                      <BsSearch className="search-bar-icon" />
                    </button>
                  </div>
                </div>
                {displayingTheLoaderOrJobs()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobsPage;
