import mongoose from "mongoose";
import { User, UserPlace } from "../types";
import argon2 from "argon2";
import { randomUUID } from "crypto";


function usersCollection() {
    const db = mongoose.connection.db;
    if (!db) throw new Error("Cannot connect to database");
    return db.collection<User>("users");
}

export async function ensureUserIndexs() {
    const users = usersCollection();
    await users.createIndex({ email: 1 }, { unique: true });
}

export async function findUserByEmail(email: string) {
    const users = usersCollection();
    return users.findOne({ email: email });
}

export async function findUserById(id: string) {
    const users = usersCollection();
    return users.findOne({ userId: id });
}

export async function createUser(email: string, name: string, password: string) {
    const users = usersCollection();

    // basic password check, improve later
    //
    if (password.length < 8 || !(/[a-z]/.test(password)) || !(/[A-Z]/.test(password))) {
        throw new Error("Password Invalid");
    }

    const hashed = await argon2.hash(password);

    const user: User = {
        _id: undefined as any,
        userId: randomUUID(),
        googleId: "",
        email: email,
        password: hashed,
        name: name,
        likes: [],
        dislikes: [],
        events: [],
        eventHistory: []
    }

    await users.insertOne(user as any);

    const saved = await users.findOne({ email: email });
    if (!saved) throw new Error("Failed to create user");
    return saved;
}


export async function verifyPassword(user: User, password: string) {
    return argon2.verify(user.password, password);
}

export async function getUserLikesDislikes(uid: string) {
    const users = usersCollection();
    const found = await users.findOne({ userId: uid });
    if (!found) throw new Error("Failed to fetch user");
    return { userId: found.userId, likes: found.likes, dislikes: found.dislikes };
}

export async function editUserLikesDislikes(userPlace: UserPlace) {
    const users = usersCollection();
    await users.updateOne(
        { userId: userPlace.userId },
        {
            $addToSet: {
                likes: { $each: userPlace.likes },
                dislikes: { $each: userPlace.dislikes },
            }
        }
    )
}
