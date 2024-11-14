import mongoose from "mongoose";

export default function configMongoDB() {
    mongoose
        .connect(
            process.env.MONGODB_URL,
        )
        .then(() => {
            console.log('mongodb connected.');
        })
        .catch((err) => console.log(err.message));

    mongoose.connection.on('connected', () => {
        console.log('Mongoose connected to db');
    });

    mongoose.connection.on('error', (err) => {
        console.log(err.message);
    });

    mongoose.connection.on('disconnected', () => {
        console.log('Mongoose connection is disconnected.');
    });
}
