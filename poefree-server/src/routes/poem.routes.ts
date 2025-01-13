import { Router } from 'express';
import {
    getAllPoems,
    getAllPoemsForCurrentUser,
} from '../controllers/poem.controller';
const router = Router();

router.get('/', getAllPoems);
router.get('/user', getAllPoemsForCurrentUser); // /poem/user will get the poems of the currrent user

export default router;
