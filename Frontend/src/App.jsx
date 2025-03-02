import { Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage";
import CategoryPage from "./pages/CategoryPage";
import CreateJobPage from "./pages/CreateJobPage";
import ProfilePage from "./pages/ProfilePage";

const App = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/category/:categoryName" element={<CategoryPage />} />
    <Route path="/create" element={<CreateJobPage />} />
    <Route path="/profile" element={<ProfilePage />} />
  </Routes>
);

export default App;