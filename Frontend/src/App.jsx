import { Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage";
import JobListingsPage from "./pages/JobListingsPage";
import CreateJobPage from "./pages/CreateJobPage";
import ProfilePage from "./pages/ProfilePage";

const App = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/listings" element={<JobListingsPage />} />
    <Route path="/create" element={<CreateJobPage />} />
    <Route path="/profile" element={<ProfilePage />} />
  </Routes>
);

export default App;