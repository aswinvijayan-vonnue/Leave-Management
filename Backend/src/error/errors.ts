export class AppError extends Error {
  status: number;
  constructor(msg: string, status: number) {
    super(msg);
    this.status = status;
  }
}

export class ValidationError extends AppError {
  constructor(msg: string) {
    super(msg, 400);
  }
}

export class ConflictError extends AppError {
  constructor(msg: string) {
    super(msg, 409);
  }
}

export class Unauthorized extends AppError {
  constructor(msg: string) {
    super(msg, 401);
  }
}
