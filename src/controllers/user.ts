import express from "express";
import { getUserById, getUsers, deleteUserById } from "../db/users";

export const getAllUsers = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const users = await getUsers();

    if (!users) {
      return res.sendStatus(403);
    }

    return res.status(200).json(users).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const deleteUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const deletedUser = await deleteUserById(id);

    return res.status(200).json(deletedUser).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const updateUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const { username } = req.body;

    const currentUser = await getUserById(id);
    if (!currentUser) {
      return res.sendStatus(400);
    }
    currentUser.username = username;

    currentUser.save();

    return res.status(200).json(currentUser).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
