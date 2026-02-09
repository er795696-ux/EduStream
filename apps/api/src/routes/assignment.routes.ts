import { Router } from 'express';
import {
  createAssignmentController,
  getAllAssignmentsController,
  getAssignmentByIdController,
} from '../controllers/assignment.controller';
import { authenticate } from '../middleware/auth.middleware';
import { requireRole } from '../middleware/rbac.middleware';
import { uploadMaterial } from '../middleware/upload.middleware';

const router = Router();

/**
 * @route GET /api/assignments
 * @desc Get all assignments
 * @access Private (All authenticated users)
 */
router.get('/', authenticate, getAllAssignmentsController);

/**
 * @route GET /api/assignments/:id
 * @desc Get a single assignment by ID
 * @access Private (All authenticated users)
 */
router.get('/:id', authenticate, getAssignmentByIdController);

/**
 * @route POST /api/assignments
 * @desc Create a new assignment
 * @access Private (Teachers only)
 */
router.post(
  '/',
  authenticate,
  requireRole(['TEACHER']),
  uploadMaterial.single('file'),
  createAssignmentController
);

export default router;
