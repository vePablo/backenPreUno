import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const jwtSecret = process.env.JWT_SECRET //|| 's3cr3t';

if (!jwtSecret) {
  throw new Error('JWT_SECRET is not defined in environment variables');
}

export const generateToken = (payload) => {
  return jwt.sign(payload, jwtSecret, { expiresIn: '24h' });
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, jwtSecret);
  } catch (error) {
    return { valid: false, error: 'Invalid token' };
  }
};
