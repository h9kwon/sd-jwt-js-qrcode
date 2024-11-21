import { Router } from 'express';
import { verifyVP, decodeVP } from '../controllers/verifierController';

const router = Router();

router.post('/verify-vp', verifyVP);
router.post('/decode-vp', decodeVP);

export default router;