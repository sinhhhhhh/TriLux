import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";

const SingleBlog = () => {
  const container = document.getElementById("single-blog-container");
  const blogId = container.getAttribute("data-blog-id"); // Lấy ID từ HTML

  const [blog, setBlog] = useState(null);

  useEffect(() => {
    fetch(`https://localhost:5001/api/blog/${blogId}`)
      .then((response) => response.json())
      .then((data) => setBlog(data))
      .catch((error) => console.error("Lỗi khi tải blog:", error));
  }, [blogId]);

  if (!blog) return <p>Đang tải...</p>;

  return (
    <div>
      <h2>{blog.title}</h2>
      <div dangerouslySetInnerHTML={{ __html: blog.content }} />
    </div>
  );
};

export default SingleBlog;
