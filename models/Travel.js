const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const travelSchema = new Schema({
    tags: {
        type: [String], 
        enum: ['cultural', 'relax', 'party'],
        required: true
    },
    budget: {
        type: String,
        enum: ['💵', '💵💵', '💵💵💵'],
        required: true
    },
    name: {
        type: String,
        required: true
    },
    city: {
        type: Schema.Types.ObjectId,
        ref: 'City',
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    days: [{
        breakfast: {
            place: String,
            address: String,
            position: {
                lat: Number,
                lon: Number
            },
            description: String,
        },
        morning: [{
            place: String,
            address: String,
            duration: {
                type: String,
                enum: ['30min-1hour', '1-2 hours', '2-3 hours', '3 or more hours']
            },
            position: {
                lat: Number,
                lon: Number
            },
            description: String
        }],
        lunch: {
            place: String,
            address: String,
            position: {
                lat: Number,
                lon: Number
            },
            description: String
        },
        afternoon: [{
            place: String,
            address: String,
            duration: {
                type: String,
                enum: ['30min-1hour', '1-2 hours', '2-3 hours', '3 or more hours']
            },
            position: {
                lat: Number,
                lon: Number
            },
            description: String
        }],
        dinner: {
            place: String,
            address: String,
            position: {
                lat: Number,
                lon: Number
            },
            description: String
        }
    }]
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

const Travel = mongoose.model('Travel', travelSchema);
module.exports = Travel;