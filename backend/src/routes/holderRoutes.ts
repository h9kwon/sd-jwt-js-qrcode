import { Router } from 'express';
import { decodeVC, createVP } from '../controllers/holderController';

const router = Router();

router.post('/decode-vc', decodeVC);
router.post('/create-vp', createVP);

export default router;