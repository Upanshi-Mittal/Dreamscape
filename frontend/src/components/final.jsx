import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handlesuccess, handleerror } from '../utils';
import { ToastContainer } from 'react-toastify';
import { FaHeart, FaRegHeart, FaRegComment } from 'react-icons/fa';
import Header2 from './header2';
import {Link} from "react-router-dom"
// Move into global CSS - see note on Blog.jsx / Header.jsx
const FontImport = () => (
  <style>
    {`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&display=swap');`}
  </style>
);

function Final() {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState('');
  const [commentText, setCommentText] = useState({});
  const [showComments, setShowComments] = useState({});
  const [likedBlogs, setLikedBlogs] = useState([]);

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
      setBlogs(data.blogs);
    } catch (error) {
      console.error('Error fetching blog data:', error);
    }
  };

  const handleLike = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/products/${id}/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: localStorage.getItem('token'),
        },
      });
      const result = await response.json();
      setLikedBlogs((prev) =>
        prev.includes(id) ? prev.filter((blogId) => blogId !== id) : [...prev, id]
      );
      fetchBlogs();
    } catch (error) {
      console.error('Error liking blog:', error);
    }
  };

  const handleCommentChange = (blogId, text) => {
    setCommentText((prev) => ({ ...prev, [blogId]: text }));
  };

  const handleAddComment = async (blogId) => {
    const text = commentText[blogId];
    if (!text) return handleerror('Comment cannot be empty!');

    try {
      const response = await fetch(`http://localhost:8080/products/${blogId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: localStorage.getItem('token'),
        },
        body: JSON.stringify({ text }),
      });
      const data = await response.json();
      if (response.ok) {
        handlesuccess('Comment added!');
        setCommentText((prev) => ({ ...prev, [blogId]: '' }));
        fetchBlogs();
      } else {
        handleerror(data.message || 'Failed to add comment');
      }
    } catch (error) {
      console.error('Error adding comment:', error);
      handleerror('Something went wrong!');
    }
  };

  const toggleComments = (blogId) => {
    setShowComments((prev) => ({ ...prev, [blogId]: !prev[blogId] }));
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF6EF]">
      <FontImport />
      <Header2 />

      <div className="mx-auto" style={{ maxWidth: 1100, padding: '34px 44px 80px' }}>
        {Array.isArray(blogs) && blogs.length > 0 ? (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            style={{ gap: 18 }}
          >
            {blogs.map((b) => (
              <div
                key={b._id}
                className="bg-white rounded-[10px] overflow-hidden border border-[#E4DED0]"
              >
                {b.pic && (
                  <img
                    src={b.pic}
                    alt={b.title}
                    style={{ width: '100%', height: 150, objectFit: 'cover' }}
                  />
                )}

                <div style={{ padding: 18 }}>
                  <div
                    className="text-[#8B8577]"
                    style={{ fontSize: 11, marginBottom: 6 }}
                  >
                    {b.username || 'Anonymous'} &middot;{' '}
                    {b.date ? new Date(b.date).toLocaleDateString() : ''}
                  </div>

                  <h2
                    className="text-[#1C1B19]"
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: 18,
                      lineHeight: 1.35,
                      marginBottom: 6,
                    }}
                  >
                    {b.title}
                  </h2>

                  <p
                    className="text-[#6E6A61]"
                    style={{
                      fontSize: 13,
                      lineHeight: 1.6,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {b.content}
                  </p>

                  <div
                    className="flex items-center border-t border-[#E8E0D0]"
                    style={{ marginTop: 14, paddingTop: 12, gap: 18 }}
                  >
                    <button
                      className="flex items-center text-[#8B8577] hover:text-[#1C1B19] transition-colors"
                      style={{ gap: 6, fontSize: 12 }}
                      onClick={() => handleLike(b._id)}
                    >
                      {likedBlogs.includes(b._id) ? (
                        <FaHeart size={12} color="#C9BFE0" />
                      ) : (
                        <FaRegHeart size={12} />
                      )}
                      {b.likes}
                    </button>

                    <button
                      className="flex items-center text-[#8B8577] hover:text-[#1C1B19] transition-colors"
                      style={{ gap: 6, fontSize: 12 }}
                      onClick={() => toggleComments(b._id)}
                    >
                      <FaRegComment size={12} />
                      {b.comments.length}
                    </button>
                  </div>

                  {showComments[b._id] && (
                    <div style={{ marginTop: 14 }}>
                      <div className="flex flex-col" style={{ gap: 8 }}>
                        {b.comments.map((c, idx) => (
                          <div
                            key={idx}
                            className="bg-[#F3EEE2] text-[#2C2B28]"
                            style={{ padding: '8px 10px', borderRadius: 6, fontSize: 12 }}
                          >
                            <strong>{c.username || 'Guest'}:</strong> {c.text}
                          </div>
                        ))}
                      </div>

                      <div className="flex" style={{ marginTop: 10, gap: 8 }}>
                        <input
                          type="text"
                          placeholder="Write a comment..."
                          value={commentText[b._id] || ''}
                          onChange={(e) => handleCommentChange(b._id, e.target.value)}
                          className="flex-1 bg-transparent border-b border-[#D9D0BC] outline-none text-[#1C1B19] placeholder-[#B0AA9B]"
                          style={{ fontSize: 12, paddingBottom: 6 }}
                        />
                        <button
                          onClick={() => handleAddComment(b._id)}
                          className="text-[#1C1B19] border border-[#1C1B19] rounded-full hover:bg-[#1C1B19] hover:text-[#FAF6EF] transition-colors"
                          style={{ fontSize: 11, padding: '6px 14px' }}
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-[#8B8577]" style={{ fontSize: 13 }}>
            No stories yet.
          </p>
        )}
      </div>
      <Link
  to="/Blog"
  className="fixed bottom-18 right-8 bg-yellow-500 h-10 w-10 rounded-full flex items-center justify-center"
>+
</Link>

      <ToastContainer />
    </div>
  );
}

export default Final;