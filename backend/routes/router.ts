
import { Router } from 'express'
import { createUser } from '../controllers/createUser.ts';
import { fetchCoursesByMajor } from '../controllers/fetchCoursesByMajor.ts';

// Import other router files here
// import userRoutes from '...'

const router = Router();
router.use('/createUser', createUser);
router.get('/courses/:major_id', fetchCoursesByMajor);
// Add specific routes to router
// router.use(userRoutes)

export default router;