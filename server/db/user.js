// models/user.model.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    githubId: { type: String, required: true, unique: true },
    login: { type: String, required: true },
    name: { type: String },
    avatar_url: { type: String },
    html_url: { type: String },
    accessToken: { type: String },
    repositories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Repository' }]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
