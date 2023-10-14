import express from "express";
import { getAllUsers, deleteUser, updateUser } from "../controllers/user";
import { isAuthenticated, isOwner } from "../middleware";

export default (router: express.Router) => {
  router.get("/users", isAuthenticated, getAllUsers);
  router.delete("/user/:id", isAuthenticated, isOwner, deleteUser);
  router.patch("/user/:id", isAuthenticated, isOwner, updateUser);
};
