import UserService from '../services/user.services.js';
import { generateToken } from '../helpers/jwt.js';
import Joi from 'joi';
import { userDto } from '../dtos/user.dto.js';


export const register = async (req, res) => {
  try {
    // Validar el body con joi
    const { error } = userDto.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { first_name, last_name, email, age, password, role } = req.body;

    const newUser = await UserService.createUser({
      first_name,
      last_name,
      email,
      age,
      password,
      role,
    });

    res.status(201).json({ status: 'success', payload: newUser });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

export const login = (req, res) => {
    const payload = {
      id: req.user._id, 
      first_name: req.user.first_name,
      last_name: req.user.last_name,
      email: req.user.email,
      role: req.user.role,
    };
  
    const token = generateToken(payload);
    console.log('Token generado:', token);
  
    res.cookie('token', token, {
      maxAge: 100000,
      httpOnly: true,
    });
  
    res.status(200).json({
      message: 'Login success',
      token,
    });
  };
  
  export const current = (req, res) => {
    const user = req.user.toObject();
      const { password, ...userData } = user;
    res.status(200).json({
      message: 'Bienvenido',
      user: userData,
    });
  };
  
  

export const logout = (req, res) => {
  res.clearCookie('token');
  res.status(200).json({
    message: 'Sesión cerrada',
  });
};
