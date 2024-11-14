import { Router } from 'express';
import AuthRouter from './auth.router';
import TaskRouter from './task.router';

const router = Router();
router.use('/auth', AuthRouter);
router.use('/tasks', TaskRouter);

export default router;