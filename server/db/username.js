// Schema of usernames of stargazers in GitHub
const mongoose = require('./mongoose');

const Schema = mongoose.Schema;

// Define the username schema
const usernameSchema = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true, // Automatically create an ObjectId
        
    },
    githubId: {
        type: Number,
        required: true, // GitHub ID is required
    },
    login: {
        type: String,
        required: true, // Login is required
        trim: true, // Trim whitespace
    },
    name: {
        type: String,
        trim: true, // Trim whitespace
        default: 'No Name Provided', // Default name
    },
    html_url: {
        type: String,
        required: true, // URL is required
        validate: {
            validator: function(v) {
                return /^(ftp|http|https):\/\/[^ "]+$/.test(v); // URL validation regex
            },
            message: props => `${props.value} is not a valid URL!`,
        },
    },
    location: {
        type: String,
        trim: true, // Trim whitespace
        default: 'Location not specified', // Default location
    },
    bio: {
        type: String,
        trim: true, // Trim whitespace
        default: 'No bio available', // Default bio
    },
    public_repos: {
        type: Number,
        default: 0, // Default value for public_repos
    },
    public_gists: {
        type: Number,
        default: 0, // Default value for public_gists
    },
    followers: {
        type: Number,
        default: 0, // Default value for followers
    },
    dbLastUpdated: {
        type: Date,
        default: Date.now, // Automatically set to the current date
    },
    starredIds: {
        type: [mongoose.Schema.Types.ObjectId], // Array of ObjectId
        default: [], // Default to an empty array
    },
});

// Create the Username model
const Username = mongoose.model('Username', usernameSchema);

module.exports.Username = Username;
