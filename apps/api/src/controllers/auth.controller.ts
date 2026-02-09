import type { Request, Response, NextFunction } from 'express';
import { registerSchema, loginSchema } from '../validators/auth.validator';
import { register, login } from '../services/auth.service';
import { ZodError } from 'zod';

/**
 * Register a new user
 * @route POST /api/auth/register
 */
export const registerController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Validate request body
    const validatedData = registerSchema.parse(req.body);

    // Call auth service
    const result = await register(validatedData);

    // Return 201 with token and user
    res.status(201).json(result);
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
 * Login an existing user
 * @route POST /api/auth/login
 */
export const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Validate request body
    const validatedData = loginSchema.parse(req.body);

    // Call auth service
    const result = await login(validatedData);

    // Return 200 with token and user
    res.status(200).json(result);
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
