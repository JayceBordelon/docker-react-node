export interface APIError {
    message: string; // Error message
    status?: number; // Optional HTTP status code
    errors?: string[]; // Optional additional error data
}

export class APIErrorResponse implements APIError {
    message: string;
    status?: number;
    errors?: string[];

    constructor(message: string, status?: number, errors?: string[]) {
        this.message = message;
        this.status = status;
        this.errors = errors;
    }
}
