import type { Response, NextFunction } from 'express';
import type { AuthRequest } from '../types/express';
import { gradeSubmissionSchema } from '../validators/assignment.validator';
import {
  createSubmission,
  getSubmissionsByAssignment,
  gradeSubmission,
  getStudentSubmissions,
} from '../services/submission.service';
import { ZodError } from 'zod';
import { prisma } from '../../lib/prisma';

/**
 * Create a new submission
 * @route POST /api/assignments/:id/submit
 */
export const createSubmissionController = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Validate file exists
    if (!req.file) {
      res.status(400).json({
        error: {
          message: 'File is required',
          code: 'FILE_REQUIRED',
        },
      });
      return;
    }

    // Extract studentId from authenticated user
    const studentId = req.user!.id;

    // Extract assignmentId from route params
    const assignmentId = parseInt(req.params.id, 10);

    // Validate assignmentId is a number
    if (isNaN(assignmentId)) {
      res.status(400).json({
        error: {
          message: 'Invalid assignment ID',
          code: 'INVALID_ID',
        },
      });
      return;
    }

    // Build file URL
    const fileUrl = `/uploads/submissions/${req.file.filename}`;

    // Call service
    const submission = await createSubmission({
      assignmentId,
      studentId,
      fileUrl,
    });

    // Return 201 with created submission
    res.status(201).json(submission);
  } catch (error) {
    // Pass errors to error handler middleware
    next(error);
  }
};

/**
 * Get all submissions for an assignment
 * @route GET /api/assignments/:id/submissions
 */
export const getSubmissionsByAssignmentController = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Extract assignmentId from route params
    const assignmentId = parseInt(req.params.id, 10);

    // Validate assignmentId is a number
    if (isNaN(assignmentId)) {
      res.status(400).json({
        error: {
          message: 'Invalid assignment ID',
          code: 'INVALID_ID',
        },
      });
      return;
    }

    // Extract teacherId from authenticated user
    const teacherId = req.user!.id;

    // Validate teacher owns the assignment
    const assignment = await prisma.assignment.findUnique({
      where: { id: assignmentId },
      select: { teacherId: true },
    });

    if (!assignment) {
      res.status(404).json({
        error: {
          message: 'Assignment not found',
          code: 'NOT_FOUND',
        },
      });
      return;
    }

    if (assignment.teacherId !== teacherId) {
      res.status(403).json({
        error: {
          message: 'You do not have permission to view these submissions',
          code: 'FORBIDDEN',
        },
      });
      return;
    }

    // Call service
    const submissions = await getSubmissionsByAssignment(assignmentId);

    // Return 200 with submissions array
    res.status(200).json(submissions);
  } catch (error) {
    // Pass errors to error handler middleware
    next(error);
  }
};

/**
 * Grade a submission
 * @route PATCH /api/submissions/:id/grade
 */
export const gradeSubmissionController = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Validate request body
    const validatedData = gradeSubmissionSchema.parse(req.body);

    // Extract submissionId from route params
    const submissionId = parseInt(req.params.id, 10);

    // Validate submissionId is a number
    if (isNaN(submissionId)) {
      res.status(400).json({
        error: {
          message: 'Invalid submission ID',
          code: 'INVALID_ID',
        },
      });
      return;
    }

    // Extract teacherId from authenticated user
    const teacherId = req.user!.id;

    // Call service
    const submission = await gradeSubmission(
      submissionId,
      teacherId,
      validatedData.grade
    );

    // Return 200 with updated submission
    res.status(200).json(submission);
  } catch (error) {
    if (error instanceof ZodError) {
      // Handle validation errors
      res.status(400).json({
        error: {
          message: 'Validation failed',
          code: 'VALIDATION_ERROR',
          details: error.issues.reduce((acc: Record<string, string>, err) => {
            acc[err.path.join('.')] = err.message;
            return acc;
          }, {}),
        },
      });
      return;
    }
    // Pass other errors to error handler middleware
    next(error);
  }
};

/**
 * Get all submissions for the authenticated student
 * @route GET /api/submissions/my-submissions
 */
export const getStudentSubmissionsController = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Extract studentId from authenticated user
    const studentId = req.user!.id;

    // Call service
    const submissions = await getStudentSubmissions(studentId);

    // Return 200 with submissions array
    res.status(200).json(submissions);
  } catch (error) {
    // Pass errors to error handler middleware
    next(error);
  }
};
