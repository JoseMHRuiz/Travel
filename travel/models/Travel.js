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