import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import readline from "readline";
import User from "../models/User.js";

dotenv.config();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const ask = (question) =>
    new Promise((resolve) => rl.question(question, resolve));

const run = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        const username = await ask("Admin username: ");
        const password = await ask("Admin password: ");

        const existingUser = await User.findOne({ userName: username });
        if (existingUser) {
            console.log(`User "${username}" already exists. Aborting.`);
            process.exit(0);
        }

        const hashPassword = bcrypt.hashSync(password, 12);
        await User.create({ userName: username, password: hashPassword });

        console.log(`Admin user "${username}" created successfully.`);
        process.exit(0);
    } catch (error) {
        console.error("Error creating admin user:", error.message);
        process.exit(1);
    } finally {
        rl.close();
    }
};

run();