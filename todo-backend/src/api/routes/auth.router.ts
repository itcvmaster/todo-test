import { Router } from 'express';
import TaskController from '@/api/controllers/task.controller';

const router = Router();

router.post('/signin', TaskController.getTasks);
router.post('/signup', TaskController.getTasks);

export default router;