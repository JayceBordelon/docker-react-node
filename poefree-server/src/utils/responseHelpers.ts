export type ApiResponse<T> = {
    success: boolean; // Indicates if the operation was successful
    message: string; // Human-readable message
    data?: T; // Optional data payload
    errors?: any[]; // Optional list of errors (e.g., validation errors)
};

// Helper function to create a success response
export const successResponse = <T>(
    data: T,
    message = 'Request successful',
): ApiResponse<T> => ({
    success: true,
    message,
    data,
});

// Helper function to create an error response
export const errorResponse = (
    message = 'Request failed',
    errors: any[] = [],
): ApiResponse<null> => ({
    success: false,
    message,
    errors,
});
