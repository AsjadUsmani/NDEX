import {Router} from 'express'
import requireAuth from '../middlewares/requireAuth.js';

const router = Router();

router.get('/me', requireAuth, (req, res) => {
  const user = req.user;
  res.json({ id: user._id, email: user.email, name: user.name, role: user.role, settings: user.settings });
});

export default router;
