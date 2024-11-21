import { Router } from 'express';
import { decodeVC } from '../controllers/holderController';

const router = Router();

router.post('/decode-vc', decodeVC);

export default router;