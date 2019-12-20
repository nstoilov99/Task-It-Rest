const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Model = mongoose.model;
const { String, Number, Boolean, ObjectId } = Schema.Types;

const taskSchema = new Schema({
    title:{
        type: String,
        required: true,
    },

    difficulty: {
        type: String,        
        required: true,
    },

    expiriance: {
        type: Number,        
        required: true,
    },

    description: {
        type: String,
        required: true,
    },

    author: {
        type: ObjectId,
        ref: "User"
    }

});

module.exports = new Model('Task', taskSchema);