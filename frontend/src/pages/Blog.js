import { useState, useEffect } from "react";
import { handleerror, handlesuccess } from "../utils";
import { useNavigate } from "react-router-dom";
function Blog() {
    const navigate = useNavigate();
    const [blogData, setBlogData] = useState({
        title: "",
        content: ""
    });

    const [file, setFile] = useState(null);
    const handleInput = (e) => {
        const { name, value } = e.target;
        setBlogData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

    const complete = async (e) => {
        e.preventDefault();
        const {title, content,pic} = blogData;

        if (!title || !content) {
            return handleerror("All Fields are required ⚠️");
        }

        const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (file) formData.append("pic", file); // attach file
        const url = "http://localhost:8080/products/add";

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    authorization: localStorage.getItem("token") // optional
                },
                body:formData
            });

            const data = await response.json();

            if (response.ok) {
                handlesuccess("Blog Posted 🎉");
                setBlogData({ title: "", content: "" });
                setFile(null);
                setTimeout(() => navigate("/final"), 1000);
            } else {
                handleerror(data?.message || "Failed to post blog 😓");
            }
        } catch (err) {
            handleerror("Something went wrong while posting 😵‍💫");
            console.error(err);
        }
    };

    return (
        <div className="Blog" style={{ backgroundColor: '#041e28ff', minHeight: '100vh', color: 'white', padding: '2rem' ,display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>Enter Blog Details</h2>
            <form className="blog-form" onSubmit={complete}>
                <div className="title">
                    <label htmlFor="title">📝 Title</label>
                    <input
                        id="title"
                        type="text"
                        name="title"
                        value={blogData.title}
                        onChange={handleInput}
                        placeholder="My First Love"
                    />
                </div>
                <div className="content" style={{ marginTop: '1rem' , display: 'flex', flexDirection: 'column' }}>
                    <label htmlFor="content">📖 Content</label>
                    <textarea
                        id="content"
                        name="content"
                        value={blogData.content}
                        onChange={handleInput}
                        placeholder="lorem ipsum dolor sit..."
                        rows={8}
                        cols={50}
                    />
                </div>
                <div className="image" style={{}}>
                    <label htmlFor="pic">pic</label>
                    <input type="file" className="pic" onChange={handleFileChange}></input>

                </div>
                <button type="submit">✨ Submit</button>
            </form>
        </div>
    );
}

export default Blog;
