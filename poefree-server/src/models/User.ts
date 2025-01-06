import mongoose, { Schema, Document, Model } from "mongoose";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

// Define the User Schema
export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  subscribers: mongoose.Types.ObjectId[];
  subscribedTo: mongoose.Types.ObjectId[];
  poems: mongoose.Types.ObjectId[];
  saved: mongoose.Types.ObjectId[];
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// Schema Definition
const UserSchema: Schema<IUser> = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    subscribers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    subscribedTo: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    poems: [{ type: mongoose.Schema.Types.ObjectId, ref: "Poem" }],
    saved: [{ type: mongoose.Schema.Types.ObjectId, ref: "Poem" }]
  },
  { timestamps: true }
);

// Middleware to Hash Password Before Saving
UserSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next();
  }
});

// Compare Password Method
UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

// Static Method for Registration
UserSchema.statics.register = async function (
  username: string,
  email: string,
  password: string
): Promise<IUser> {
  const user = new this({ username, email, password });
  return user.save();
};

// Static Method for Login
UserSchema.statics.login = async function (
  email: string,
  password: string
): Promise<IUser | null> {
  const user = await this.findOne({ email });
  if (user && (await user.comparePassword(password))) {
    return user;
  }
  return null;
};

const User: Model<IUser> = mongoose.model<IUser>("User", UserSchema);

export default User;
