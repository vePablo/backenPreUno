import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const jwtSecret = process.env.JWT_SECRET || 's3cr3t';

export const generateToken = (payload) => {
  return jwt.sign(payload, jwtSecret, { expiresIn: '1h' });
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, jwtSecret);
  } catch (error) {
    throw new Error('Invalid token');
  }
};
