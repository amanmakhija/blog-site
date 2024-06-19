import React, { useEffect, useState } from 'react'
import './blog.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Blog() {
    const location = window.location.href;
    const navigate = useNavigate();
    const blogId = location.split('/blog/')[1];
    const [blog, setBlog] = useState({});

    useEffect(() => {
        const fetchBlog = async (id) => {
            const res = await axios.get('http://localhost:8000/api/v1/blog/get-blog?id=' + id);
            console.log(res.data.data);
            setBlog(res.data.data);
        }

        fetchBlog(blogId);
    }, [blogId]);

    return (
        <div className='blog-main'>
            <button className='back-btn' onClick={() => navigate('/')}>Go back</button>
            {blog && (
                <div className='blog-body'>
                    <div className='blog-banner' style={{ background: `url(${blog.banner})` }}></div>
                    <div className='blog-info'>
                        <h3>{blog.author}</h3>
                        <h1>{blog.title}</h1>
                        <p>{blog.subHeading}</p>
                        <p>{blog.intro}</p>
                        <p>{blog.body}</p>
                        <p>{blog.paragraph}</p>
                        <ul>
                            {blog.points && blog.points.map(p => (
                                <li>{p}</li>
                            ))}
                        </ul>
                        {blog.images && blog.images.map(img => (
                            <div className='blog-image' style={{ background: `url(${img})` }}></div>
                        ))}
                        <p>{blog.conclusion}</p>
                        <ul className='socials'>
                            {blog.socials && blog.socials.map(s => (
                                <li><a href={s}>{s}</a></li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    )
}
