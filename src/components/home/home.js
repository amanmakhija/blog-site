import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './home.css';
import Loading from '../loading/loading';

const Home = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const { data } = await axios.get('http://localhost:8000/api/v1/blog');
                setBlogs(data.data.reverse());
                setLoading(false);
            } catch (err) {
                setError((prevError) => [...prevError, err]);
                localStorage.setItem("errors", JSON.stringify(error));
                setLoading(false);
            }
        };

        fetchBlogs();
    }, [error]);

    const openBlog = (id) => {
        navigate('/blog/' + id);
    };

    return (
        <div className='home'>
            <h1>Latest Blogs</h1>
            {!loading && <Loading />}
            {!loading && !error && (
                <>
                    <marquee>{blogs[0].author} posted a new blog in {blogs[0].category}. <span onClick={(id) => openBlog(blogs[0]._id)}>Click to view.</span></marquee>
                    <div className='blog-container'>
                        {blogs && blogs.map(blog => (
                            <div onClick={(id) => openBlog(blog._id)} key={blog._id} className='blog'>
                                <div className='banner' style={{ background: `url(${blog.banner})` }}></div>
                                <div className='info'>
                                    <h3>{blog.title}</h3>
                                    <p>{blog.body}</p>
                                    <span>~{blog.author}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default Home;
