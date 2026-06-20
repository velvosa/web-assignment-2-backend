import Project from "../models/project.js";

const formatProject = (project) => ({
    title: project.title,
    completion: project.completion,
    description: project.description,
    image: project.image,
    id: project._id
});

export const getAllProjects = async (req, res, next) => {
    try {
        const projects = await Project.find();
        res.json({ success: true, message: "Projects list retrieved successfully.", data: projects.map(formatProject) });
    } catch (error) { next(error); }
};

export const getProjectById = async (req, res, next) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) return res.status(404).json({ success: false, message: "Project not found." });
        res.json({ success: true, message: "Project retrieved successfully.", data: formatProject(project) });
    } catch (error) { next(error); }
};

export const addProject = async (req, res, next) => {
    try {
        const project = await Project.create(req.body);
        res.status(201).json({ success: true, message: "Project added successfully.", data: formatProject(project) });
    } catch (error) { next(error); }
};

export const updateProject = async (req, res, next) => {
    try {
        await Project.findByIdAndUpdate(req.params.id, req.body);
        res.json({ success: true, message: "Project updated successfully." });
    } catch (error) { next(error); }
};

export const deleteProject = async (req, res, next) => {
    try {
        await Project.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: "Project deleted successfully." });
    } catch (error) { next(error); }
};