import { Link, useNavigate, useParams } from "react-router-dom";
// import CommentCreate from "./CommentCreate";
import { useEffect, useState } from "react";
import FixComment from "./FixComment";
import { useAxios } from "../hooks/useAxios";

// 게시물 등록
const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: blog, PUT, GET, DELETE, setData } = useAxios();

  useEffect(() => {
    if (id) {
      GET(`http://localhost:3001/blog/${id}`);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // 게시물 좋아요
  const clickLikes = async () => {
    const clickLike = {
      ...blog,
      Likes: blog.Likes + 1,
    };

    // PUT 요청 보내기
    await PUT("http://localhost:3001/blog", blog.id, clickLike);
  };

  // 게시물 삭제
  const handleDel = async () => {
    await DELETE("http://localhost:3001/blog", blog.id).then(() => {
      alert("게시물을 삭제하시겠습니까?");
      setData(null);
      navigate("/");
    });
  };

  // 댓글추가
  const [comment, setComment] = useState("");
  const AddComment = async () => {
    const updatedComments = [...blog.comment, comment];
    const updatedBlog = {
      ...blog,
      comment: updatedComments,
    };

    alert("댓글을 추가하시겠습니까?");
    await PUT("http://localhost:3001/blog", id, updatedBlog).then(() => {
      setComment("");
    });
  };

  // 댓글 수정
  const [editIndex, setEditIndex] = useState(null);
  const clickEditBtn = (idx) => {
    setEditIndex(editIndex === idx ? null : idx);
  };

  // 댓글 삭제
  const commentDel = async (commentId) => {
    const CommentData = blog.comment.filter(
      (comment, index) => index !== commentId
    );
    let BlogContent = {
      ...blog,
      comment: CommentData,
    };
    await PUT("http://localhost:3001/blog", blog.id, BlogContent).then(() => {
      alert("댓글을 삭제하시겠습니까?");
      navigate(`/blog/${blog.id}`);
    });
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
          <div>
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

          {blog?.comment?.map((comment, id) => (
            <div key={id} className="comment_detail">
              <div>
                <div>{comment}</div>
                {editIndex === id && (
                  <FixComment
                    setEditIndex={setEditIndex}
                    editIndex={editIndex}
                    blog={blog}
                  />
                )}
              </div>
              <div className="commentBtn_wrap">
                <button onClick={() => clickEditBtn(id)}>수정</button>
                <button onClick={() => commentDel(id)}>댓글 삭제</button>
              </div>
            </div>
          ))}
        </article>
      )}
    </div>
  );
};

export default BlogDetails;
