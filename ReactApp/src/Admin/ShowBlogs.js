import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css"; // Import CSS của Quill

const ShowBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [avatar, setAvatar] = useState(""); // Thêm state avatar
  const [avatarFile, setAvatarFile] = useState(null); // Lưu file trước khi upload
  const [category, setCategory] = useState(""); // Thêm category vào state

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetch("https://localhost:5001/api/blog");
      const data = await response.json();
      setBlogs(data);
    } catch (error) {
      console.error("Lỗi khi tải danh sách blog:", error);
    }
  };

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      alert("Vui lòng nhập tiêu đề và nội dung.");
      return;
    }

    let uploadedAvatar = avatar;

    if (avatarFile) {
      // Nếu có file mới, upload trước
      const formData = new FormData();
      formData.append("file", avatarFile);

      try {
        const response = await fetch(
          "https://localhost:5001/api/blog/upload-avatar",
          {
            method: "POST",
            body: formData,
          }
        );

        if (response.ok) {
          const data = await response.json();
          uploadedAvatar = data.url; // Cập nhật URL ảnh mới
        } else {
          alert("Upload ảnh thất bại.");
          return; // Không tiếp tục nếu upload ảnh lỗi
        }
      } catch (error) {
        console.error("Lỗi khi upload ảnh:", error);
        return;
      }
    }

    const blogData = {
      id: editingId,
      title,
      content,
      category,
      avatar: uploadedAvatar,
    };

    try {
      const response = await fetch(
        editingId
          ? `https://localhost:5001/api/blog/${editingId}`
          : "https://localhost:5001/api/blog",
        {
          method: editingId ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(blogData),
        }
      );

      if (response.ok) {
        alert(editingId ? "Cập nhật thành công!" : "Lưu blog thành công!");
        setTitle("");
        setContent("");
        setCategory("");
        setAvatar("");
        setEditingId(null);
        fetchBlogs();
      } else {
        alert("Lưu thất bại.");
      }
    } catch (error) {
      console.error("Lỗi khi lưu blog:", error);
    }
  };
  const handleUploadAvatar = async () => {
    if (!avatarFile) {
      alert("Vui lòng chọn ảnh đại diện.");
      return;
    }

    const formData = new FormData();
    formData.append("file", avatarFile);

    try {
      const response = await fetch(
        "https://localhost:5001/api/blog/upload-avatar",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const data = await response.json();
        setAvatar(data.url); // Lưu URL ảnh sau khi upload
      } else {
        alert("Upload ảnh thất bại.");
      }
    } catch (error) {
      console.error("Lỗi khi upload ảnh:", error);
    }
  };

  const handleEdit = (blog) => {
    setTitle(blog.title);
    setContent(blog.content);
    setCategory(blog.category);
    setAvatar(blog.avatar);
    setEditingId(blog.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa blog này không?")) return;

    try {
      const response = await fetch(`https://localhost:5001/api/blog/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Xóa thành công!");
        fetchBlogs();
      } else {
        alert("Xóa thất bại.");
      }
    } catch (error) {
      console.error("Lỗi khi xóa blog:", error);
    }
  };

  // Cấu hình thanh công cụ của React Quill
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ align: [] }],
      ["blockquote", "code-block"],
      ["link", "image", "video"],
      ["clean"],
    ],
  };

  return (
    <div>
      <h2>Quản lý Blog</h2>
      <input
        type="text"
        placeholder="Nhập tiêu đề..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="none">none</option>
        <option value="Landscaping">Landscaping</option>
        <option value="HomeRenovation">Home Renovation</option>
        <option value="Staging">Staging</option>
        <option value="Cleaning">Cleaning</option>
        <option value="PropertyMaintenance">Property Maintenance</option>
      </select>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setAvatarFile(e.target.files[0])}
      />
      {/* Thay textarea bằng React Quill */}
      <ReactQuill
        value={content}
        onChange={setContent}
        modules={modules}
        theme="snow"
      />

      <button onClick={handleSave}>{editingId ? "Cập nhật" : "Lưu"}</button>

      <h3>Danh sách Blog</h3>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id} style={{ display: "flex", alignItems: "center" }}>
            <img
              src={
                `https://localhost:5001${blog.avatar}` ||
                "https://via.placeholder.com/100"
              }
              alt="Avatar"
              style={{
                width: 50,
                height: 50,
                borderRadius: "50%",
                marginRight: 10,
              }}
            />
            <div>
              <h4>
                {blog.title} - <span>{blog.category || "Chưa phân loại"}</span>
              </h4>
              <button onClick={() => handleEdit(blog)}>Sửa</button>
              {![1, 2, 3].includes(blog.id) && (
                <button
                  onClick={() => handleDelete(blog.id)}
                  style={{ backgroundColor: "red", color: "white" }}
                >
                  Xóa
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShowBlogs;
