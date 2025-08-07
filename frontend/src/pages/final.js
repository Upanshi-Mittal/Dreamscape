import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { handlesuccess } from '../utils';
import { ToastContainer } from 'react-toastify';
import { FaHeart, FaComment, FaUser } from 'react-icons/fa';

function Final() {
    const navigate = useNavigate();
    const [blogs, setBlogs] = useState([]);

    const [loggedInUser, setLoggedInUser] = useState('');

    useEffect(() => {
        setLoggedInUser(localStorage.getItem('name'));
    }, []);

    const clearAll = () => {
        handlesuccess('You have logged out successfully');
        localStorage.clear();

        setTimeout(() => {
            navigate('/');
        }, 1000);
    };

    const fetchBlogs = async () => {
        try {
            const response = await fetch('http://localhost:8080/products/blog', {
                headers: {
                    authorization: localStorage.getItem('token'),
                },
            });
            const data = await response.json();
            console.log("Fetched Blogs:", data);
            setBlogs(data.blogs);
        } catch (error) {
            console.error("Error fetching blog data:", error);
        }
    };
    const handleLike = async (id) => {
    try {
        const response = await fetch(`http://localhost:8080/products/${id}/like`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: localStorage.getItem("token"),
            },
        });
        const result = await response.json();
        console.log("Liked blog:", result);
        fetchBlogs(); // Refresh blogs to update like count
    } catch (error) {
        console.error("Error liking blog:", error);
    }
};
 const handlecomments=async(id)=>{
     try{
         
     }catch(err){
         console.log(err);
     }
 }
    useEffect(() => {
        fetchBlogs();
    }, []);

    const blogCardStyle = {
        border: '1px solid #ccc',
        padding: '20px',
        marginBottom: '10px',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9',
        height: '300px',
        width: '400px',
        boxshadow: '10px 3px 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)'
    };

    const logoutButtonStyle = {
        marginTop: '20px',
        padding: '8px 16px',
        backgroundColor: '#ffdddd',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer'
    };

    const addButtonStyle = {
        backgroundColor: '#4ea618ff',
        padding: '10px',
        borderRadius: '5px',
        margin: '10px 0',
        display: 'inline-block'
    };

    return (
        <div>
            
            <h1>Welcome, {loggedInUser}</h1>

            <div className="NewBlog">
                <Link to="/Blog" style={addButtonStyle}>➕ Add New Blog</Link>
            </div>

          <div className="BlogList" style={{ display: "flex",
                flexDirection: "column",      
                alignItems: "center",         
                justifyContent: "center",     
                minHeight: "100vh",           
                gap: "1rem",                  
                padding: "2rem"}}>
                {Array.isArray(blogs) && blogs.length > 0 ? (
                    blogs.map((b) => (
                        <div key={b._id} style={blogCardStyle}>
                            <h2>{b.title}</h2>
                            <p>{new Date(b.date).toLocaleDateString()}</p>
                            <p>{b.content}</p>
                            <p>Author: {b.name}</p>
                            
                            <span style={{ }}>
                                <button onClick={() => handleLike(b._id)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
    <FaHeart style={{ color: 'red', marginRight: '5px' }} />
</button> {b.likes}
                            </span>
                                <button onClick={()=>handlecomments(b._id)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><FaComment style={{ color: 'blue', marginRight: '5px' }} />{b.comments.length}</button>
                            
                        </div>
                    ))
                ) : (
                    <p>No blogs available.</p>
                )}
            </div>

            <button onClick={clearAll} style={logoutButtonStyle}>
                🚪 Logout
            </button>
            <ToastContainer />
        </div>
    );
}

export default Final;
