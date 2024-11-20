import { Router } from 'express';
import { issueVC } from '../controllers/issuerController';

const router = Router();

router.post('/issue-vc', issueVC);

export default router;