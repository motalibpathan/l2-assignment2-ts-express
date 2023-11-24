import { TUser } from "./user.interface";
import User from "./user.model";

const createUserIntoDB = async (user: TUser) => {
  const exists = await User.isUserExists(user.userId);

  if (exists) {
    throw new Error("User already exists");
  }

  const result = await User.create(user);
  return result;
};

const getAllUsersFromDB = async () => {
  const result = await User.find();
  return result;
};

const getUserByIdFromDB = async (userId: number) => {
  const exists = await User.isUserExists(userId);
  return exists;
};

export const userServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getUserByIdFromDB,
};
