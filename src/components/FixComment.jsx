/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAxios } from "../hooks/useAxios";

// eslint-disable-next-line react/prop-types
const FixComment = ({ setEditIndex, editIndex, blog }) => {
  const [comment, setComment] = useState("");

  const { id } = useParams();
  const { PUT } = useAxios(`http://localhost:3001/blog` + id);

  // 수정할 댓글 가져오기
  useEffect(() => {
    if (blog && editIndex !== null) {
      setComment(blog.comment[editIndex]);
    }
  }, [editIndex]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const CommentData = blog.comment;
    CommentData.splice(editIndex, 1, comment);
    let CommnetFix = {
      ...blog,
      comment: CommentData,
    };
    alert("댓글을 수정하시겠습니까?");
    await PUT(`http://localhost:3001/blog`, id, CommnetFix).then(() => {
      setEditIndex(null);
    });
  };

  return (
    <div className="editcomment">
      {blog && (
        <form onSubmit={handleSubmit}>
          <label>댓글 : </label>
          <input
            required
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button type="submit" className="comment_editbtn">
            수정
          </button>
          <button type="button" onClick={() => setEditIndex(null)}>
            취소
          </button>
        </form>
      )}
    </div>
  );
};

export default FixComment;
