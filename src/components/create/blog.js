import React, { useEffect, useState } from 'react'
import './blog.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Create() {
    const navigate = useNavigate();
    const [totalTime, setTotalTime] = useState(0);
    const [title, setTitle] = useState("");
    const [banner, setBanner] = useState("");
    const [body, setBody] = useState("");
    const [category, setCategory] = useState("");
    const [tags, setTags] = useState("");
    const [user, setUser] = useState();
    const [error, setError] = useState(localStorage.getItem("errors") ? JSON.parse(localStorage.getItem("errors")) : []);

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
            const foundUser = JSON.parse(loggedInUser);
            setUser(foundUser);
        } else {
            navigate('/auth');
        }

        const interval = setInterval(() => {
            setTotalTime((prevTime) => prevTime + 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [navigate]);

    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;

        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const sendBlogPost = async (e) => {
        e.preventDefault();

        const data = {
            title: "" + title,
            body: "" + body,
            // banner,
            timeTaken: "" + formatTime(totalTime),
            category: "" + category,
            tags: tags.split(',').map(tag => tag.trim()),
            author: "" + user.data.username
        };

        try {
            const res = await axios.post(process.env.REACT_APP_FRONTEND_URL + 'api/v1/blog/post-blog', data);
            navigate('/');
        } catch (err) {
            setError((prevError) => [...prevError, err]);
            localStorage.setItem("errors", JSON.stringify(error));
        }
    }

    return (
        <div>
            <div className='time'>{formatTime(totalTime)}</div>
            <section className="blog-post-form">
                <h1>Create a New Blog Post</h1>
                <form onSubmit={sendBlogPost}>
                    <div className="form-group">
                        <label htmlFor="title">Title:</label>
                        <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="content">Content:</label>
                        <textarea value={body} onChange={(e) => setBody(e.target.value)} rows="10" required></textarea>
                    </div>

                    <div className="form-group">
                        <label htmlFor="image">Banner:</label>
                        <input type="file" id="image" name="image" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="tags">Tags:</label>
                        <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} placeholder="Separate tags with commas" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="category">Category:</label>
                        <select value={category} onChange={(e) => setCategory(e.target.value)} id="category" name="category">
                            <option value="">Select a category</option>
                            <option value="technology">Technology</option>
                            <option value="lifestyle">Lifestyle</option>
                            <option value="travel">Travel</option>
                            <option value="food">Food</option>
                        </select>
                    </div>

                    <button type="submit" className="submit-btn">Publish Blog Post</button>
                </form>
            </section>
        </div>
    )
}
