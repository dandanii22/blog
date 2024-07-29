import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAxios } from "../hooks/useAxios";

const FixContent = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [img, setImg] = useState("");
  const [author, setAuthor] = useState("");
  const navigate = useNavigate();
  const { PUT, data: blog } = useAxios(`http://localhost:3001/blog` + id);

  useEffect(() => {
    if (blog) {
      setTitle(blog.title);
      setBody(blog.body);
      setImg(blog.img);
      setAuthor(blog.author);
    }
  }, [blog]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedBlogData = {
      title,
      body,
      img,
      author,
    };
    await PUT(`http://localhost:3001/blog`, id, updatedBlogData).then(() => {
      alert("블로그를 수정하시겠습니까?");
      navigate(`/blog/` + id);
    });
  };
  return (
    <div className="create">
      <h1>블로그 수정</h1>
      <form onSubmit={handleSubmit}>
        <label>Blog Title :</label>
        <input
          type="text"
          required
          placeholder="블로그 제목을 수정해주세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Blog Img :</label>
        <input
          type="file"
          required
          placeholder="블로그 사진을 수정해주세요"
          value={img}
          onChange={(e) => setImg(e.target.value)}
        />
        <label>Blog body : </label>
        <textarea
          required
          placeholder="블로그 내용을 수정해주세요"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
        <label>Blog author : </label>
        <input
          type="text"
          placeholder="작성자를 수정해주세요"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <div className="contentbtnwrap">
          <button>수정</button>
          <button onClick={() => navigate(-1)} className="cancelbtn">
            취소
          </button>
        </div>
      </form>
    </div>
  );
};

export default FixContent;
