import { Router } from 'express';
import authenticateUser from '../middlewares/authentication.middleware.js';

const router = Router();

router.get('/profile', authenticateUser, (req, res) => {
  res.status(200).json({
    message: 'User authenticated successfully',
    user: req.user
  });
});

export default router;