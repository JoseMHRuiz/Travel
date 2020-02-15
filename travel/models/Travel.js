const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const travelSchema = new Schema({
    type: [{
        relax: {
            type: Number,
            enum: [1, 2, 3, 4, 5],
            require: true
        }
    }, {
        cultural: {
            type: Number,
            enum: [1, 2, 3, 4, 5],
            require: true
        }
    }, {
        party: {
            type: Number,
            enum: [1, 2, 3, 4, 5],
            require: true
        }
        }],
    budget: {
        type: String,
        enum: ['💵', '💵💵', '💵💵💵'],
        require: true
    },
    name: {
        type: String,
        require: true
    },
    city: {
        type: Schema.Types.ObjectId,
        ref: 'City',
        require: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    days: [{
        type: Schema.Types.ObjectId,
        ref: 'Day',
        require: true
    }]
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

const Travel = mongoose.model('User', travelSchema);
module.exports = Travel;
