
import { Router } from 'express'
import { createUser } from '../controllers/createUser';
// Import other router files here
// import userRoutes from '...'

const router = Router();
router.use('/createUser', createUser);
// Add specific routes to router
// router.use(userRoutes)

export default router