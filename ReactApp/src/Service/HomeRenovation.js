import React, { useEffect, useState } from "react";

const HomeRenovation = () => {
  const container = document.getElementById("blog-staging-list");
  const limitBlogs = container?.getAttribute("data-blog-limit")
    ? parseInt(container.getAttribute("data-blog-limit"))
    : Infinity;
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch("https://103.109.37.95:8091/api/blog?category=HomeRenovation")
      .then((response) => response.json())
      .then((data) => setBlogs(data))
      .catch((error) => console.error("Lỗi khi tải danh sách blog:", error));
  }, []);

  const handleClick = (category, id) => {
    console.log(`Chuyển hướng tới: /service/${category}/${id}`);
    window.location.href = `/service/${category}/${id}`; // Chuyển hướng
  };

  return (
    <div className="service-container">
      <h3 className="service-title">Home Renovation</h3>
      <div className="service-grid">
        {blogs.slice(0, limitBlogs).map((blog) => (
          <div key={blog.id} className="service-item">
            <img
              src={
                blog.avatar
                  ? `https://103.109.37.95:8091${blog.avatar}`
                  : "https://via.placeholder.com/300"
              }
              alt="Blog Avatar"
              className="service-avatar"
              onClick={() => handleClick(blog.category, blog.id)} // Bấm vào avatar chuyển trang
              style={{ cursor: "pointer" }}
            />
            <div className="service-overlay">
              <p className="service-text">{blog.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeRenovation;
