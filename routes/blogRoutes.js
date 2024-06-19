const express = require('express');
const blog = require('../models/blogModel');
const user = require('../models/userModel');
const responseFunction = require('../utils/responseFunction');

const router = express.Router();

router.get('/get-blog', async (req, res, next) => {
    try {
        const { id } = req.query;
        const isBlog = await blog.findOne({ _id: id });
        if (!isBlog) return responseFunction(res, 400, 'Blog not available', null, false);
        return responseFunction(res, 200, 'Blog found', isBlog, true);
    } catch (err) {
        return responseFunction(res, 400, 'Unable to find blog', err.message, false);
    }
});

router.get('/', async (req, res, next) => {
    try {
        const blogs = await blog.find();
        return responseFunction(res, 200, 'Blogs found', blogs, true);
    } catch (err) {
        return responseFunction(res, 400, 'Unable to find blogs', err.message, false);
    }
});

router.post('/post-blog', async (req, res, next) => {
    try {
        const newBlog = new blog(req.body);
        const result = await newBlog.save();
        return responseFunction(res, 200, 'Blog created successfully', result, true);
    } catch (err) {
        return responseFunction(res, 400, 'Error creating new blog', err.message, false);
    }
});

router.get('/user-details', async (req, res, next) => {
    try {
        const { userId } = req.query;
        const isUser = await user.findOne({ _id: userId });
        const blogs = await blog.find({ author: isUser.username });
        return responseFunction(res, 200, 'Blogs found', { isUser, blogs }, true);
    } catch (err) {
        return responseFunction(res, 400, 'Unable to find blogs of user', err.message, false);
    }
});

router.post('/subscribe', async (req, res, next) => {
    try {
        const { username, email } = req.query;
        const User = await user.findOne({ email });
        User.subscribedUsers.push(username);
        await User.save();
        return responseFunction(res, 200, 'Subscribed successfully', User, true);
    } catch (err) {
        return responseFunction(res, 400, 'Error subscribing', err.message, false);
    }
});

module.exports = router;