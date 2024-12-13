import express, { Application, NextFunction, Request, Response } from 'express';

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Something went wrong!';
  res.status(statusCode).json({
    success: false,
    message: message,
    error: err,
  });
};

export default globalErrorHandler;
