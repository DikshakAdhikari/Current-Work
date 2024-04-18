
import mongoose, { Schema, Document } from 'mongoose';

export interface UserInterface extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  emailVerified: boolean;
}

const UserSchema: Schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true},
  password: { type: String, required: true },
  emailVerified: { type: Boolean, default: false },
});

export const User = mongoose.model<UserInterface>('Userr', UserSchema);
