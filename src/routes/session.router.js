import { Router } from 'express';
import passport from 'passport';
import { register, login, current, logout } from '../controllers/session.controllers.js';

const router = Router();

router.post(
  '/login',
  (req, res, next) => {
    passport.authenticate('login', (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).json({ error: info.message || 'Unauthorized' });
      }
      req.logIn(user, { session: false }, (err) => {
        if (err) {
          return next(err);
        }
        return next();
      });
    })(req, res, next);
  },
  login
);

router.post('/register', register);

router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  current
);

router.get('/logout', logout);

export default router;
