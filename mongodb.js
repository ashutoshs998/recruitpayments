const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const conn = mongoose.createConnection(process.env.MONGODB_URI);

let subscriptionSchema = new Schema({
    planKey: String,
    subscriptionId: String,
    activated: {
        type: Boolean,
        default: false
    }
}, {
    strict: false,
    timestamps: true
});

conn.model("subscriptions", subscriptionSchema)

module.exports = conn;