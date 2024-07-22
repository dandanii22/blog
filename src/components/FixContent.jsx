import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const FixContent = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [img, setImg] = useState("");
  const [author, setAuthor] = useState("");
  const navigate = useNavigate();
  const Likes = 0;
  const comment = [];

  const handleSubmit = (e) => {
    e.preventDefault();
    const blog = { title, body, author, Likes, comment };
    fetch(`http://localhost:3001/blog/` + id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(blog),
    })
      .then((res) => res.json())
      .then(() => {
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
