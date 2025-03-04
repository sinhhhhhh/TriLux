import React, { useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

const modules = {
  toolbar: [
    [{ font: [] }],
    [{ size: ["small", false, "large", "huge"] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ align: [] }],
    ["blockquote", "code-block"],
    ["link", "image", "video", "formula"],
    ["clean"],
  ],
};
const HtmlEditor = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(""); // Thêm state category
  const [content, setContent] = useState("");
  const [avatarFile, setAvatarFile] = useState(null); // Lưu file trước khi upload
  const [avatar, setAvatar] = useState(""); // Lưu URL ảnh sau khi upload

  const handleSave = async () => {
    if (!title || !content || !category.trim()) {
      alert("Vui lòng nhập tiêu đề, nội dung và phân loại");
      return;
    }

    const blogData = { title, content, category, avatar };

    try {
      const response = await fetch("https://103.109.37.95:8091/api/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(blogData),
      });

      if (response.ok) {
        alert("Lưu blog thành công!");
        setTitle("");
        setContent("");
        setCategory(""); // Reset category sau khi lưu
        setAvatar(""); // Reset avatar sau khi lưu
        setAvatarFile(null);
      } else {
        alert("Lưu blog thất bại.");
      }
    } catch (error) {
      alert("Lỗi khi lưu blog: " + error.message);
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
        "https://103.109.37.95:8091/api/blog/upload-avatar",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const data = await response.json();
        setAvatar(data.url); // Lưu URL ảnh sau khi upload
        alert("Upload ảnh thành công!");
      } else {
        alert("Upload ảnh thất bại.");
      }
    } catch (error) {
      console.error("Lỗi khi upload ảnh:", error);
    }
  };
  return (
    <div>
      <input
        type="text"
        placeholder="Nhập tiêu đề..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      {/* Thêm dropdown chọn loại blog */}
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="none">none</option>
        <option value="Landscaping">Landscaping</option>
        <option value="Home Renovation">Home Renovation</option>
        <option value="Staging">Staging</option>
        <option value="Cleaning">Cleaning</option>
        <option value="roperty Maintenance">Property Maintenance</option>
      </select>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setAvatarFile(e.target.files[0])}
      />
      <button onClick={handleUploadAvatar}>Upload Ảnh</button>

      <ReactQuill
        value={content}
        onChange={setContent}
        theme="snow"
        modules={modules} // Thêm cấu hình toolbar đầy đủ
      />
      <button onClick={handleSave}>Lưu Blog</button>
    </div>
  );
};

export default HtmlEditor;
