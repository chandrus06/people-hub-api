import express from 'express';

import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} from '../controllers/user.controller.js';

import authenticate from '../middlewares/authentication.middleware.js';
import requireAdmin from '../middlewares/requireAdmin.middleware.js';

const router = express.Router();

router.get(
  '/',
  authenticate,
  getUsers
);

router.get(
  '/:id',
  authenticate,
  getUserById
);

router.post(
  '/create-user',
  createUser
);

router.put(
  '/:id',
  authenticate,
  updateUser
);

router.delete(
  '/:id',
  authenticate,
  requireAdmin,
  deleteUser
);

export default router;
