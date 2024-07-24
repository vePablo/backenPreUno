import passport from 'passport';
import local from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import User from '../models/user.models.js';
import { comparePassword } from '../helpers/hash.js';

const LocalStrategy = local.Strategy;
const JWTStrategy = JwtStrategy;
const ExtractJWT = ExtractJwt;

const initializePassport = () => {
  passport.use(
    'login',
    new LocalStrategy(
      { usernameField: 'email', passReqToCallback: true },
      async (req, email, password, done) => {
        try {
    
          const user = await User.findOne({ email });

          if (!user) {
            return done(null, false, { message: 'Usuario no encontrado' });
          }

          const isMatch = await comparePassword(password, user.password);
          

          if (!isMatch) {
            return done(null, false, { message: 'Contraseña incorrecta' });
          }

          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.use(
    'jwt',
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJWT.fromExtractors([(req) => {
          const token = cookieExtractor(req);
          return token;
        }]),
        secretOrKey: process.env.JWT_SECRET || 's3cr3t'
      },
      async (payload, done) => {
        try {
          const user = await User.findById(payload.id);
          if (!user) {
            return done(null, false, { message: 'Usuario no encontrado' });
          }
          console.log('Usuario encontrado:', user);
          return done(null, user);
        } catch (error) {
          console.log('Error al buscar el usuario:', error.message);
          return done(error);
        }
      }
    )
  );
};

function cookieExtractor(req) {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies['token'];
  }
  return token;
}

export { initializePassport };
