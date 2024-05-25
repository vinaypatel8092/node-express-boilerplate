const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Successfully connected to the database');
    } catch (err) {
        console.error('Could not connect to the database. Exiting now...', err);
        process.exit(1);
    }
};

module.exports = { connect: connectDB };
