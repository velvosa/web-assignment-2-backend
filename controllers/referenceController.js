import Reference from "../models/reference.js";

const formatReference = (reference) => ({
    name: reference.name,
    testimonial: reference.testimonial,
    position: reference.position,
    company: reference.company,
    id: reference._id
});

export const getAllReferences = async (req, res, next) => {
    try {
        const references = await Reference.find();
        res.json({ success: true, message: "References list retrieved successfully.", data: references.map(formatReference) });
    } catch (error) { next(error); }
};

export const getReferenceById = async (req, res, next) => {
    try {
        const reference = await Reference.findById(req.params.id);
        if (!reference) return res.status(404).json({ success: false, message: "Reference not found." });
        res.json({ success: true, message: "Reference retrieved successfully.", data: formatReference(reference) });
    } catch (error) { next(error); }
};

export const addReference = async (req, res, next) => {
    try {
        const reference = await Reference.create(req.body);
        res.status(201).json({ success: true, message: "Reference added successfully.", data: formatReference(reference) });
    } catch (error) { next(error); }
};

export const updateReference = async (req, res, next) => {
    try {
        await Reference.findByIdAndUpdate(req.params.id, req.body);
        res.json({ success: true, message: "Reference updated successfully." });
    } catch (error) { next(error); }
};

export const deleteReference = async (req, res, next) => {
    try {
        await Reference.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: "Reference deleted successfully." });
    } catch (error) { next(error); }
};