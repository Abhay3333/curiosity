// Repositories
const mongoose = require('mongoose');

// Define the repository schema
const repositorySchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true, // Automatically create an ObjectId
        
    },
    name: {
        type: String,
        required: true, // Name is required
        trim: true, // Trim whitespace
    },
    html_url: {
        type: String,
        required: true, // URL is required
        validate: {
            validator: function(v) {
                return /^(ftp|http|https):\/\/[^ "]+$/.test(v); // URL validation regex
            },
            message: props => `${props.value} is not a valid URL!`
        }
    },
    description: {
        type: String,
        trim: true, // Trim whitespace
        default: 'No description provided', // Default description
    },
    stargazers_count: {
        type: Number,
        default: 0, // Default value for stargazers
    },
    forks_count: {
        type: Number,
        default: 0, // Default value for forks
    },
    created_at: {
        type: Date,
        default: Date.now, // Automatically set to the current date
    },
    updated_at: {
        type: Date,
        default: Date.now, // Automatically set to the current date
    },
    language: {
        type: String,
        trim: true, // Trim whitespace
    },
});

// Middleware to update `updated_at` before saving
repositorySchema.pre('save', function(next) {
    this.updated_at = Date.now();
    next();
});

// Create the Repository model
const Repository = mongoose.model('Repository', repositorySchema);

module.exports = Repository;
