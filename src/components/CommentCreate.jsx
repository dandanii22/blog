import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";

const CommentCreate = () => {
  const navigate = useNavigate();
  const [comment, setComment] = useState("");
  const { id } = useParams();
  const {
    data: blog,
    error,
    isLoading,
  } = useFetch("http://localhost:3001/blog/" + id);
  const AddComment = () => {
    const CommentData = blog.comment;
    CommentData.push(comment);
    let CommentAdd = {
      ...blog,
      comment: CommentData,
    };
    alert("댓글을 추가하시겠습니까?");
    fetch("http://localhost:3001/blog/" + blog.id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(CommentAdd),
    })
      .then((res) => {
        return res.json();
      })
      .then(() => {
        navigate(`/blog/` + blog.id);
      });
  };
  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {blog && (
        <form>
          <h1>댓글 추가</h1>
          <label>댓글 : </label>
          <textarea
            required
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button onClick={AddComment}>추가</button>
        </form>
      )}
    </div>
  );
};

export default CommentCreate;
