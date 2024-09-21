import * as PetService from '../services/pet.services.js'
import * as UserService from '../services/mock.services.js';

export const generateMockUsers = async (req, res, next) => {
    try {
        const cantidad = parseInt(req.query.cantidad) || 10;
        const response = await UserService.createUserMock(cantidad);
        res.status(201).json({
            message: `${response.length} usuarios mock creados exitosamente.`,
            usuarios: response
        });
    } catch (error) {
        next(error);
    }
};

export const getUser = async (req, res, next) => {
try {
    const response = await UserService.getUser();
    res.status(200).json(response);
} catch (error) {
    next(error);
}
};
export const generateMockPets = async (req, res, next) => {
    try {
        const cantidad = parseInt(req.query.cantidad) || 10;
        const response = await PetService.createPetMock(cantidad);
        res.status(201).json({
            message: `${response.length} mascotas mock creadas exitosamente.`,
            mascotas: response
        });
    } catch (error) {
        next(error);
    }
};
