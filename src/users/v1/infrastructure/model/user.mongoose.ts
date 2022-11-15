import { Schema, model } from 'mongoose';

// Schema
const userSchema = new Schema(
  {
    uuid: {
      type: String,
      default: null
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
      required: [true, 'What is your contact number?'],
      length: { minimum: 10, maximum: 15 }
    },
    company: { type: String, required: [true, 'What is your company name?'] },
    roles: [
      {
        role: { type: String, required: true, lowercase: false },
        privileges: [
          {
            actions: [{ type: String, required: true, lowercase: false }],
            resources: [{ type: String, required: true, lowercase: false }]
          }
        ]
      }
    ],
    referal_code: { type: String, default: null },
    country_code: { type: String, default: null },
    password: { type: String, default: null },
    token: { type: String, default: null },
    status: { type: String, default: 'active' },
    documentId: { type: String, default: null },
    policy_status: {
      status: { type: String, default: 'pending' },
      date: { type: Date, default: null }
    },
    home_address: {
      address: { type: String, default: null },
      city: { type: String, default: null },
      state: { type: String, default: null },
      country: { type: String, default: null },
      zip_code: { type: String, default: null },
      reference: { type: String, default: null },
      aparment: { type: String, default: null },
      bock: { type: String, default: null }
    }
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
);
userSchema.index({ uuid: 1, email: 1 }, { unique: true });

userSchema.methods.toJSON = function () {
  let user = this.toObject();
  delete user.password;
  return user;
};

export const UserModel = model('User', userSchema);
