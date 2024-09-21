import Pet from '../models/pet.model.js';
import { faker } from '@faker-js/faker';

export const createPetMock = async (cantidad = 10) => {
    try {
        const petsArray = [];
        for (let i = 0; i < cantidad; i++) {
            const type = faker.helpers.arrayElement(['dog', 'cat']);
            let breed;

            if (type === 'dog') {
                breed = faker.animal.dog(); 
            } else if (type === 'cat') {
                breed = faker.animal.cat(); 
            }

            const pet = {
                name: faker.person.firstName(), 
                type: type,                    
                breed: breed,                  
                age: faker.number.int({ min: 1, max: 15 }),
                createdAt: new Date(),
                owner: faker.database.mongodbObjectId()
            };
            petsArray.push(pet);
        }
        return await Pet.create(petsArray);
    } catch (error) {
        throw new Error(error.message);
    }
};