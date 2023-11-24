import mongoose, { Schema } from "mongoose";
import { TAddress, TFullName, TOrder, TUser } from "./user.interface";

const fullNameSchema = new Schema<TFullName>({
  firstName: {
    type: String,
    required: [true, "First name is required"],
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
  },
});

const orderSchema = new Schema<TOrder>({
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
});

const addressSchema = new Schema<TAddress>({
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
});

const userSchema = new Schema<TUser>({
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
  address: addressSchema,
  orders: [orderSchema],
});

const User = mongoose.model<TUser>("User", userSchema);

export default User;
