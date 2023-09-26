import Header from "../header";
import "./index.css";

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

const JobsPage = () => {
  return (
    <>
      <Header />
      <div className="jobs-page-bg-container">
        <div className="container-fluid mt-3">
          <div className="row">
            <div className="col-12 col-md-4 profile-jobs-page-filters-main-container">
              <div className="d-flex flex-column p-2">
                <div className="jobs-page-profile-card mb-2">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/6915/6915987.png"
                    alt="profile"
                    className="jobs-page-profile-icon"
                  />
                  <h3 className="jobs-page-profile-name">Ajay Reddy</h3>
                  <p className="jobs-page-role">Associate Software Developer</p>
                </div>
                <hr className="jobs-page-profile-hr-line" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobsPage;
