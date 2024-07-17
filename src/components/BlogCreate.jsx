import { useState } from "react";
import { useNavigate } from "react-router-dom";

const BlogCreate = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handelSubmit = (e) => {
    e.preventDefault();
    const blog = { title, body, author };
    setIsLoading(true);
    fetch(`http://localhost:3001/blog`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(blog),
    }).then(() => {
      console.log("new blog");
      setIsLoading(false);
      alert("블로그가 생성되었습니다.");
      navigate("/");
    });

    navigate.push(-1);
  };
  return (
    <div className="create">
      <h2>Add a New Blog</h2>
      <form onSubmit={handelSubmit}>
        <label>Blog Title : </label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
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

        {!isLoading && <button>추가</button>}
        {isLoading && <button disabled>추가 중입니다...</button>}
      </form>
    </div>
  );
};

export default BlogCreate;
