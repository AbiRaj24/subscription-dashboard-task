import express from 'express';
import {
  subscribe,
  getMySubscription,
  getAllSubscriptions,
  cancelSubscription,
} from '../controllers/subscriptionController.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

router.post('/subscribe/:planId', authenticate, subscribe);
router.get('/my-subscription', authenticate, getMySubscription);
router.delete('/cancel', authenticate, cancelSubscription);
router.get('/admin/subscriptions', authenticate, authorize('admin'), getAllSubscriptions);

export default router;