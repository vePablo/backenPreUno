import User from '../models/user.models.js';
import { generateUser } from '../helpers/user.mock.js';


export const createUserMock = async (cantidad = 10) => {
    try {
        const usersArray = [];
        for (let i = 0; i < cantidad; i++) {
            const user = generateUser();
            usersArray.push(user);
        }
        return await User.create(usersArray);
    } catch (error) {
        throw new Error(error.message);
    }
};

export const getUser = async () => {
    try {
        return await User.find({}); 

    }catch (error) {        
        throw new Error(error.message);
    }
};

