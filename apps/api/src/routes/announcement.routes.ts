import { Router } from 'express';
import {
  createAnnouncementController,
  getAllAnnouncementsController,
  getAnnouncementByIdController,
} from '../controllers/announcement.controller';
import { authenticate } from '../middleware/auth.middleware';
import { requireRole } from '../middleware/rbac.middleware';

const router = Router();

/**
 * @route GET /api/announcements
 * @desc Get all announcements
 * @access Private (All authenticated users)
 */
router.get('/', authenticate, getAllAnnouncementsController);

/**
 * @route POST /api/announcements
 * @desc Create a new announcement
 * @access Private (Teachers only)
 */
router.post('/', authenticate, requireRole(['TEACHER']), createAnnouncementController);

/**
 * @route GET /api/announcements/:id
 * @desc Get a single announcement by ID
 * @access Private (All authenticated users)
 */
router.get('/:id', authenticate, getAnnouncementByIdController);

export default router;
