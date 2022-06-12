const { Schema, model } = require("mongoose");

const plantSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            default: 'Unknown name'
        },
        latinName: {
            type: String,
        },
        description: {
            type: String,
        },
        image: {
            type: String,
            default: ''
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        irrigation: {
            type: Number,
        },
        fertiliser: {
            type: Number
        }
    },
    {
        timestamps: true,
    }
);

const Plant = model("Plant", plantSchema);

module.exports = Plant;
