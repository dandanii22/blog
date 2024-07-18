import { Link, useNavigate, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";

// 게시물 등록
const BlogDetails = () => {
  const { id } = useParams();
  const {
    data: blog,
    error,
    isLoading,
  } = useFetch(`http://localhost:3001/blog/${id}`);
  console.log(id);
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
    }).then((res) => res.json);
  };

  // 댓글 추가

  return (
    <div className="blog-details">
      {/* <h2>BlogDetails - {id}</h2> */}
      {isLoading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {blog && (
        <article>
          <h2>{blog.title}</h2>
          <p>Written by {blog.author}</p>

          <button className="likebtn" onClick={clickLikes}>
            <i className="xi-heart" />
            좋아요 : {blog.Likes}
          </button>

          <div className="bodywrap">{blog.body}</div>
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
          <Link to={`/CommentCreate/` + id}>
            <buttnon>댓글 등록</buttnon>
          </Link>

          {blog.comment.map((comment, idx) => {
            return (
              <div key={idx}>
                <div>{comment}</div>
                <button
                  onClick={() => {
                    const CommentData = blog.comment;
                    CommentData.splice(idx, 1);
                    let BlogContent = {
                      ...blog,
                      comment: CommentData,
                    };
                    alert("댓글을 삭제하시겠습니까?");
                    fetch("http://localhost:3001/blog/" + blog.id, {
                      method: "PUT",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify(BlogContent),
                    }).then(() => {
                      navigate(`/blog/` + blog.id);
                    });
                  }}
                >
                  댓글 삭제
                </button>
              </div>
            );
          })}
        </article>
      )}
    </div>
  );
};

export default BlogDetails;
