import Service from "../models/service.js";

const formatService = (service) => ({
    title: service.title,
    description: service.description,
    id: service._id
});

export const getAllServices = async (req, res, next) => {
    try {
        const services = await Service.find();

        res.json({
            success: true,
            message: "Services list retrieved successfully.",
            data: services.map(formatService)
        });
    } catch (error) {
        next(error);
    }
};

export const getServiceById = async (req, res, next) => {
    try {
        const service = await Service.findById(req.params.id);

        if (!service) {
            return res.status(404).json({
                success: false,
                message: "Service not found."
            });
        }

        res.json({
            success: true,
            message: "Service retrieved successfully.",
            data: formatService(service)
        });
    } catch (error) {
        next(error);
    }
};

export const addService = async (req, res, next) => {
    try {
        const service = await Service.create(req.body);

        res.status(201).json({
            success: true,
            message: "Service added successfully.",
            data: formatService(service)
        });
    } catch (error) {
        next(error);
    }
};

export const updateService = async (req, res, next) => {
    try {
        await Service.findByIdAndUpdate(req.params.id, req.body);

        res.json({
            success: true,
            message: "Service updated successfully."
        });
    } catch (error) {
        next(error);
    }
};

export const deleteService = async (req, res, next) => {
    try {
        await Service.findByIdAndDelete(req.params.id);

        res.json({
            success: true,
            message: "Service deleted successfully."
        });
    } catch (error) {
        next(error);
    }
};