import BlogList from "./BlogList";
import { useAxios } from "../hooks/useAxios";
import { useEffect } from "react";

const Home = () => {
  const { GET, data: blogs } = useAxios();

  useEffect(() => {
    GET("http://localhost:3001/blog");
  }, []);

  return (
    <div className="home">
      {/* blogs 데이터 값을 얻기 전까지 작동하지 않도록*/}
      {blogs && <BlogList blogs={blogs} title="All Blogs!" />}
    </div>
  );
};

export default Home;
