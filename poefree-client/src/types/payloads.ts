export type UserRegistrationPayload = {
    username: string;
    email: string;
    password: string;
};

export type UserLoginPayload = {
    email: string;
    password: string;
};

export type ProfilePicturePayload = {
    data: FormData;
};
