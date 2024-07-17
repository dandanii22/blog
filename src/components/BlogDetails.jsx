import { Link, useNavigate, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";

const BlogDetails = () => {
  const { id } = useParams();
  const {
    data: blog,
    error,
    isLoading,
  } = useFetch(`http://localhost:3001/blog/${id}`);
  console.log(id);
  const navigate = useNavigate();

  const handleDel = () => {
    fetch("http://localhost:3001/blog/" + blog.id, {
      method: "DELETE",
    }).then(() => {
      navigate("/");
    });
  };

  return (
    <div className="blog-details">
      <h2>BlogDetails - {id}</h2>
      {isLoading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {blog && (
        <article>
          <h2>{blog.title}</h2>
          <p>Written by {blog.author}</p>
          <div>{blog.body}</div>
          <button onClick={handleDel} className="delbtn">
            삭제
          </button>
          <Link to="/">
            <button>돌아가기</button>
          </Link>
        </article>
      )}
    </div>
  );
};

export default BlogDetails;
