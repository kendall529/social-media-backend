const { Schema, model, Types } = require('mongoose');
const formatDate = require('../utils/formatDate');

const reactionSchema = new Schema(
    {
        reactionId: {
            // Mongoose ObjectId data type
            type: Schema.Types.ObjectId,
            // Default value set to new ObjectId
            default: () => new Types.ObjectId(),
        },
        reationBody: {
            type: String,
            Required: true,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            //Default set to the current timestamp
            default: Date.now,
            //Use getter method to format the timestamp on query
            get: (timestamp) => formatDate(timestamp),
        }
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
);

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: 'Thought is required',
            minlength: 1,
            maxlength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // Use a getter method to format the timestamp on query
            get: (timestamp) => formatDate(timestamp),
        },
        username: {
            type: String,
            Required: true,
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;