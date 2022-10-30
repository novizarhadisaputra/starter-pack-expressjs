const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true]
    },
    subTitle: {
        type: String,
        required: [true]
    },
    status: {
        type: String,
        enum: ['Publish', 'Draft'],
        required: [true]
    },
});

const Course = mongoose.model('courses', CourseSchema)

module.exports = Course;
