import type { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { PrismaClientKnownRequestError } from '@prisma/client-runtime-utils';
import { MulterError } from 'multer';

/**
 * Custom API Error class with statusCode and operational flag
 */
export class ApiError extends Error {
  statusCode: number;
  isOperational: boolean;

  constructor(message: string, statusCode: number, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Global error handler middleware
 * Formats errors into standard JSON response and handles different error types
 * @param err - Error object
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next function
 */
export const errorHandler = (
  err: Error | ApiError | ZodError | PrismaClientKnownRequestError | MulterError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Log errors in development mode
  if (process.env.NODE_ENV === 'development') {
    console.error('Error occurred:', {
      name: err.name,
      message: err.message,
      stack: err.stack,
    });
  }

  // Handle Zod validation errors
  if (err instanceof ZodError) {
    const validationErrors: Record<string, string> = {};
    err.issues.forEach((issue) => {
      const path = issue.path.join('.');
      validationErrors[path] = issue.message;
    });

    res.status(400).json({
      error: {
        message: 'Validation failed',
        code: 'VALIDATION_ERROR',
        details: validationErrors,
      },
    });
    return;
  }

  // Handle Prisma errors
  if (err instanceof PrismaClientKnownRequestError) {
    // Unique constraint violation
    if (err.code === 'P2002') {
      const target = (err.meta?.target as string[]) || [];
      const field = target[0] || 'field';
      
      res.status(409).json({
        error: {
          message: `A record with this ${field} already exists`,
          code: 'DUPLICATE_ENTRY',
          details: { field },
        },
      });
      return;
    }

    // Record not found
    if (err.code === 'P2025') {
      res.status(404).json({
        error: {
          message: 'Resource not found',
          code: 'NOT_FOUND',
        },
      });
      return;
    }

    // Foreign key constraint violation
    if (err.code === 'P2003') {
      res.status(400).json({
        error: {
          message: 'Invalid reference to related resource',
          code: 'INVALID_REFERENCE',
        },
      });
      return;
    }

    // Generic Prisma error
    res.status(500).json({
      error: {
        message: 'Database operation failed',
        code: 'DATABASE_ERROR',
      },
    });
    return;
  }

  // Handle Multer errors
  if (err instanceof MulterError) {
    // File size limit exceeded
    if (err.code === 'LIMIT_FILE_SIZE') {
      res.status(400).json({
        error: {
          message: 'File size exceeds the maximum limit of 10MB',
          code: 'FILE_TOO_LARGE',
        },
      });
      return;
    }

    // Unexpected field
    if (err.code === 'LIMIT_UNEXPECTED_FILE') {
      res.status(400).json({
        error: {
          message: 'Unexpected file field',
          code: 'INVALID_FILE_FIELD',
        },
      });
      return;
    }

    // Generic Multer error
    res.status(400).json({
      error: {
        message: 'File upload failed',
        code: 'FILE_UPLOAD_ERROR',
        details: { reason: err.message },
      },
    });
    return;
  }

  // Handle custom ApiError
  if (err instanceof ApiError) {
    res.status(err.statusCode).json({
      error: {
        message: err.message,
        code: err.isOperational ? 'OPERATIONAL_ERROR' : 'INTERNAL_ERROR',
      },
    });
    return;
  }

  // Handle unexpected errors (500)
  // Don't expose internal details in production
  const message =
    process.env.NODE_ENV === 'development'
      ? err.message
      : 'An unexpected error occurred';

  res.status(500).json({
    error: {
      message,
      code: 'INTERNAL_SERVER_ERROR',
    },
  });
};
