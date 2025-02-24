import { Hono } from "hono";
import {
  handleCreateUser,
  handleDeleteUser,
  handleGetAllUsers,
  handleGetUserDetails,
  handleUpdateUser,
} from "../controller/auth/user.controller";

const userRouter = new Hono();

userRouter.post("/new", handleCreateUser);
userRouter.get("/", handleGetAllUsers);
userRouter.get("/:user", handleGetUserDetails);
userRouter.put("/:user", handleUpdateUser);
userRouter.delete("/:user", handleDeleteUser);

export default userRouter;
