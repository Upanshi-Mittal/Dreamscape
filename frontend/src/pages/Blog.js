import { useState, useEffect } from "react";
import { handleerror, handlesuccess } from "../utils";
import { useNavigate } from "react-router-dom";
function Blog() {
    const navigate = useNavigate();
    const [blogData, setBlogData] = useState({
        title: "",
        content: ""
    });

    const handleInput = (e) => {
        const { name, value } = e.target;
        setBlogData((prev) => ({ ...prev, [name]: value }));
    };

    useEffect(() => {
        console.log("Blog data updated:", blogData);
    }, [blogData]);

    const complete = async (e) => {
        e.preventDefault();
        const {title, content } = blogData;

        if (!title || !content) {
            return handleerror("All Fields are required ⚠️");
        }

        const url = "http://localhost:8080/products/add";

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization: localStorage.getItem("token") // optional
                },
                body: JSON.stringify(blogData)
            });

            const data = await response.json();

            if (response.ok) {
                handlesuccess("Blog Posted 🎉");
                setBlogData({ title: "", content: "" });
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
        <div className="Blog">
            <form onSubmit={complete}>
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
                <div className="content">
                    <label htmlFor="content">📖 Content</label>
                    <textarea
                        id="content"
                        name="content"
                        value={blogData.content}
                        onChange={handleInput}
                        placeholder="lorem ipsum dolor sit..."
                        rows={4}
                        cols={50}
                    />
                </div>
                <button type="submit">✨ Submit</button>
            </form>
        </div>
    );
}

export default Blog;
