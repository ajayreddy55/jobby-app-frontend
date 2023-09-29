import { Routes, Route } from "react-router-dom";
import "./App.css";
import LoginForm from "./components/loginform";
import SignupForm from "./components/signupform";
import Home from "./components/homepage";
import JobsPage from "./components/jobspage";
import JobDetailsPage from "./components/jobDetails";
import NotFound from "./components/notfound";

const App = () => {
  return (
    <Routes>
      <Route exact path="/login" element={<LoginForm />} />
      <Route exact path="/signup" element={<SignupForm />} />
      <Route exact path="/" element={<Home />} />
      <Route exact path="/jobs" element={<JobsPage />} />
      <Route exact path="/jobs/:id" element={<JobDetailsPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
