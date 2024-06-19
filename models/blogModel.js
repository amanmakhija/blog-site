const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        // required: true,
    },
    body: {
        type: String,
        // required: true
    },
    author: {
        type: String,
        required: true
    },
    banner: {
        type: String,
        default: "https://res.cloudinary.com/mypersonalprojects/image/upload/v1714206407/blog-site/sample_llmnf3.jpg"
        // required: true
    },
    timeTaken: {
        type: String,
        // required: true
    },
    category: {
        type: String,
    },
    tags: {
        type: [String],
        // required: true
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('Blog', blogSchema);