import bcrypt from "bcrypt";
import mongoose, { Schema, UpdateQuery } from "mongoose";
import config from "../../config";
import {
  IUserModel,
  TAddress,
  TFullName,
  TOrder,
  TUser,
} from "./user.interface";

const fullNameSchema = new Schema<TFullName>(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      maxlength: [20, "First name cannot be more than 20 characters"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      maxlength: [20, "Last name cannot be more than 20 characters"],
    },
  },
  { _id: false }
);

const orderSchema = new Schema<TOrder>(
  {
    productName: {
      type: String,
      required: [true, "Product name is required"],
    },
    price: {
      type: Number,
      required: [true, "Product Price is required"],
    },
    quantity: {
      type: Number,
      required: [true, "Product Quantity is required"],
    },
  },
  { _id: false }
);

const addressSchema = new Schema<TAddress>(
  {
    street: {
      type: String,
      required: [true, "Street is required"],
    },
    city: {
      type: String,
      required: [true, "City is required"],
    },
    country: {
      type: String,
      required: [true, "Country is required"],
    },
  },
  { _id: false }
);

const userSchema = new Schema<TUser, IUserModel>({
  userId: {
    type: Number,
    required: [true, "User ID is required"],
    unique: true,
    trim: true,
  },
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  fullName: fullNameSchema,
  age: {
    type: Number,
    required: [true, "Age is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  isActive: {
    type: Boolean,
    required: [true, "Active status is required"],
  },
  hobbies: {
    type: [String],
  },
  address: { type: addressSchema, required: [true, "Address is required"] },
  orders: [orderSchema],
});

userSchema.pre("save", async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});

userSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate() as UpdateQuery<TUser>;
  if (update.password) {
    update.password = await bcrypt.hash(
      update.password,
      Number(config.bcrypt_salt_rounds)
    );
  }
  next();
});

userSchema.statics.isUserExists = async function (userId: string) {
  const user = await User.findOne({ userId });
  return user?.toObject();
};

const User = mongoose.model<TUser, IUserModel>("User", userSchema);

export default User;
