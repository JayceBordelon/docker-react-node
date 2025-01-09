export interface APIError {
    message: string; // Error message
    status?: number; // Optional HTTP status code
    data?: any; // Optional additional error data
}

export class APIErrorResponse implements APIError {
    message: string;
    status?: number;
    data?: any;

    constructor(message: string, status?: number, data?: any) {
        this.message = message;
        this.status = status;
        this.data = data;
    }
}
