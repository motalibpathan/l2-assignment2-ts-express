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

const updateUserIntoDB = async (userId: number, user: TUser) => {
  const exists = await User.isUserExists(userId);

  if (!exists) {
    return null;
  }

  const result = await User.findOneAndUpdate({ userId: userId }, user, {
    new: true,
  });
  return result;
};

export const userServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getUserByIdFromDB,
  updateUserIntoDB,
};
