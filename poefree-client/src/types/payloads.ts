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

export type CreatePoemPayload = {
    title: string;
    content: string;
    isDraft: boolean;
    public: boolean;
    archived: boolean;
};
