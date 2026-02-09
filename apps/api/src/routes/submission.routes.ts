import { Router } from 'express';
import {
  createSubmissionController,
  getSubmissionsByAssignmentController,
  gradeSubmissionController,
  getStudentSubmissionsController,
} from '../controllers/submission.controller';
import { authenticate } from '../middleware/auth.middleware';
import { requireRole } from '../middleware/rbac.middleware';
import { uploadSubmission } from '../middleware/upload.middleware';

const router = Router();

/**
 * @route POST /api/assignments/:id/submit
 * @desc Submit an assignment
 * @access Private (Students only)
 */
router.post(
  '/assignments/:id/submit',
  authenticate,
  requireRole(['STUDENT']),
  uploadSubmission.single('file'),
  createSubmissionController
);

/**
 * @route GET /api/assignments/:id/submissions
 * @desc Get all submissions for an assignment
 * @access Private (Teachers only)
 */
router.get(
  '/assignments/:id/submissions',
  authenticate,
  requireRole(['TEACHER']),
  getSubmissionsByAssignmentController
);

/**
 * @route PATCH /api/submissions/:id/grade
 * @desc Grade a submission
 * @access Private (Teachers only)
 */
router.patch(
  '/submissions/:id/grade',
  authenticate,
  requireRole(['TEACHER']),
  gradeSubmissionController
);

/**
 * @route GET /api/submissions/my-submissions
 * @desc Get all submissions for the authenticated student
 * @access Private (Students only)
 */
router.get(
  '/submissions/my-submissions',
  authenticate,
  requireRole(['STUDENT']),
  getStudentSubmissionsController
);

export default router;
