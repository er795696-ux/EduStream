import { Router } from 'express';
import {
  createAnnouncementController,
  getAllAnnouncementsController,
  getAnnouncementByIdController,
} from '../controllers/announcement.controller';
import { authenticate } from '../middleware/auth.middleware';
import { isTeacherInClass, isMemberOfClass } from '../middleware/classAuth';

const router = Router();

/**
 * @route GET /api/announcements
 * @desc Get all announcements for a class
 * @access Private (Class members)
 */
router.get('/', authenticate, isMemberOfClass, getAllAnnouncementsController);

/**
 * @route POST /api/announcements
 * @desc Create a new announcement
 * @access Private (Teachers of the class only)
 */
router.post('/', authenticate, isTeacherInClass, createAnnouncementController);

/**
 * @route GET /api/announcements/:id
 * @desc Get a single announcement by ID
 * @access Private (All authenticated users - todo: restrict to class members)
 */
router.get('/:id', authenticate, getAnnouncementByIdController);

export default router;
