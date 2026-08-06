import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from '../Screens/Home';
import Login from '../Screens/Auth/Login';

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;