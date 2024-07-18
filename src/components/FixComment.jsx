import { useParams } from "react-router-dom";
import { useState } from "react";
import useFetch from "../hooks/useFetch";

const FixComment = ({ setEditIndex, editIndex }) => {
  const [comment, setComment] = useState("");
  const { id } = useParams();
  const {
    data: blog,
    isLoading,
    error,
  } = useFetch("http://localhost:3001/blog/" + id);
  const handleSubmit = (e) => {
    e.preventDefault();
    const CommentData = blog.comment;
    CommentData.splice(editIndex, 1, comment);
    let CommnetFix = {
      ...blog,
      comment: CommentData,
    };
    alert("댓글을 수정하시겠습니까?");
    fetch("http://localhost:3001/blog/" + id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(CommnetFix),
    })
      .then((res) => res.json())
      .then(() => {
        setEditIndex(null);
      });
  };
  return (
    <div className="editcomment">
      {isLoading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {blog && (
        <form onSubmit={handleSubmit}>
          <label>댓글:</label>
          <input
            required
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button>수정</button>
        </form>
      )}
    </div>
  );
};

export default FixComment;
