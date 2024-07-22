import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
const BlogList = ({ blogs }) => {
  return (
    <div className="blog-list">
      {blogs.map((blog) => (
        <div className="blog-preview" key={blog.id}>
          <Link to={`/blog/${blog.id}`}>
            <h2>{blog.title}</h2>
            <p>
              <img src={blog.img} alt="img" />
            </p>
            <p>Written by {blog.author}</p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
