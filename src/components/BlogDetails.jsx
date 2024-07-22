import { Link, useNavigate, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import CommentCreate from "./CommentCreate";
import { useState } from "react";
import FixComment from "./FixComment";

// 게시물 등록
const BlogDetails = () => {
  const { id } = useParams();
  const { data: blog } = useFetch(`http://localhost:3001/blog/${id}`);
  const navigate = useNavigate();

  //게시물 삭제
  const handleDel = () => {
    fetch("http://localhost:3001/blog/" + blog.id, {
      method: "DELETE",
    }).then(() => {
      alert("게시물을 삭제하시겠습니까?");
      navigate("/");
    });
  };

  // 게시물 좋아요
  const clickLikes = () => {
    const clickLike = {
      ...blog,
      Likes: blog.Likes + 1,
    };

    fetch("http://localhost:3001/blog/" + blog.id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(clickLike),
    })
      .then((res) => res.json)
      .then(() => window.location.reload());
  };

  // 댓글 수정
  const [editIndex, setEditIndex] = useState(null);
  const clickEditBtn = (idx) => {
    setEditIndex(editIndex === idx ? null : idx);
  };

  return (
    <div className="blog-details">
      {blog && (
        <article>
          <h2>{blog.title}</h2>
          <p className="auth">Written by {blog.author}</p>

          <button className="likebtn" onClick={clickLikes}>
            <i className="xi-heart" />
            좋아요 : {blog.Likes}
          </button>

          <div className="bodywrap">
            <p>
              <img src={blog.img} />
            </p>
            <p className="detail_body">{blog.body}</p>
          </div>
          <div className="btnwrap">
            <button onClick={handleDel} className="delbtn">
              삭제
            </button>
            <Link to={`/FixContent/${id}`}>
              <button className="editbtn">수정하기</button>
            </Link>
            <Link to="/">
              <button>돌아가기</button>
            </Link>
          </div>
        </article>
      )}
      {blog && (
        <article>
          <h1>댓글</h1>
          <CommentCreate />
          {blog.comment.map((comment, id) => (
            <div key={id} className="comment_detail">
              <div>
                <div>{comment}</div>
                {editIndex === id && (
                  <FixComment
                    setEditIndex={setEditIndex}
                    editIndex={editIndex}
                  />
                )}
              </div>

              <div className="commentBtn_wrap">
                <button onClick={() => clickEditBtn(id)}>수정</button>
                <button
                  onClick={() => {
                    const CommentData = blog.comment;
                    CommentData.splice(id, 1);
                    let BlogContent = {
                      ...blog,
                      comment: CommentData,
                    };
                    alert("댓글을 삭제하시겠습니까?");
                    fetch(`http://localhost:3001/blog/${blog.id}`, {
                      method: "DELETE",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify(BlogContent),
                    }).then(() => {
                      navigate(`/blog/${blog.id}`);
                    });
                  }}
                >
                  댓글 삭제
                </button>
              </div>
            </div>
          ))}
        </article>
      )}
    </div>
  );
};

export default BlogDetails;
