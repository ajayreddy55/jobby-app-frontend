import "./index.css";

const NotFound = () => {
  return (
    <div className="page-not-found-bg-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
        alt="not found"
        className="not-found-image"
      />
      <h3 className="not-found-heading">Page Not Found</h3>
      <p className="not-found-text">
        We are sorry, the page you are requested could not be found.
      </p>
    </div>
  );
};

export default NotFound;
