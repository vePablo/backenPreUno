import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';

faker.locale = 'es';

export const generateUser = () => {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const password = 'coder123'; 
    const hashedPassword = bcrypt.hashSync(password, 10);

    
    const email = faker.internet.email(firstName, lastName, 'example.com');

    const user = {
        first_name: firstName,
        last_name: lastName,
        email: email,
        age: faker.number.int({ min: 18, max: 100 }),
        password: hashedPassword,
        cart: null,
        role: faker.helpers.arrayElement(['user', 'admin']),
        pets: [],
        createdAt: new Date(),
        updatedAt: new Date()
    };
    
    return user; 
};

