
import { Router } from 'express'
import { createUser } from '../controllers/createUser';
import { search } from '../controllers/userController';
// Import other router files here
// import userRoutes from '...'

const router = Router();
router.use('/createUser', createUser);
router.use('/search', search)
// Add specific routes to router
// router.use(userRoutes)

export default router