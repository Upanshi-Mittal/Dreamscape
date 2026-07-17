import { useState } from "react";
import { handleerror, handlesuccess } from "../utils";
import { useNavigate } from "react-router-dom";
import Header2 from "./header2";

// Paperplane editorial fonts - move this @import into your global
// index.css if you haven't already, so it isn't re-injected on every
// render of this component.
const FontImport = () => (
  <style>
    {`@import url('https://fonts.googleapis.com/css2?family=Caveat:wght@700&family=Playfair+Display:ital,wght@0,400;0,600;1,400&display=swap');`}
  </style>
);

function Blog() {
  const navigate = useNavigate();
  const [blogData, setBlogData] = useState({
    title: "",
    content: "",
  });
  const [file, setFile] = useState(null);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setBlogData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const wordCount = blogData.content.trim()
    ? blogData.content.trim().split(/\s+/).length
    : 0;

  const complete = async (e) => {
    e.preventDefault();
    const { title, content } = blogData;

    if (!title || !content) {
      return handleerror("All fields are required");
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (file) formData.append("pic", file);

    const url = "http://localhost:8080/products/add";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          authorization: localStorage.getItem("token"),
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        handlesuccess("Blog Posted 🎉");
        setBlogData({ title: "", content: "" });
        setFile(null);
        setTimeout(() => navigate("/final"), 1000);
      } else {
        handleerror(data?.message || "Failed to post blog");
      }
    } catch (err) {
      handleerror("Something went wrong while posting");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF6EF]">
      <FontImport />

      <form onSubmit={complete}>
        {/* Top bar: draft status + publish, mirrors the editor mockup */}
        <div
          className="flex items-center justify-between border-b border-[#E8E0D0]"
          style={{ padding: "18px 44px" }}
        >
          <span
            className="text-[11px] uppercase tracking-[1.5px] text-[#B7ADD4]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {blogData.title || blogData.content ? "A new paper plane" : "Untitled draft"}
          </span>

          <div className="flex items-center" style={{ gap: 16 }}>
            <label
              htmlFor="pic"
              className="text-[11px] text-[#8B8577] cursor-pointer border border-[#D9D0BC] rounded-full hover:border-[#1C1B19] transition-colors"
              style={{ padding: "7px 16px" }}
            >
              {file ? file.name.slice(0, 20) : "Add a photo"}
            </label>
            <input
              id="pic"
              type="file"
              onChange={handleFileChange}
              className="hidden"
            />

            <button
              type="submit"
              className="flex items-center text-[11px] border border-[#1C1B19] text-[#1C1B19] rounded-full hover:bg-[#1C1B19] hover:text-[#FAF6EF] transition-colors"
              style={{ gap: 6, padding: "7px 18px" }}
            >
              <svg width="12" height="12" viewBox="0 0 20 20">
                <path d="M2 10 L17 3 L10 18 L8 11 Z" fill="currentColor" />
              </svg>
              Publish
            </button>
          </div>
        </div>

        {/* Writing area - the only thing on the page that matters */}
        <div
          className="mx-auto"
          style={{ maxWidth: 520, padding: "70px 20px 120px" }}
        >
          <input
            id="title"
            type="text"
            name="title"
            value={blogData.title}
            onChange={handleInput}
            placeholder="Give your story a title…"
            className="w-full bg-transparent border-none outline-none text-[#1C1B19] placeholder-[#C4BEB0]"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 32,
              lineHeight: 1.3,
              marginBottom: 26,
            }}
          />

          <textarea
            id="content"
            name="content"
            value={blogData.content}
            onChange={handleInput}
            placeholder="Write softly. Someone somewhere might need your words."
            rows={14}
            className="w-full bg-transparent border-none outline-none resize-none text-[#2C2B28] placeholder-[#C4BEB0]"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 17,
              lineHeight: 2.1,
            }}
          />

          <hr className="border-[#E8E0D0]" style={{ marginTop: 60 }} />

          <div className="text-[11px] text-[#8B8577]" style={{ marginTop: 16 }}>
            {wordCount} words &middot; {wordCount > 0 ? "not yet ready to fly" : "a blank page"}
          </div>
        </div>
      </form>
    </div>
  );
}

export default Blog;