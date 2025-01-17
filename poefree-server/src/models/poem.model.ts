import mongoose, { Schema, Document, Model } from 'mongoose';

interface IPoem extends Document {
    creator: mongoose.Types.ObjectId;
    title: string;
    content: string;
    isDraft: boolean;
    public: boolean;
    archived: boolean;
    likes: mongoose.Types.ObjectId[];
    views: mongoose.Types.ObjectId[];
}

const PoemSchema: Schema<IPoem> = new Schema(
    {
        creator: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        title: { type: String, required: true },
        content: { type: String, required: true },
        isDraft: { type: Boolean, default: true },
        public: { type: Boolean, default: false },
        archived: { type: Boolean, default: false },
        likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        views: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    },
    { timestamps: true },
);

const Poem: Model<IPoem> = mongoose.model<IPoem>('Poem', PoemSchema);

export default Poem;
