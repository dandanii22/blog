import "./App.css";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import BlogCreate from "./components/BlogCreate";
import BlogDetails from "./components/BlogDetails";
import NotFound from "./components/NotFound";
import FixContent from "./components/FixContent";
import CommentCreate from "./components/CommentCreate";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<BlogCreate />} />
            <Route path="/blog/:id" element={<BlogDetails />} />
            <Route path="/CommentCreate/:id" element={<CommentCreate />} />
            <Route path="/FixContent/:id" element={<FixContent />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
