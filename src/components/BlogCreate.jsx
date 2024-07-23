import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAxios } from "../hooks/useAxios";

const BlogCreate = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [img, setImg] = useState("");
  const [author, setAuthor] = useState("");
  const [Likes, setLikes] = useState(0);

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { POST } = useAxios();

  const handelSubmit = (e) => {
    e.preventDefault();
    const blog = { title, body, author };
    setIsLoading(true);
    POST("http://localhost:3001/blog", "", blog).then(() => {
      setIsLoading(false);
      alert("블로그가 생성되었습니다.");
      setLikes(Likes + 1);
      navigate("/");
    });

    navigate.push(-1);
  };
  return (
    <div className="create">
      <h2>Add a New Blog</h2>
      <form onSubmit={handelSubmit} className="createBlog">
        <label>Blog Title : </label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Blog Image : </label>
        <input
          type="file"
          required
          value={img}
          onChange={(e) => setImg(e.target.value)}
        />
        <label>Blog body : </label>
        <textarea
          required
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
        <label>Blog author : </label>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <div className="contentbtnwrap">
          {!isLoading ? (
            <button>추가</button>
          ) : (
            <button disabled>추가 중입니다...</button>
          )}

          <button className="cancelbtn" onClick={() => navigate("/")}>
            취소
          </button>
        </div>
      </form>
    </div>
  );
};

export default BlogCreate;
