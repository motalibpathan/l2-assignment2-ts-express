import { TOrder, TUser } from "./user.interface";
import User from "./user.model";

const createUserIntoDB = async (user: TUser) => {
  const exists = await User.isUserExists(user.userId);

  if (exists) {
    throw new Error("User already exists");
  }

  const result = await User.create(user);
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const { orders, password, ...createdUser } = result.toObject();

  return createdUser;
};

const getAllUsersFromDB = async () => {
  const result = await User.find();
  return result.map((user) => {
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    const { orders, password, ...rest } = user.toObject();
    return rest;
  });
};

const getUserByIdFromDB = async (userId: number) => {
  const exists = await User.isUserExists(userId);
  if (!exists) return null;
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const { orders, password, ...rest } = exists;
  return rest;
};

const updateUserIntoDB = async (userId: number, user: TUser) => {
  const exists = await User.isUserExists(userId);

  if (!exists) {
    return null;
  }

  const result = await User.findOneAndUpdate({ userId: userId }, user, {
    new: true,
  });

  if (!result) {
    return null;
  }

  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const { orders, password, ...updatedUser } = result.toObject();

  return updatedUser;
};

const deleteUserFromDB = async (userId: number) => {
  const exists = await User.isUserExists(userId);

  if (!exists) {
    return null;
  }

  const result = await User.findOneAndDelete({ userId: userId });

  if (!result) {
    return null;
  }

  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const { orders, password, ...deletedUser } = result.toObject();

  return result;
};

const addNewOrderToDB = async (userId: number, order: TOrder) => {
  const exists = await User.isUserExists(userId);

  if (!exists) {
    return null;
  }

  const result = await User.findOneAndUpdate(
    { userId: userId },
    {
      $set: { orders: { $push: order } },
    }
  );

  if (!result) {
    return null;
  }

  return order;
};

export const userServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getUserByIdFromDB,
  updateUserIntoDB,
  deleteUserFromDB,
  addNewOrderToDB,
};
