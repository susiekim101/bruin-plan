
import { Router } from 'express'
import { sharePlan } from '../controllers/userController'
// Import other router files here
// import userRoutes from '...'

const router = Router();
router.use('/sharePlan', sharePlan);
// Add specific routes to router
// router.use(userRoutes)

export default router