import { useState } from "react";
import { useParams } from "react-router-dom";

import useFetch from "../hooks/useFetch";

const CommentCreate = () => {
  const [comment, setComment] = useState("");
  const { id } = useParams();

  const {
    data: blog,
    error,
    isLoading,
  } = useFetch("http://localhost:3001/blog/" + id);

  const AddComment = () => {
    const updatedComments = [...blog.comment, comment];

    const updatedBlog = {
      ...blog,
      comment: updatedComments,
    };

    alert("댓글을 추가하시겠습니까?");

    fetch("http://localhost:3001/blog/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedBlog),
    })
      .then((res) => res.json())
      .then(() => window.location.reload());
  };
  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {blog && (
        <div className="commenttop">
          <label>댓글 : </label>
          <input
            type="text"
            required
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button onClick={AddComment}>추가</button>
        </div>
      )}
    </div>
  );
};

export default CommentCreate;
