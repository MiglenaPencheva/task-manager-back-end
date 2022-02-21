const mongoose = require('mongoose');

const taskScheme = new mongoose.Schema({
    content: {
        type: String,
        required: ['Content is required'],
    },
    creator: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    completer: {
        type: String,
    },
    isCompleted: Boolean,
},
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    });

module.exports = mongoose.model('Task', taskScheme);