import { Router } from 'express';
import {
  createMaterialController,
  getAllMaterialsController,
} from '../controllers/material.controller';
import { authenticate } from '../middleware/auth.middleware';
import { requireRole } from '../middleware/rbac.middleware';
import { uploadMaterial } from '../middleware/upload.middleware';

const router = Router();

/**
 * @route GET /api/materials
 * @desc Get all materials or filter by category
 * @access Private (All authenticated users)
 */
router.get('/', authenticate, getAllMaterialsController);

/**
 * @route POST /api/materials
 * @desc Create a new material (upload file)
 * @access Private (Teachers only)
 */
router.post(
  '/',
  authenticate,
  requireRole(['TEACHER']),
  uploadMaterial.single('file'),
  createMaterialController
);

export default router;
