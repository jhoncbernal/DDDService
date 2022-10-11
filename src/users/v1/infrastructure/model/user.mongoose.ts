import { Schema, model } from 'mongoose';

// Schema
const userSchema = new Schema(
  {
    uuid: {
      type: String
    },
    email: {
      type: String,
      required: [true, 'What is your email?'],
      lowercase: true,
      trim: true
    },

    name: { type: String, required: [true, 'What is your name?'] },
    phone: {
      type: Number,
      required: [true, 'What is your contact number?']
    },
    company: { type: String, required: [true, 'What is your company name?'] }
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
);
userSchema.index({ uuid: 1, email: 1 }, { unique: true });

userSchema.path('email').validate(function (email: string) {
  const emailRegex = /^([\w-\\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  return emailRegex.test(email); // Assuming email has a text attribute
}, 'The e-mail field cannot be empty or with out email structure.');
export const UserModel = model('User', userSchema);
