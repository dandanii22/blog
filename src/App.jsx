import "./App.css";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import BlogCreate from "./components/BlogCreate";
import BlogDetails from "./components/BlogDetails";
import NotFound from "./components/NotFound";
import FixContent from "./components/FixContent";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<BlogCreate />} />
            <Route path="/blog/:id" element={<BlogDetails />} />
            <Route path="/FixContent/:id" element={<FixContent />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
