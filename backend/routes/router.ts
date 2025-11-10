
import { Router } from 'express'
import { createUser } from '../controllers/createUser.ts';
import { loadCourses } from '../controllers/loadCourses.ts';

// Import other router files here
// import userRoutes from '...'

const router = Router();
router.use('/createUser', createUser);
router.get('/courses/:major_id', loadCourses);
// Add specific routes to router
// router.use(userRoutes)

export default router;