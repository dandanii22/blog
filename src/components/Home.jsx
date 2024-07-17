import BlogList from "./BlogList";
import useFetch from "../hooks/useFetch";

const Home = () => {
  const {
    // data blogs로 이름 변경
    data: blogs,
    isLoading,
    error,
  } = useFetch("http://localhost:3001/blog");

  return (
    <div className="home">
      {error && <div>{error}</div>}
      {isLoading && <div>Loading...</div>}
      {/* blogs 데이터 값을 얻기 전까지 작동하지 않도록*/}
      {blogs && <BlogList blogs={blogs} title="All Blogs!" />}
    </div>
  );
};

export default Home;
