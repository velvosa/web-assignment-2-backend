import User from "../models/user.js";

const formatUser = (user) => ({
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    password: user.password,
    created: user.created,
    updated: user.updated,
    id: user._id
});

export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.json({ success: true, message: "Users list retrieved successfully.", data: users.map(formatUser) });
    } catch (error) { next(error); }
};

export const getUserById = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ success: false, message: "User not found." });
        res.json({ success: true, message: "User retrieved successfully.", data: formatUser(user) });
    } catch (error) { next(error); }
};

export const addUser = async (req, res, next) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json({ success: true, message: "User added successfully.", data: formatUser(user) });
    } catch (error) { next(error); }
};

export const updateUser = async (req, res, next) => {
    try {
        await User.findByIdAndUpdate(req.params.id, req.body);
        res.json({ success: true, message: "User updated successfully." });
    } catch (error) { next(error); }
};

export const deleteUser = async (req, res, next) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: "User deleted successfully." });
    } catch (error) { next(error); }
};