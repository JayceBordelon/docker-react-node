export type Poem = {
    creator: string; // user id
    title: string;
    content: string;
    isDraft: boolean;
    public: boolean;
    archived: boolean;
    likes: string[]; // user id's
    views: string[]; // user id's
};
