import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, require: true },
  email: { type: String, require: true },
  authentication: {
    password: { type: String, required: true, select: false },
    salt: { type: String, select: false },
    sessionToken: { type: String, select: false },
  },
});

export const UserModel = mongoose.model("U ser", userSchema);

export const getUsers = () => UserModel.find();
export const getUserByEmail = (email: String) => UserModel.findOne({ email });
export const getUserBySessionToken = (sessionToken: String) =>
  UserModel.findOne({
    "authentication.sessionToken": sessionToken,
  });

export const getUserById = (id: string) => UserModel.findById(id);
export const createUser = (values: Record<string, any>) =>
  new UserModel(values).save().then((user) => user.toObject());
export const deleteUserById = (id: string) =>
  UserModel.findByIdAndDelete({ _id: id });
export const updateUserById = (id: string, values: Record<string, any>) =>
  UserModel.findOneAndUpdate({ id, values });
